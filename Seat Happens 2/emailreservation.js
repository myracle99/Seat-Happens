// email.js - Ches Cafe Reservation Email System
// Usage: Import and call sendReservationEmail() with reservation data

// Initialize EmailJS with your public key
(function() {
  const emailjsScript = document.createElement('script');
  emailjsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
  emailjsScript.onload = () => {
    emailjs.init('Wa4qxuVs1KGKA0WZ0');
    console.log('EmailJS initialized');
  };
  document.head.appendChild(emailjsScript);
})();

/**
 * Sends reservation confirmation email
 * @param {Object} reservationData - Reservation details
 * @returns {Promise<boolean>} - True if email sent successfully
 */
export async function sendReservationEmail(reservationData) {
  // Validate required fields
  const requiredFields = ['name', 'email', 'place', 'guest_count', 'reservation_date', 'reservation_time'];
  const missingFields = requiredFields.filter(field => !reservationData[field]);
  
  if (missingFields.length > 0) {
    console.error('Missing required fields:', missingFields);
    return false;
  }

  try {
    // Format the date for display
    const reservationDate = new Date(reservationData.reservation_date);
    const formattedDate = reservationDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Prepare email parameters (match your EmailJS template variables)
    const templateParams = {
      customer_name: reservationData.name,
      customer_phone: reservationData.phone || 'Not provided',
      reservation_place: reservationData.place,
      reservation_guests: reservationData.guest_count,
      reservation_date: formattedDate,
      reservation_time: reservationData.reservation_time,
      customer_email: reservationData.email,
      reservation_notes: reservationData.notes || 'No special requests'
    };

    // Send email using your template
    const response = await emailjs.send(
      'service_vhgdmi8',      // Replace with your EmailJS Service ID
      'template_kf9anff',     // Replace with your EmailJS Template ID
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;

  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Handle specific EmailJS errors
    if (error.status === 400) {
      console.error('Invalid template parameters');
    } else if (error.status === 401) {
      console.error('EmailJS authentication failed');
    } else if (error.status === 500) {
      console.error('EmailJS server error');
    }
    
    return false;
  }
}

/**
 * Attaches email sending to your booking form
 * @param {string} formId - ID of your reservation form
 */
export function setupEmailForm(formId = 'reservationForm') {
  const form = document.getElementById(formId);
  
  if (!form) {
    console.error(`Form with ID ${formId} not found`);
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      phone: form.querySelector('#phone').value.trim(),
      place: localStorage.getItem('selectedPlace'),
      guest_count: parseInt(localStorage.getItem('guestCount')),
      reservation_date: localStorage.getItem('selectedDate'),
      reservation_time: localStorage.getItem('selectedTime'),
      notes: form.querySelector('#notes').value.trim() || null
    };

    // Send email
    const emailSent = await sendReservationEmail(formData);
    
    if (emailSent) {
      // Optional: Redirect or show success message
      console.log('Reservation confirmed and email sent');
    } else {
      alert('Reservation completed but email failed. Please check your confirmation at ' + formData.email);
    }
  });
}

// Automatic setup when imported (optional)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('reservationForm')) {
    setupEmailForm();
  }
});