import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import { useFlowStore } from '../store/flowStore';
import CustomNode, { CustomNodeProps } from './CustomNode';

type NodeTypeMap = {
  [key: string]: React.ComponentType<CustomNodeProps> | { subTypes?: { type: string, label: string }[] };
};

const nodeTypes: NodeTypeMap = {
  trigger: CustomNode,
  ingestion: CustomNode,
  datastore: CustomNode,
  llm: CustomNode,
  test: CustomNode,
  output: CustomNode,
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  
    const type = event.dataTransfer.getData('application/reactflow');
    const subtype = event.dataTransfer.getData('application/subtype'); // Subtype handling
    if (!type || !reactFlowWrapper.current) return;
  
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
  
    const nodeType = nodeTypes[type];

    const newNode = {
      id: `${subtype || type}-${nodes.length + 1}`,
      type,
      position,
      data: {
        label: subtype
          ? nodeType?.subTypes?.find((sub:any) => sub.type === subtype)?.label || subtype
          : nodeType?.label || type,
        type,
        subtype, // Include the subtype if available
      },
    };
  
    useFlowStore.setState((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  }, [nodes]);
  
  
  

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{
            style: { strokeWidth: 2 },
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
