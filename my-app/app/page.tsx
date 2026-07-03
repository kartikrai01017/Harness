'use client';
import UIComponent from './(ui)/_uiComponent';
import UIReactFlow from './(ui)/_uiReactFlow';
import React, { useState, useEffect } from 'react';
import type { Node, Edge } from '@xyflow/react';
import { NodebarContext, EdgeContext, TypeContext} from './AppShell';
import { WorkflowProvider } from './_context/WorkflowContext';


export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const nodebar = React.useContext(NodebarContext);
  console.log(nodes)
  console.log(edges)
  
  useEffect(() => {
    const sendNodes = async () => {
      if (nodes.length === 0) return;

      try {
        const res = await fetch("http://localhost:8000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify( {flow:nodes} )
        });

        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    sendNodes();
  }, [nodes]);


   useEffect(()=>{
    const senedges=async ()=>{
    if(edges.length==0)
      return

        try {
        const res = await fetch("http://localhost:8000/edges", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ flow:edges })
        });

        const result = await res.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
      
    return
    } 
    senedges()
   },[edges])

  return (
    <WorkflowProvider edges={edges} nodes={nodes}>
    <EdgeContext.Provider value={edges}>
    <TypeContext.Provider value={nodes}>
      <div className="flex h-screen w-full bg-surface-base">
        
          
          <div className={nodebar ? "w-56 p-4 border-r border-neutral-800 bg-surface-elevated" : "w-0 overflow-hidden"}>
            {nodebar && <UIComponent
            setNodes={setNodes} 
            setEdges={setEdges}
              />}
          </div>

          <div className="flex-1 h-full">
            <UIReactFlow nodes={nodes} 
                        setNodes={setNodes} 
                        edges={edges}
                        setEdges={setEdges}
                      />
          </div>
        </div>
        </TypeContext.Provider>
    </EdgeContext.Provider>
    </WorkflowProvider>
  );
}
