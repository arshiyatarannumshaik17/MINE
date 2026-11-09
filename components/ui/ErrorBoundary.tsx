"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: "",
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-8 rounded-3xl glass-panel border border-rose-500/20 text-center max-w-lg mx-auto my-8">
          <div className="w-14 h-14 rounded-full mx-auto mb-4 bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="font-cinematic text-lg font-bold text-white mb-2">
            {this.props.fallbackTitle || "Cosmic Wave Distortion"}
          </h3>
          <p className="text-xs text-slate-300 mb-6 font-mono">
            {this.state.errorMessage || "An unexpected error occurred while rendering this scene."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, errorMessage: "" })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all shadow-md"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

