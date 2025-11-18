import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { RouteLoadingFallback } from '../components/LoadingSpinner'

const SchedulerDashboard = lazy(() => import('../components/SchedulerDashboard').then(module => ({ default: module.SchedulerDashboard })))

export const Route = createFileRoute('/scheduler')({
  component: () => (
    <Suspense fallback={<RouteLoadingFallback routeName="Scheduler Dashboard" />}>
      <SchedulerDashboard />
    </Suspense>
  ),
})


