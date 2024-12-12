import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  NodeTypes,
  Panel,
  useReactFlow,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Sidebar from "./Sidebar";
import { useFlowStore } from "../store/flowStore";
import CustomNode, { CustomNodeProps } from "./CustomNode";
import { nodeTypes as nodeConfig } from "../types/nodeTypes";

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
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    exportToJson,
  } = useFlowStore();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { project } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const subtype = event.dataTransfer.getData("application/subtype");
      if (!type || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeData = nodeConfig.find((node) => node.type === type);
      let newNodeData;

      if (subtype && nodeData?.subTypes) {
        newNodeData = nodeData.subTypes.find((sub) => sub.type === subtype);
      }

      if (!newNodeData) {
        newNodeData = nodeData;
      }

      const newNode: Node = {
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
    },
    [nodes, project]
  );

  const onConnectHandler = useCallback(
    (params: Connection) => {
      const { source, target } = params;
      const currentNodes = useFlowStore.getState().nodes;
      const sourceNode = currentNodes.find((n) => n.id === source);
      const targetNode = currentNodes.find((n) => n.id === target);
      if (!sourceNode || !targetNode) return;
      const targetNodeType = targetNode.data.subtype || targetNode.data.type;
      if (
        sourceNode.data.rules &&
        sourceNode.data.rules.includes(targetNodeType)
      ) {
        onConnect(params);
      } else {
        alert("You are not allowed to connect to this node type.");
        console.warn(
          `Cannot connect ${sourceNode.data.type} to ${targetNodeType}.`
        );
      }
    },
    [onConnect]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "w-72" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar />
      </div>
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnectHandler}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView={false}
          defaultEdgeOptions={{
            style: { strokeWidth: 2 },
            type: "smoothstep",
            animated: true,
          }}
        >
          <Background />
          <Controls />
          <Panel position="top-right">
            <button
              onClick={() => {
                const jsonData = exportToJson();
                console.log(jsonData);
                const blob = new Blob([jsonData], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                console.log(a);
                a.href = url;
                a.download = "ai-pipeline-flow.json";
                a.click();
              }}
              className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-gray-300 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:ring-offset-gray-300 select-none"
            >
              Export Config
            </button>
          </Panel>
        </ReactFlow>
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={24} />
          ) : (
            <ChevronRight size={24} />
          )}
        </button>
      </div>
    </div>
  );
}

export default Flow;
