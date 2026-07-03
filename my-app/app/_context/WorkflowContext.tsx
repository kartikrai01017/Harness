'use client';
import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { Edge, Node } from '@xyflow/react';

export type WorkflowContextType = {
  inputValue: string;
  setInputValue: (v: string) => void;
  output: string;
  runWorkflow: () => Promise<void>;
};

export const WorkflowContext = createContext<WorkflowContextType>({
  inputValue: '',
  setInputValue: () => {},
  output: '',
  runWorkflow: async () => {},
});

export function WorkflowProvider({ children, edges, nodes }: { children: ReactNode; edges: Edge[]; nodes: Node[] }) {
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState('');

  const runWorkflow = useCallback(async () => {
    if (inputValue.length === 0) return;
    try {
      const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: inputValue, edges, nodes }),
      });
      const data = await res.json();
      setOutput(JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, [inputValue, edges, nodes]);

  return (
    <WorkflowContext.Provider value={{ inputValue, setInputValue, output, runWorkflow }}>
      {children}
    </WorkflowContext.Provider>
  );
}
