import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, Connection, Edge, NodeTypes, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import { useFlowStore } from '../store/flowStore';
import CustomNode, { CustomNodeProps } from './CustomNode';
import { nodeTypes as nodeConfig } from '../types/nodeTypes';

type NodeTypeMap = {
  [key: string]: React.ComponentType<CustomNodeProps>;
};

const nodeTypes: NodeTypes = {
  trigger: CustomNode,
  ingestion: CustomNode,
  datastore: CustomNode,
  llm: CustomNode,
  test: CustomNode,
  output: CustomNode,
};

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect,exportToJson  } = useFlowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  
    const type = event.dataTransfer.getData('application/reactflow');
    const subtype = event.dataTransfer.getData('application/subtype');
    if (!type || !reactFlowWrapper.current) return;
  
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
  
    const nodeData = nodeConfig.find(node => node.type === type);
    let newNodeData;
  
    if (subtype && nodeData?.subTypes) {
      newNodeData = nodeData.subTypes.find(sub => sub.type === subtype);
    }
  
    if (!newNodeData) {
      newNodeData = nodeData;
    }
  
    const newNode = {
      id: `${subtype || type}-${nodes.length + 1}`,
      type,
      position,
      data: {
        ...newNodeData,
        label: newNodeData?.label || type,
        type,
        subtype,
        parameters: newNodeData?.parameters || [],
        onParameterChange: (key: string, value: string) => {
          useFlowStore.setState((state) => ({
            nodes: state.nodes.map((node) =>
              node.id === `${subtype || type}-${nodes.length + 1}`
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      parameters: node.data.parameters.map((param: any) =>
                        param.key === key ? { ...param, value } : param
                      ),
                    },
                  }
                : node
            ),
          }));
        },
      },
    };
  
    useFlowStore.setState((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  }, [nodes]);
  

  const onConnectHandler = useCallback((params: Connection) => onConnect(params), [onConnect]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow

          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectHandler}
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
          <Background className='bg-black' />
          <Controls />
          <Panel position="top-right">
            <button
              onClick={() => {
                const jsonData = exportToJson();
                console.log(jsonData);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                console.log(a);
                a.href = url;
                a.download = 'ai-pipeline-flow.json';
                a.click();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Export Config
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default Flow;

