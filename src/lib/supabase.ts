import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bzavntmsfgtsluiheypp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6YXZudG1zZmd0c2x1aWhleXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTQzMjYsImV4cCI6MjEwNTQ5MDMyNn0.N1DuYw714zfrSmYgtogfclw9Nvf5CVaw0erL0pfCE8E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
