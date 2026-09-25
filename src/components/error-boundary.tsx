'use client'

import React, { Component, ReactNode } from 'react'

import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (in production, this would go to error tracking service)
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <h2 className="mb-4 text-2xl font-bold text-brandDark">Something went wrong</h2>
            <p className="mb-6 text-brandMediumGray">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <Button onClick={this.handleReset} className="bg-brandRed hover:bg-brandRed/90">
              Try again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
