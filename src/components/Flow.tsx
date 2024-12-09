import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import { useFlowStore } from '../store/flowStore';
import { nodeTypes } from '../types/nodeTypes';
import { downloadJson } from '../utils/exportUtils';

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { label: type.charAt(0).toUpperCase() + type.slice(1), type },
      };

      useFlowStore.setState((state) => ({

        nodes: [...state.nodes, newNode],
      }));
    },
    [nodes]
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          className="text-white"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes as any}
          fitView
          defaultEdgeOptions={{
            style: { strokeWidth: 2 },
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background  style={{ zIndex: -1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', backgroundSize: 'cover', backgroundColor: '',color: '#fff' }} size={1} />
          <Controls />
          {/* <MiniMap /> */}
          {/* <Panel position="bottom-right">
            <button
              onClick={downloadJson}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Export Pipeline
            </button>
          </Panel> */}
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;
