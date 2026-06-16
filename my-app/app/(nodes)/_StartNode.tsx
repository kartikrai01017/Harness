import { useCallback, useState } from "react";
import { Handle, Position } from '@xyflow/react';

export default function StartNode(props: any) {
  const [inputValue, setInputValue] = useState("");

  const onChange = useCallback((evt: any) => {
    setInputValue(evt.target.value);
  }, []);

  const handleRun = useCallback(async () => {
    if (!inputValue) return;
    try {
      const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: inputValue }),
      });
      const data = await res.json();
      console.log("Run response:", data);
    } catch (error) {
      console.error(error);
    }
  }, [inputValue]);

  return (
    <div>
      <div className="relative min-w-[260px] rounded-xl border border-neutral-700/30 bg-surface-overlay shadow-node transition-all duration-200 hover:shadow-node-hover hover:border-node-ai/30">
        
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r from-node-ai/60 to-node-ai/20" />
        
        <div className="mb-4 flex items-center gap-3 p-4 pb-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-node-ai/15 text-node-ai shadow-sm">
            🚀
          </div>
          <div>
            <h3 className="font-semibold text-white">
              Start Node
            </h3>
            <p className="text-xs text-neutral-500">
              Workflow Entry Point
            </p>
          </div>
        </div>

        <div className="p-4 pt-3">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-neutral-400">
              User Input
            </label>
            <input
              type="text"
              placeholder="Enter starting message..."
              className="
                w-full rounded-lg
                border border-neutral-800
                bg-neutral-900
                px-3 py-2
                text-sm text-neutral-200
                placeholder:text-neutral-600
                focus:border-node-ai
                focus:ring-1 focus:ring-node-ai/20
                focus:outline-none
                transition-all duration-200
              "
              value={inputValue}
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <button onClick={handleRun} className="w-full rounded-lg
                border border-neutral-800
                bg-neutral-900
                px-3 py-2
                text-sm text-neutral-200
                placeholder:text-neutral-600
                focus:border-node-">RUN</button>
        </div>
      </div>
      
      <Handle 
        type="source" 
        position={Position.Bottom}
        className="
          !h-5 !w-5
          !border-[3px] !border-surface-base
          !bg-node-ai
          shadow-lg
          hover:scale-150
          transition-all
          !cursor-crosshair
        "
      />
    </div>
  );
}
