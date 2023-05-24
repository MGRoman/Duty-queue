import React from "react";

type TErrorBoundaryType = { children: (hasError: boolean) => React.ReactNode };

export class ErrorBoundary extends React.Component<TErrorBoundaryType, { hasError: boolean }> {
  constructor(props: TErrorBoundaryType) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    return this.props.children(this.state.hasError);
  }
}
