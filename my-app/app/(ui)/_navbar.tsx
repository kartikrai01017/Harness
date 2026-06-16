import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-surface-glass backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-node-ai text-white text-sm font-bold">
          H
        </div>
        <span className="text-lg font-semibold text-white">Harness</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-4 py-1.5 text-sm font-medium text-neutral-300 rounded-md hover:bg-white/5 hover:text-white transition-all duration-200">
          Add Node
        </button>
        <button className="px-4 py-1.5 text-sm font-medium text-white rounded-md bg-brand-500/10 border border-brand-500/20 hover:bg-brand-500/20 hover:border-brand-500/30 transition-all duration-200">
          Run
        </button>
      </div>
    </nav>
  );
}
