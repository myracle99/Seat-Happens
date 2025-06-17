// reservation.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase credentials
const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)




// Add one row to the table
function addReservationToTable({ place, guest_count, reservation_date, reservation_time, name, phone, email, notes }) {
  const row = document.createElement('tr')
  row.innerHTML = `
    <td>${place}</td>
    <td>${guest_count}</td>
    <td>${reservation_date}</td>
    <td>${reservation_time}</td>
    <td>${name}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td>${notes || ''}</td>
  `
  reservationBody.appendChild(row)
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


