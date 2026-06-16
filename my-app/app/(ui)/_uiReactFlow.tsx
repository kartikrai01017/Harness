'use client';

import { ReactFlow, Background, Controls, applyNodeChanges, applyEdgeChanges, type NodeChange, type Node, EdgeChange, Edge, addEdge, type Connection } from '@xyflow/react';
import { useCallback, type Dispatch, type ReactElement, type SetStateAction } from 'react';
import _StartNode from '../(nodes)/_StartNode';
import _ApiNode from '../(nodes)/_ApiNode';
import '@xyflow/react/dist/style.css';
import _EndNodes from '../(nodes)/_EndNodes';

export default function UIReactFlow({
  nodes,
  setNodes,
  edges,
  setEdges
}: {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: Dispatch<SetStateAction<Edge[]>>;
}): ReactElement {
  const nodeTypes = { 
    StartNode: _StartNode,
    ApiNode: _ApiNode ,
    EndNode: _EndNodes
  };
  
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow 
        nodes={[...nodes]} 
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#1a1a1a" gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
