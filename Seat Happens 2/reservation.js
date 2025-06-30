import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)

// DOM Elements
const reservationBody = document.getElementById('reservationBody')
const overdueReservationBody = document.getElementById('overdueReservationBody')

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time12h) {
  if (!time12h) return '00:00'
  
  // Clean up the input string
  const cleaned = time12h.toString()
    .trim()
    .toUpperCase()
    .replace(/([AP]M)/, ' $1') // Ensure space before AM/PM
  
  const [timePart, modifier] = cleaned.split(' ')
  let [hours, minutes] = timePart.split(':')
  
  minutes = minutes || '00'
  
  if (hours === '12') hours = '00'
  if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12)
  
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
}

// Check if reservation is overdue
function isReservationOverdue(reservation) {
  if (!reservation.reservation_date || !reservation.reservation_time) return false
  
  try {
    const time24 = convertTo24Hour(reservation.reservation_time)
    const reservationDateTime = new Date(`${reservation.reservation_date}T${time24}`)
    const now = new Date()
    
    return reservationDateTime < now
  } catch (error) {
    console.error('Error checking overdue status:', error)
    return false
  }
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
// Add reservation to table
function addReservationToTable(reservation, isOverdue = false) {
  const row = document.createElement('tr')
  row.dataset.id = reservation.id

  // Only show Cancel button if overdue, otherwise show both
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

  // Only add event listeners for buttons that exist
  const completeBtn = row.querySelector('.complete-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => handleComplete(reservation.id, row));
  }
  
  row.querySelector('.cancel-btn').addEventListener('click', () => handleCancel(reservation.id, row));

  const targetBody = isOverdue ? overdueReservationBody : reservationBody;
  targetBody.appendChild(row);
}

async function handleCancel(id, row) {
  if (!confirm("Cancel this reservation?")) return;

  const cancelBtn = row.querySelector('.cancel-btn');
  const originalText = cancelBtn.textContent;
  
  try {
    // Show loading state
    cancelBtn.textContent = 'Cancelling...';
    cancelBtn.disabled = true;

    // Get reservation details
    const { data: reservation, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw new Error(`Failed to fetch reservation: ${fetchError.message}`);
    if (!reservation.email) throw new Error('No email address found for this reservation');

    // Prepare email parameters
    const emailParams = {
      to_email: reservation.email,  // This is REQUIRED by EmailJS
      customer_name: reservation.name || 'Guest',
      customer_phone: reservation.phone || 'Not provided',
      reservation_place: reservation.place || 'Not specified',
      reservation_guests: reservation.guest_count || 1,
      reservation_date: reservation.reservation_date || 'Unknown date',
      reservation_time: reservation.reservation_time || 'Unknown time',
      reservation_id: id
    };

    console.log('Email params:', emailParams);

    // First move the reservation
    const moved = await moveReservation(id, 'cancelled', row);
    if (!moved) throw new Error('Failed to move reservation');

    // Then send email
    const emailResponse = await emailjs.send(
      'service_vhgdmi8', // Replace with actual service ID
      'template_og7265l', // Replace with actual template ID
      emailParams
    );

    console.log('Email response:', emailResponse);
    showToast('Reservation cancelled. Notification sent.', 'success');
    
  } catch (error) {
    console.error('Cancellation error:', error);
    
    if (error.message.includes('No email address')) {
      // Proceed with cancellation but show warning about no email
      await moveReservation(id, 'cancelled', row);
      showToast('Reservation cancelled (no email notification sent - missing email)', 'warning');
    } 
    else if (error.status === 422) {
      showToast('Error: Could not send email notification', 'error');
    }
    else {
      showToast(`Error: ${error.message}`, 'error');
    }
    
    // Restore button state
    cancelBtn.textContent = originalText;
    cancelBtn.disabled = false;
  }
}

// Move reservation to completed_reservations
async function moveReservation(id, newStatus, rowElement = null) {
  try {
    const { data: originalData, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw new Error(`Database error: ${fetchError.message}`)
    if (!originalData) throw new Error('Reservation not found')

    const now = new Date().toISOString()
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
    }

    const { error: insertError } = await supabase
      .from('completed_reservations')
      .insert([dataToInsert])

    if (insertError) throw new Error(`Failed to save: ${insertError.message}`)

    const { error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)

    if (deleteError) throw new Error(`Failed to remove: ${deleteError.message}`)

    if (rowElement) rowElement.remove()
    return true

  } catch (error) {
    console.error('Move Reservation Error:', error)
    showToast(`Error: ${error.message}`, 'error')
    return false
  }
}

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.textContent = message
  document.body.appendChild(toast)
  
  setTimeout(() => toast.remove(), 3000)
}

// Load reservations
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadReservations()
  
  // Add basic styles if they don't exist
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
      
      /* Overdue row styling */
      tr[data-id] td {
        background-color: rgba(255, 0, 0, 0.1);
      }
    `
    document.head.appendChild(style)
  }
})