import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)

// Philippine Time offset (UTC+8)
const PH_OFFSET = 8 * 60 * 60 * 1000;

// DOM Elements
const reservationBody = document.getElementById('reservationBody')
const overdueReservationBody = document.getElementById('overdueReservationBody')

function isReservationOverdue(reservation) {
  if (!reservation?.reservation_date || !reservation?.reservation_time) return false;

  try {
    // 1. Configuration - Set your grace period in minutes (e.g., 15 minutes)
    const GRACE_PERIOD_MINUTES = 15;
    const gracePeriodMs = GRACE_PERIOD_MINUTES * 60 * 1000;

    // 2. Get current time in Philippine Time (UTC+8)
    const now = new Date();
    const philippineOffset = 8 * 60 * 60 * 1000;
    const nowPH = new Date(now.getTime() + philippineOffset);

    // 3. Parse reservation date and time
    const [year, month, day] = reservation.reservation_date.split('-');
    const time24 = convertTo24HourStrict(reservation.reservation_time);
    if (!time24) return false;
    const [hours, minutes] = time24.split(':').map(Number);

    // 4. Create reservation datetime in PH time (plus grace period)
    const reservationDateTime = new Date(Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      hours - 8, // Convert PH time to UTC
      minutes
    ));
    const reservationWithGrace = new Date(reservationDateTime.getTime() + gracePeriodMs);

    // 5. Compare with current time
    const isOverdue = now > reservationWithGrace;

    // Debug output
    console.log('Reservation time:', reservationDateTime.toISOString());
    console.log('With grace period:', reservationWithGrace.toISOString());
    console.log('Current time:', now.toISOString());
    console.log('Is overdue:', isOverdue);

    return isOverdue;

  } catch (error) {
    console.error('Error checking overdue status:', error);
    return false;
  }
}

// STRICT 12-hour to 24-hour time conversion
function convertTo24HourStrict(time12h) {
  if (!time12h) return null;
  
  // Standardize input format
  const timeStr = time12h.toString().trim().toUpperCase();
  const regex = /^(\d{1,2})(?::(\d{2}))?\s*([AP]M)?$/;
  const match = timeStr.match(regex);
  
  if (!match) return null;
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? match[2].padStart(2, '0') : '00';
  const period = match[3];
  
  // Validate hours
  if (hours < 1 || hours > 12) return null;
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  // Validate final time
  if (hours < 0 || hours > 23) return null;
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Status formatter
function formatStatus(status, isOverdue = false) {
  if (isOverdue) return '⚠️ Overdue'
  if (!status || status.trim() === '') return 'Pending'
  status = status.toLowerCase()
  if (status === 'completed') return '✅ Completed'
  if (status === 'cancelled') return '❌ Cancelled'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Add reservation to table
function addReservationToTable(reservation, isOverdue = false) {
  const row = document.createElement('tr')
  row.dataset.id = reservation.id

  const actionButtons = isOverdue 
    ? `<button class="cancel-btn" data-id="${reservation.id}">✖ Cancel</button>`
    : `
      <button class="complete-btn" data-id="${reservation.id}">✔ Complete</button>
      <button class="cancel-btn" data-id="${reservation.id}">✖ Cancel</button>
    `;

  row.innerHTML = `
    <td>${reservation.place}</td>
    <td>${reservation.guest_count}</td>
    <td>${reservation.reservation_date}</td>
    <td>${reservation.reservation_time}</td>
    <td>${reservation.name}</td>
    <td>${reservation.phone}</td>
    <td>${reservation.email}</td>
    <td>${reservation.notes || ''}</td>
    <td>${formatStatus(reservation.status, isOverdue)}</td>
    <td class="action-buttons">
      ${actionButtons}
    </td>
  `;

  const completeBtn = row.querySelector('.complete-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => handleComplete(reservation.id, row));
  }
  
  row.querySelector('.cancel-btn').addEventListener('click', () => handleCancel(reservation.id, row));

  const targetBody = isOverdue ? overdueReservationBody : reservationBody;
  targetBody.appendChild(row);
}

async function handleComplete(id, row) {
  if (!confirm("Mark this reservation as completed?")) return;

  try {
    const moved = await moveReservation(id, 'completed', row);
    if (moved) {
      showToast('Reservation marked as completed', 'success');
    }
  } catch (error) {
    showToast(`Error: ${error.message}`, 'error');
  }
}

async function handleCancel(id, row) {
  if (!confirm("Cancel this reservation?")) return;

  const cancelBtn = row.querySelector('.cancel-btn');
  const originalText = cancelBtn.textContent;
  
  try {
    // Show loading state
    cancelBtn.textContent = 'Cancelling...';
    cancelBtn.disabled = true;

    // 1. Get reservation details
    const { data: reservation, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(`Failed to fetch reservation: ${fetchError.message}`);
    if (!reservation.email) throw new Error('No email address found');

    // 2. Prepare email parameters
    const emailParams = {
      to_email: reservation.email,
      customer_name: reservation.name || 'Guest',
      reservation_date: reservation.reservation_date || 'Unknown date',
      reservation_time: reservation.reservation_time || 'Unknown time',
      reservation_id: id
    };

    // 3. Move to completed_reservations first (to preserve data)
    const moved = await moveReservation(id, 'cancelled', row);
    if (!moved) throw new Error('Failed to move reservation');

    // 4. Send cancellation email
    const emailResponse = await emailjs.send(
      'service_vhgdmi8', // Your EmailJS service ID
      'template_og7265l', // Your cancellation template ID
      emailParams
    );

    console.log('Email sent:', emailResponse);
    showToast('Reservation cancelled. Notification sent.', 'success');
    
  } catch (error) {
    console.error('Cancellation error:', error);
    
    // Special handling for missing email
    if (error.message.includes('No email address')) {
      await moveReservation(id, 'cancelled', row); // Still cancel but no email
      showToast('Reservation cancelled (no email sent)', 'warning');
    } else {
      showToast(`Cancellation failed: ${error.message}`, 'error');
      cancelBtn.textContent = originalText;
      cancelBtn.disabled = false;
    }
  }
}
async function moveReservation(id, newStatus, rowElement = null) {
  try {
    const { data: originalData, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(`Database error: ${fetchError.message}`);
    if (!originalData) throw new Error('Reservation not found');

    const now = new Date().toISOString();
    
    // Create data object with only existing columns
    const dataToInsert = {
      place: originalData.place,
      guest_count: originalData.guest_count,
      reservation_date: originalData.reservation_date,
      reservation_time: originalData.reservation_time,
      name: originalData.name,
      phone: originalData.phone,
      email: originalData.email,
      notes: originalData.notes || null,
      status: newStatus,
      created_at: originalData.created_at || now,
      updated_at: now
    };

    // Only include archived_at if the column exists in your table
    // Remove this if you don't need it
    if (newStatus === 'cancelled') {
      dataToInsert.archived_at = now;
    }

    const { error: insertError } = await supabase
      .from('completed_reservations')
      .insert([dataToInsert]);

    if (insertError) throw new Error(`Failed to save: ${insertError.message}`);

    const { error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (deleteError) throw new Error(`Failed to remove: ${deleteError.message}`);

    if (rowElement) rowElement.remove();
    return true;

  } catch (error) {
    console.error('Move Reservation Error:', error);
    throw error;
  }
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => toast.remove(), 3000)
}

async function loadReservations() {
  try {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('reservation_date', { ascending: true })

    if (error) throw error

    // Clear tables
    if (reservationBody) reservationBody.innerHTML = ''
    if (overdueReservationBody) overdueReservationBody.innerHTML = ''

    if (data.length === 0) {
      const noDataMsg = '<tr><td colspan="10" class="no-data">No reservations found</td></tr>'
      if (reservationBody) reservationBody.innerHTML = noDataMsg
      return
    }

    // Process each reservation
    data.forEach(reservation => {
      const overdue = isReservationOverdue(reservation)
      if (overdue) {
        if (overdueReservationBody) addReservationToTable(reservation, true)
      } else {
        if (reservationBody) addReservationToTable(reservation)
      }
    })

    // Add "no overdue" message if needed
    if (overdueReservationBody && overdueReservationBody.children.length === 0) {
      overdueReservationBody.innerHTML = '<tr><td colspan="10" class="no-data">No overdue reservations</td></tr>'
    }

  } catch (error) {
    console.error('Load Error:', error)
    const errorMsg = `<tr><td colspan="10" class="error">Error loading reservations: ${error.message}</td></tr>`
    if (reservationBody) reservationBody.innerHTML = errorMsg
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadReservations()
  
  if (!document.querySelector('#reservation-styles')) {
    const style = document.createElement('style')
    style.id = 'reservation-styles'
    style.textContent = `
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 4px;
        color: white;
        z-index: 1000;
        animation: fadeIn 0.3s;
      }
      .toast.success { background: #4CAF50; }
      .toast.error { background: #F44336; }
      .action-buttons { display: flex; gap: 8px; }
      button { cursor: pointer; padding: 6px 12px; }
      .complete-btn { background: #4CAF50; color: white; border: none; }
      .cancel-btn { background: #F44336; color: white; border: none; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .no-data, .error { text-align: center; padding: 20px; }
      .error { color: #F44336; }
      tr[data-id] td { background-color: rgba(255, 0, 0, 0.1); }
    `
    document.head.appendChild(style)
  }
})