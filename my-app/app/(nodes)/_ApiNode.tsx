import { Handle, Position } from "@xyflow/react";

export default function ApiNode(props: any) {
  return (
    <div>
      <Handle type="target" position={Position.Left}
        className="
          !h-5 !w-5
          !border-[3px] !border-surface-base
          !bg-node-api
          shadow-lg
          hover:scale-150
          transition-all
          !cursor-crosshair
        "
      />
      <div className="relative min-w-[240px] rounded-xl border border-neutral-700/30 bg-surface-overlay shadow-node transition-all duration-200 hover:shadow-node-hover hover:border-node-api/30">
        
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r from-node-api/60 to-node-api/20" />
        
        <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/5">
          <span className="text-sm">↗</span>
          <span className="text-sm font-semibold text-node-api">API Request</span>
        </div>
        <div className="p-4">
          <p className="text-xs font-medium text-neutral-400 mb-1.5">Endpoint</p>
          <input
            className="
              w-full rounded-lg
              border border-neutral-800
              bg-neutral-900
              px-3 py-2
              text-sm text-neutral-200
              placeholder:text-neutral-600
              focus:border-node-api
              focus:ring-1 focus:ring-node-api/20
              focus:outline-none
              transition-all duration-200
            "
            placeholder="https://api.example.com"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right}
        className="
          !h-5 !w-5
          !border-[3px] !border-surface-base
          !bg-node-api
          shadow-lg
          hover:scale-150
          transition-all
          !cursor-crosshair
        "
      />
    </div>
  );
}
