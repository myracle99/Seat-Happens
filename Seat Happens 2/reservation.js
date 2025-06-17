// reservation.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase credentials
const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)




// Add one row to the table
function addReservationToTable(reservation) {
  const row = document.createElement('tr')

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
    <td>
    <button class="complete-btn" data-id="${reservation.id}">✔ Complete</button>
    <button class="cancel-btn" data-id="${reservation.id}">✖ Cancel</button>
    </td>
  `
  function formatStatus(status) {
  if (!status || status.trim() === '') return 'Pending'
  if (status.toLowerCase() === 'completed') return '✅ Completed'
  return status.charAt(0).toUpperCase() + status.slice(1)
}


  const completeBtn = row.querySelector('.complete-btn')
  const cancelBtn = row.querySelector('.cancel-btn')

  completeBtn.addEventListener('click', async () => {
    await updateReservationStatus(reservation.id, 'completed')
  })

  cancelBtn.addEventListener('click', async () => {
    await updateReservationStatus(reservation.id, 'cancelled')
  })

  reservationBody.appendChild(row)

 completeBtn.addEventListener('click', async () => {
  const confirmComplete = confirm("Mark this reservation as completed?")
  if (confirmComplete) {
    await updateReservationStatus(reservation.id, 'completed', row)
  }
})

cancelBtn.addEventListener('click', async () => {
  const confirmCancel = confirm("Cancel and remove this reservation?")
  if (confirmCancel) {
    await updateReservationStatus(reservation.id, 'cancelled', row)
  }
})

}


async function updateReservationStatus(id, newStatus, rowElement = null) {
  if (newStatus === 'cancelled') {
    const { data, error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Supabase delete error:', error)
      alert(`Failed to delete: ${error.message}`)
      return
    }

    console.log('✅ Deleted from Supabase:', data)
    if (rowElement) rowElement.remove()
  } else if (newStatus === 'completed') {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status: 'completed' })
      .eq('id', id)

    if (error) {
      console.error('❌ Supabase update error:', error)
      alert(`Failed to update status: ${error.message}`)
      return
    }

    console.log('✅ Marked as completed:', data)

    if (rowElement) {
      // Optional: visually indicate completion and disable buttons
      rowElement.classList.add('completed')
      rowElement.querySelectorAll('button').forEach(btn => btn.disabled = true)
    }
  }
}




async function loadReservations() {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('reservation_date', { ascending: true })

  if (error) {
    console.error('🔴 Error fetching reservations:', error)
    return
  }

  console.log('✅ Fetched data:', data)

  if (!data || data.length === 0) {
    reservationBody.innerHTML = `
      <tr><td colspan="8" style="text-align: center;">No reservations yet.</td></tr>
    `
    return
  }

  data.forEach((item, index) => {
    console.log(`🔄 Row ${index}:`, item)
    addReservationToTable(item)
  })
}



// Fetch data on page load
loadReservations()


