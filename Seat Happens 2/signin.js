import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)

// SIGN IN logic
document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = ''; // Clear previous errors

  const email = e.target.email.value.trim();
  const password = e.target.password.value;

  // TC14: Empty fields validation
  if (!email || !password) {
    errorElement.textContent = "Email and password are required.";
    return;
  }

  // TC15: Email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorElement.textContent = "Invalid email format. Please enter a valid email.";
    return;
  }

  // TC13: Password strength validation
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password) || password.length < 8) {
    errorElement.textContent = "Password must be at least 8 characters with uppercase, lowercase, a number, and a special character.";
    return;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorElement.textContent = 'Sign-in error: ' + error.message;
    return;
  }

  window.location.href = "adminhomepage.html";
});

// ADD ADMIN logic
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const fullName = e.target.full_name.value.trim();
  const errorElement = document.getElementById('error-message');
  errorElement.textContent = ''; // Clear previous errors

  // Form validation
  if (!email || !password || !fullName) {
    errorElement.textContent = "All fields are required.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorElement.textContent = "Invalid email format. Please enter a valid email.";
    return;
  }

  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password) || password.length < 8) {
    errorElement.textContent = "Password must be at least 8 characters with uppercase, lowercase, a number, and a special character.";
    return;
  }

  // Normalize the email by trimming whitespace and converting to lowercase
  const trimmedEmail = email.trim().toLowerCase(); 

  // Check if the email already exists in the profiles table
  const { data: existingAdmin, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', trimmedEmail) // Use the normalized email
    .limit(1); // Limit to 1 record

  // Log the response for debugging
  console.log('Existing Admin Check:', existingAdmin, fetchError);

  if (fetchError) {
    console.error('Error checking existing admin:', fetchError);
    errorElement.textContent = 'An error occurred while checking the email: ' + fetchError.message;
    return;
  }

  // Check if any record was found
  if (existingAdmin && existingAdmin.length > 0) {
    errorElement.textContent = "Email already in use. Please use a different email.";
    return; // Stop the process if the email already exists
  }

  // Proceed to add the new admin
  const { data, error } = await supabase.auth.signUp({
    email: trimmedEmail, // Use the normalized email
    password
  });

  if (error) {
    errorElement.textContent = 'Add admin error: ' + error.message;
    return;
  }

  const user = data.user;
  if (user) {
    const { error: profileError } = await supabase.from('profiles').insert([{
      user_id: user.id,
      username: trimmedEmail.split('@')[0],
      full_name: fullName,
      avatar_url: '',
      website: '',
      bio: ''
    }]);

    if (profileError) {
      console.warn('Profile insert error:', profileError.message);
    }
  }

  alert('Signed up successfully! Check your email to confirm.');
});
