import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { Layout } from '@/components/Layout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ClientsPage from '@/pages/ClientsPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import QuotesPage from '@/pages/QuotesPage'
import QuoteDetailPage from '@/pages/QuoteDetailPage'
import ReceivablesPage from '@/pages/ReceivablesPage'
import ExpensesPage from '@/pages/ExpensesPage'
import PayablesPage from '@/pages/PayablesPage'
import TenantsPage from '@/pages/admin/TenantsPage'
import UsersPage from '@/pages/admin/UsersPage'
import ModulesPage from '@/pages/admin/ModulesPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              {/* Tenant pages */}
              <Route path="/" element={<DashboardPage />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              {/* B2: Money modules */}
              <Route path="/quotes" element={<QuotesPage />} />
              <Route path="/quotes/:id" element={<QuoteDetailPage />} />
              <Route path="/receivables" element={<ReceivablesPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              <Route path="/payables" element={<PayablesPage />} />
              {/* Platform admin pages */}
              <Route path="/admin/tenants" element={<TenantsPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/modules" element={<ModulesPage />} />
            </Route>
          </Routes>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
