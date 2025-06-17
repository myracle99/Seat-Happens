// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://voaodfnizhkshvjeklrn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYW9kZm5pemhrc2h2amVrbHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3OTI5NzcsImV4cCI6MjA2NTM2ODk3N30.wQEe7PpXpmnzD8A5vt67S0-dnHxD-nlYOOamwAvIU5w';

export const supabase = createClient(supabaseUrl, supabaseKey);
