import { Component } from "react"

interface ReactErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onCatch?: (error: Error, errorInfo: React.ErrorInfo) => void
}

// eslint-disable-next-line react-prefer-function-component/react-prefer-function-component
export class ErrorBoundary extends Component<ReactErrorBoundaryProps> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onCatch } = this.props
    onCatch?.(error, errorInfo)
  }

  componentDidUpdate(prevProps: ReactErrorBoundaryProps) {
    const { children } = this.props
    if (children !== prevProps.children) {
      this.setState({ error: null })
    }
  }

  render() {
    const { children, fallback } = this.props
    const { error } = this.state

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return !error ? children : fallback ?? null
  }
}
