import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { RouteLoadingFallback } from '../components/LoadingSpinner'
import type { User } from '../utils/users'

const UsersComponent = lazy(() => import('../components/UsersComponent').then(module => ({ default: module.UsersComponent })))

export const Route = createFileRoute('/users')({
  loader: async () => {
    const res = await fetch('/api/users')

    if (!res.ok) {
      throw new Error('Unexpected status code')
    }

    const data = await res.json()

    return data as Array<User>
  },
  component: () => (
    <Suspense fallback={<RouteLoadingFallback routeName="Users" />}>
      <UsersComponent />
    </Suspense>
  ),
})


