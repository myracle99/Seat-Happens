// reservation.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase credentials
const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)

const reservationBody = document.getElementById('reservationBody')

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
  `
  reservationBody.appendChild(row)
}

// Load data from Supabase
async function loadReservations() {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('reservation_date', { ascending: true })

  if (error) {
    console.error('🔴 Error fetching reservations:', error)
    return
  }

  if (data.length === 0) {
    reservationBody.innerHTML = `
      <tr><td colspan="8" style="text-align: center;">No reservations yet.</td></tr>
    `
    return
  }

  data.forEach(addReservationToTable)
}

// Fetch data on page load
loadReservations()
