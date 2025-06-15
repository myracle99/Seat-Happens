// adminsp.js - Fixed Version (Works with public.profiles table)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const ADMIN_SP_URL = 'https://mczacuzfkljarhjgwzhx.supabase.co'
const ADMIN_SP_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jemFjdXpma2xqYXJoamd3emh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjM4OTYsImV4cCI6MjA2NTUzOTg5Nn0.zseJ1-OjLQ_PoKyhbC68jXOYmlL9SQfdc_oneQav6pw'

const adminsp = createClient(ADMIN_SP_URL, ADMIN_SP_KEY, {
  auth: { persistSession: false } // No custom schema
})

export const adminAuth = {
  async loginAdmin(email, password) {
    const { data, error } = await adminsp.auth.signInWithPassword({ email, password })
    if (error) throw error
    
    // Check admin role in public.profiles
    const { data: profile } = await adminsp.from('profiles')
      .select('role')
      .eq('user_id', data.user.id)
      .single()
      
    if (profile?.role !== 'admin') {
      await adminsp.auth.signOut()
      throw new Error('Insufficient privileges')
    }
    return data
  },

  async createAdmin(newEmail, newPassword) {
    // Password strength check
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(newPassword)) {
      throw new Error('Password must be 8+ chars with upper/lower/special chars')
    }

    // Create auth user
    const { data, error } = await adminsp.auth.signUp({
      email: newEmail,
      password: newPassword
    })
    if (error) throw error
    
    // Set admin role in profiles
    const { error: profileError } = await adminsp.from('profiles')
      .update({ role: 'admin' })
      .eq('user_id', data.user.id)
      
    if (profileError) throw profileError
    return data
  },

  async listAdmins() {
    const { data, error } = await adminsp.from('profiles')
      .select('user_id, email, created_at')
      .eq('role', 'admin')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data
  }
}

// Auto-clear sessions on exit
window.addEventListener('beforeunload', () => {
  adminsp.auth.signOut()
})