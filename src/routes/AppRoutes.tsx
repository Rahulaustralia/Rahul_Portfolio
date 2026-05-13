import { Route, Routes } from 'react-router-dom'

import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
    </Routes>
  )
}
