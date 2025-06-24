import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)

// DOM Elements
const reservationBody = document.getElementById('reservation-body') || document.querySelector('tbody')

// Status formatter
function formatStatus(status) {
  if (!status || status.trim() === '') return 'Pending'
  status = status.toLowerCase()
  if (status === 'completed' || status === 'done') return '✅ Completed'
  if (status === 'cancelled') return '❌ Cancelled'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

// Add reservation to table
function addReservationToTable(reservation) {
  const row = document.createElement('tr')
  row.dataset.id = reservation.id

  row.innerHTML = `
    <td>${reservation.place}</td>
    <td>${reservation.guest_count}</td>
    <td>${reservation.reservation_date}</td>
    <td>${reservation.reservation_time}</td>
    <td>${reservation.name}</td>
    <td>${reservation.phone}</td>
    <td>${reservation.email}</td>
    <td>${reservation.notes || ''}</td>
    <td>${formatStatus(reservation.status)}</td>
    <td class="action-buttons">
      <button class="complete-btn" data-id="${reservation.id}">✔ Complete</button>
      <button class="cancel-btn" data-id="${reservation.id}">✖ Cancel</button>
    </td>
  `

  row.querySelector('.complete-btn').addEventListener('click', () => handleComplete(reservation.id, row))
  row.querySelector('.cancel-btn').addEventListener('click', () => handleCancel(reservation.id, row))

  reservationBody.appendChild(row)
}

// Button handlers
async function handleComplete(id, row) {
  if (confirm("Mark this reservation as completed?")) {
    const success = await updateReservationStatus(id, 'done', row)
    if (success) {
      showToast('Reservation completed successfully!', 'success')
    }
  }
}

async function handleCancel(id, row) {
  if (confirm("Permanently delete this reservation?")) {
    const success = await deleteReservation(id, row)
    if (success) {
      showToast('Reservation deleted successfully!', 'success')
    }
  }
}

// New function to handle permanent deletion
async function deleteReservation(id, rowElement = null) {
  try {
    // 1. Delete from database
    const { error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)

    if (deleteError) throw new Error(`Failed to delete: ${deleteError.message}`)

    // 2. Remove from UI if row element provided
    if (rowElement) {
      rowElement.remove()
    }

    return true

  } catch (error) {
    console.error('Delete Error:', error)
    showToast(`Error: ${error.message}`, 'error')
    return false
  }
}

// Modified update function (only for completing reservations)
async function updateReservationStatus(id, newStatus, rowElement = null) {
  try {
    // 1. Fetch original reservation
    const { data: originalData, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw new Error(`Database error: ${fetchError.message}`)
    if (!originalData) throw new Error('Reservation not found')

    // 2. Prepare data for completed_reservations
    const now = new Date().toISOString()
    const dataToInsert = {
      id: originalData.id,
      place: originalData.place,
      guest_count: originalData.guest_count,
      reservation_date: originalData.reservation_date,
      reservation_time: originalData.reservation_time,
      name: originalData.name,
      phone: originalData.phone,
      email: originalData.email,
      notes: originalData.notes || null,
      status: newStatus,
      created_at: now,
      updated_at: now
    }

    // 3. Insert into completed_reservations
    const { error: insertError } = await supabase
      .from('completed_reservations')
      .insert([dataToInsert])

    if (insertError) {
      if (insertError.code === '42501') {
        throw new Error('Permission denied. Please check RLS policies.')
      }
      throw new Error(`Failed to save: ${insertError.message}`)
    }

    // 4. Delete from original table
    const { error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)

    if (deleteError) throw new Error(`Failed to remove: ${deleteError.message}`)

    // 5. Update UI if row element provided
    if (rowElement) {
      rowElement.remove()
    }

    return true

  } catch (error) {
    console.error('Update Error:', error)
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

    reservationBody.innerHTML = data.length 
      ? '' 
      : '<tr><td colspan="10" class="no-data">No reservations found</td></tr>'

    data.forEach(addReservationToTable)
  } catch (error) {
    console.error('Load Error:', error)
    reservationBody.innerHTML = `
      <tr><td colspan="10" class="error">Error loading reservations: ${error.message}</td></tr>
    `
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
    `
    document.head.appendChild(style)
  }
})