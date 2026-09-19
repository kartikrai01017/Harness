import { Handle, Position } from "@xyflow/react";
import { useContext } from "react";
import { WorkflowContext } from "../_context/WorkflowContext";

export default function EndNodes(props: any) {
  const { output } = useContext(WorkflowContext);
  return (
    <div>
      <Handle type="target" position={Position.Left}
        className="!h-5 !w-5 !border-[3px] !border-surface-base !bg-node-logic shadow-lg hover:scale-150 transition-all !cursor-crosshair"
      />
      <div className="relative min-w-[360px] max-w-[480px] rounded-xl border border-neutral-700/30 bg-surface-overlay shadow-node transition-all duration-200 hover:shadow-node-hover hover:border-node-logic/30">
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-node-logic/70 to-node-logic/30" />

        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-node-logic/15 text-node-logic shadow-sm text-base">
            ⬇
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">End Node</h3>
            <p className="text-[11px] text-neutral-500">Output</p>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-medium text-neutral-400 mb-2 uppercase tracking-wider">Result</p>
          <div className="min-h-[80px] max-h-[260px] overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-900/80 p-3 text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap font-mono">
            {output || <span className="text-neutral-600 italic">No output yet...</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
