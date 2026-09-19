import { Handle, Position } from "@xyflow/react";

export default function ApiNode(props: any) {
  return (
    <div>
      <Handle type="target" position={Position.Left}
        className="!h-5 !w-5 !border-[3px] !border-surface-base !bg-node-api shadow-lg hover:scale-150 transition-all !cursor-crosshair"
      />
      <div className="relative min-w-[360px] max-w-[480px] rounded-xl border border-neutral-700/30 bg-surface-overlay shadow-node transition-all duration-200 hover:shadow-node-hover hover:border-node-api/30">
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-node-api/70 to-node-api/30" />

        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-node-api/15 text-node-api shadow-sm text-base">
            ↗
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">API Request</h3>
            <p className="text-[11px] text-neutral-500">LLM Gateway</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">Endpoint</p>
          <input
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/80 px-3 py-2.5 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-node-api focus:ring-1 focus:ring-node-api/20 focus:outline-none transition-all duration-200 font-mono"
            placeholder="https://api.example.com"
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right}
        className="!h-5 !w-5 !border-[3px] !border-surface-base !bg-node-api shadow-lg hover:scale-150 transition-all !cursor-crosshair"
      />
    </div>
  );
}
