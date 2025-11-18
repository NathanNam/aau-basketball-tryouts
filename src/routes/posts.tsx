import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { RouteLoadingFallback } from '../components/LoadingSpinner'
import { fetchPosts } from '../utils/posts'

const PostsComponent = lazy(() => import('../components/PostsComponent').then(module => ({ default: module.PostsComponent })))

export const Route = createFileRoute('/posts')({
  loader: async () => fetchPosts(),
  component: () => (
    <Suspense fallback={<RouteLoadingFallback routeName="Posts" />}>
      <PostsComponent />
    </Suspense>
  ),
})


