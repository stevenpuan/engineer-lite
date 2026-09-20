// ── Core types matching Supabase schema ──

export interface Tenant {
  id: string
  name: string
  display_name: string | null
  tax_id: string | null
  industry: string | null
  status: 'active' | 'trial' | 'suspended' | 'cancelled'
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  user_id: string
  tenant_id: string
  display_name: string | null
  email: string | null
  role: 'owner' | 'assistant'
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Module {
  module_key: string
  label: string
  category: 'core' | 'addon'
  sort_order: number
}

export interface TenantModule {
  tenant_id: string
  module_key: string
  enabled: boolean
  enabled_at: string | null
}

export interface Client {
  id: string
  tenant_id: string
  name: string
  contact_name: string | null
  contact_phone: string | null
  contact_email: string | null
  address: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type ProjectStatus = '洽談中' | '進行中' | '完工' | '結案' | '取消'

export interface Project {
  id: string
  tenant_id: string
  client_id: string | null
  name: string
  address: string | null
  status: ProjectStatus
  start_date: string | null
  end_date: string | null
  budget: number | null
  notes: string | null
  created_at: string
  updated_at: string
  client?: Client | null
}

// ── Platform Admin RPC return types ──

export interface TenantListItem extends Tenant {
  user_count: number
  module_count: number
}

export interface TenantUser {
  id: string
  email: string
  display_name: string | null
  role: 'owner' | 'assistant'
  is_active: boolean
  created_at: string
}

export interface TenantModuleItem {
  module_key: string
  label: string
  category: 'core' | 'addon'
  sort_order: number
  enabled: boolean
  enabled_at: string | null
}
