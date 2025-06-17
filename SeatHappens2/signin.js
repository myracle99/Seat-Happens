import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// Replace with your own Supabase URL and anon key
const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w'
const supabase = createClient(supabaseUrl, supabaseKey)

 // SIGN IN logic
document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Sign-in error: ' + error.message);
    return;
  }

  // Check if session is active
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    alert('No active session found. Please try again.');
    return;
  }

  alert('Signed in successfully!');
  window.location.href = 'adminhomepage.html';
});

// SIGN UP logic

document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const fullName = e.target.full_name?.value || '';

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Sign-up error: ' + error.message);
    return;
  }

  alert('Signed up successfully!');
  window.location.href = 'adminhomepage.html';
  // Wait for auth state change
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const user = session.user;

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: user.id,
            username: email.split('@')[0],
            full_name: fullName,
            avatar_url: '',
            website: '',
            bio: ''
          }
        ]);

      if (profileError) {
        console.warn('Profile insert error:', profileError.message);
      } else {
        window.location.href = 'adminhomepage.html';
      }
    }
  });
});



