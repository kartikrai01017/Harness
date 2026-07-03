'use client';
import { createContext, ReactNode, useState } from 'react';
import type { Edge,Node } from '@xyflow/react';

export const NodebarContext = createContext(true);
export const EdgeContext = createContext<Edge[]>([]);
export const TypeContext = createContext<Node[]>([]);

export default function AppShell({ children }: { children: ReactNode }) {
    const [nodebar, setNodebar] = useState(true);
  return (<>
  <button className="
    absolute
    top-3
    left-3
    z-50
    rounded-lg
    bg-white/5
    backdrop-blur-md
    border border-white/10
    px-3
    py-2
    text-sm
    font-medium
    text-neutral-300
    shadow-lg
    hover:bg-white/10
    hover:text-white
    transition-all
    duration-200
  "
  onClick={()=> setNodebar(!nodebar)}>
  <span className="mr-1.5">{nodebar ? '✕' : '☰'}</span>
  Nodes</button>
  <NodebarContext.Provider value={nodebar}>
  {children}</NodebarContext.Provider>
  </>
  )
}
