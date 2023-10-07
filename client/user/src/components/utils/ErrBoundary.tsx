import React, { Component, ErrorInfo } from "react"

type Props = {
  children: React.ReactNode
}

type State = {
  hasError: boolean
}

export default class ErrBoundary extends Component<Props, State> {
  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      // Update state so the next render will show the fallback UI.

      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      // Update state so the next render will show the fallback UI.
      hasError: true,
    }
  }

  static componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Sorry.. something went wrong</div>
    }
    return this.props.children
  }
}
