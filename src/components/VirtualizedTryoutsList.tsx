import { useState, useEffect, useCallback, useMemo } from 'react'
import { TryoutCard } from './TryoutCard'
import { LoadingSpinner } from './LoadingSpinner'
import type { Tryout } from '../types/tryout'

interface VirtualizedTryoutsListProps {
  tryouts: Tryout[]
  initialItemsPerPage?: number
  loadMoreThreshold?: number
}

export function VirtualizedTryoutsList({ 
  tryouts, 
  initialItemsPerPage = 25,
  loadMoreThreshold = 5 
}: VirtualizedTryoutsListProps) {
  const [displayedItems, setDisplayedItems] = useState(initialItemsPerPage)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Get the currently visible tryouts
  const visibleTryouts = useMemo(() => {
    return tryouts.slice(0, displayedItems)
  }, [tryouts, displayedItems])

  // Check if we have more items to load
  const hasMoreItems = displayedItems < tryouts.length

  // Load more items
  const loadMoreItems = useCallback(async () => {
    if (isLoadingMore || !hasMoreItems) return

    setIsLoadingMore(true)
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setDisplayedItems(prev => Math.min(prev + initialItemsPerPage, tryouts.length))
    setIsLoadingMore(false)
  }, [isLoadingMore, hasMoreItems, initialItemsPerPage, tryouts.length])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMoreItems && !isLoadingMore) {
          loadMoreItems()
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before the element comes into view
      }
    )

    const sentinel = document.getElementById('load-more-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [hasMoreItems, isLoadingMore, loadMoreItems])

  // Reset displayed items when tryouts change (e.g., filtering)
  useEffect(() => {
    setDisplayedItems(initialItemsPerPage)
  }, [tryouts, initialItemsPerPage])

  return (
    <div className="space-y-6">
      {/* Tryout cards */}
      <div className="grid grid-cols-1 gap-6">
        {visibleTryouts.map((tryout) => (
          <TryoutCard key={tryout.id} tryout={tryout} />
        ))}
      </div>

      {/* Load more trigger */}
      {hasMoreItems && (
        <div id="load-more-sentinel" className="flex justify-center py-8">
          {isLoadingMore ? (
            <LoadingSpinner message="Loading more tryouts..." size="md" />
          ) : (
            <button
              onClick={loadMoreItems}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Load More Tryouts ({tryouts.length - displayedItems} remaining)
            </button>
          )}
        </div>
      )}

      {/* End of list indicator */}
      {!hasMoreItems && tryouts.length > initialItemsPerPage && (
        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end of the list!</p>
          <p className="text-sm mt-1">Showing all {tryouts.length} tryouts</p>
        </div>
      )}
    </div>
  )
}
