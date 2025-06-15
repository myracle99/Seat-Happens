import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Admin-specific Supabase client
const ADMIN_SP_URL = 'https://mczacuzfkljarhjgwzhx.supabase.co'
const ADMIN_SP_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jemFjdXpma2xqYXJoamd3emh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjM4OTYsImV4cCI6MjA2NTUzOTg5Nn0.zseJ1-OjLQ_PoKyhbC68jXOYmlL9SQfdc_oneQav6pw'

const adminsp = createClient(ADMIN_SP_URL, ADMIN_SP_KEY, {
  db: {
    schema: 'admin' // Isolate admin tables
  },
  auth: {
    persistSession: false // Better security for admin ops
  }
})

// Admin Auth Functions
export const adminAuth = {
  async loginAdmin(email, password) {
    const { data, error } = await adminsp.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    
    // Verify admin role
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

    const { data, error } = await adminsp.auth.signUp({
      email: newEmail,
      password: newPassword,
      options: {
        data: { is_admin: true } // Additional metadata
      }
    })

    if (error) throw error
    
    // Add to admin profiles
    const { error: profileError } = await adminsp.from('admin_profiles')
      .insert({
        user_id: data.user.id,
        email: newEmail,
        role: 'admin',
        created_by: adminsp.auth.currentUser?.id
      })
      
    if (profileError) throw profileError
    
    return data
  },

  async listAdmins() {
    const { data, error } = await adminsp.from('admin_profiles')
      .select('id, email, created_at')
      .eq('role', 'admin')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    return data
  }
}

// Secure Admin Data Functions
export const adminData = {
  async getDailyReports(date) {
    return adminsp.from('reservations')
      .select('*')
      .eq('reservation_date', date)
      .order('reservation_time')
  },
  
  async updateQueueStatus(queueId, status) {
    return adminsp.from('queues')
      .update({ status })
      .eq('id', queueId)
  }
}

// Admin Logging
export const adminLogger = {
  async logAction(action, details) {
    return adminsp.from('admin_logs')
      .insert({
        admin_id: adminsp.auth.currentUser?.id,
        action,
        details
      })
  }
}

// Auto-clear sessions on page exit
window.addEventListener('beforeunload', () => {
  adminsp.auth.signOut()
})

export default adminsp