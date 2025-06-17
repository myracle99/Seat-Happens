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

// SIGN UP logic
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const fullName = e.target.full_name.value.trim();

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

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Sign-up error: ' + error.message);
    return;
  }

  const user = data.user;
  if (user) {
    const { error: profileError } = await supabase.from('profiles').insert([{
      user_id: user.id,
      username: email.split('@')[0],
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