interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-b-2 border-primary ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  )
}

export function RouteLoadingFallback({ routeName }: { routeName?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner 
        message={routeName ? `Loading ${routeName}...` : 'Loading page...'} 
        size="lg" 
      />
    </div>
  )
}
