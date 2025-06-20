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
  try {

    const { data: originalData, error: fetchError } = await supabase
      .from('reservations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !originalData) {
      console.error('❌ Fetch error:', fetchError);
      alert(`Failed to fetch reservation: ${fetchError?.message || 'No data found'}`);
      return;
    }


    let destinationTable;
    let statusLabel;

    if (newStatus === 'completed') {
      destinationTable = 'archived_reservations';
      statusLabel = 'completed';
    } else if (newStatus === 'cancelled') {
      destinationTable = 'deleted_reservations';
      statusLabel = 'cancelled';
    } else {
      console.warn('⚠️ Invalid status:', newStatus);
      return;
    }


    const timestamp = new Date().toISOString();
    const reservationToMove = {
      ...originalData,
      status: statusLabel,
      created_at: timestamp,
    };


    delete reservationToMove.id;

  
    const { error: insertError } = await supabase
      .from(destinationTable)
      .insert([reservationToMove]);

    if (insertError) {
      console.error(`❌ Insert into ${destinationTable} failed:`, insertError);
      alert(`Failed to move reservation to ${destinationTable}: ${insertError.message}`);
      return;
    }

 
    const { error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('❌ Deletion error:', deleteError);
      alert(`Failed to delete original reservation: ${deleteError.message}`);
      return;
    }

    console.log(`✅ Successfully moved reservation "${originalData.name}" to ${destinationTable}`);

 
    if (rowElement) {
      rowElement.remove();
    }
  } catch (err) {
    console.error('🔥 Unexpected error in updateReservationStatus:', err);
    alert('Something went wrong while updating reservation status.');
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


