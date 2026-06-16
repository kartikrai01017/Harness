import { Handle, Position } from "@xyflow/react";

export default function EndNodes(props: any) {
  return (
    <div>
      <Handle type="target" position={Position.Left}
        className="
          !h-5 !w-5
          !border-[3px] !border-surface-base
          !bg-node-logic
          shadow-lg
          hover:scale-150
          transition-all
          !cursor-crosshair
        "
      />
      <div className="relative min-w-[220px] rounded-xl border border-neutral-700/30 bg-surface-overlay shadow-node transition-all duration-200 hover:shadow-node-hover hover:border-node-logic/30">
        
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-gradient-to-r from-node-logic/60 to-node-logic/20" />
        
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-node-logic/15 text-node-logic shadow-sm">
            ⬇
          </div>
          <div>
            <h3 className="font-semibold text-white">
              End Node
            </h3>
            <p className="text-xs text-neutral-500">
              Workflow Termination
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
