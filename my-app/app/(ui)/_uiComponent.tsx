'use client';
import React from 'react';
import { useRef } from 'react';

export default function UIComponent({ setNodes, setEdges }: { setNodes: React.Dispatch<React.SetStateAction<import('@xyflow/react').Node[]>>; setEdges: React.Dispatch<React.SetStateAction<import('@xyflow/react').Edge[]>> }): React.ReactElement {
  const idCounter = useRef(0);
  function startclick(event: React.MouseEvent<HTMLButtonElement>, type: string): void {
    let lab = type;
    
    if (type === "start") {
      type = "StartNode";
      lab = "start";
    } else if (type === "api") {
      type = "ApiNode";
      lab = "api";
    } else if (type === "end") {
      type = "EndNode";
      lab = "Endnode";
    }
  
    setNodes((nds: import('@xyflow/react').Node[]) => [
      ...nds,
      {
        id: `${idCounter.current++}`,
        type,
        data: { label: lab },
        position: { x: 100 + nds.length * 100 + 5, y: 5 },
      },
    ]);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="mb-1">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Nodes</p>
      </div>
      <button 
        onClick={(e) => startclick(e, "start")}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-card border border-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-700 transition-all duration-200"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-node-ai/20 text-node-ai text-xs">▶</span>
        Start
      </button>
      <button 
        onClick={(e) => startclick(e, "api")}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-card border border-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-700 transition-all duration-200"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-node-api/20 text-node-api text-xs">↗</span>
        API
      </button>
      <button 
        onClick={(e) => startclick(e, "end")}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-card border border-neutral-800 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white hover:border-neutral-700 transition-all duration-200"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-md bg-node-logic/20 text-node-logic text-xs">⬇</span>
        End
      </button>
    </div>
  );
}
