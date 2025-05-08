import React, { Component } from "react";
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "./error_boundary.model.ts";

// NOTE: captura errors do componente filho e retorna uma mensagem amigavel para o usuário.

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // NOTE: enviar erro para o serviço de log.
    console.error("ErrorBoundary caught an error:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="padding-[2rem] gap-2 flex flex-col flex items-center p-5 rounded bg-red-100 text-red-500 w-full justify-center border-[1px] border-red-500">
          <h2>Algo deu errado.</h2>
          <p>{error?.message}</p>
          T
          <button className="font-bold cursor-pointer px-3 py-1 hover:bg-red-200 transition-all" onClick={this.reset}>Tentar novamente</button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
