import React from "react";
import { Handle, Position } from "reactflow";
import { iconMap, colorMap } from "../types/nodeTypes";
import "../index.css";

export interface CustomNodeProps {
  data: {
    label: string;
    type: string;
    subtype?: string;
    image?: string;
    inputNotches?: { type: string; label: string; color: string }[];
    outputNotches?: { type: string; label: string; color: string }[];
    parameters?: { key: string; value: string }[];
    onParameterChange?: (key: string, value: string) => void;
  };
}

const CustomNode = ({ data }: CustomNodeProps) => {
  const {
    type,
    subtype,
    label,
    image,
    inputNotches,
    outputNotches,
    parameters,
    onParameterChange,
  } = data;

  const Icon = iconMap[subtype || (type as keyof typeof iconMap)];
  const colors = colorMap[subtype || (type as keyof typeof colorMap)];

  return (
    <div
      className={`p-4 rounded-lg border shadow-gray-600 shadow-inner border-gray-700 min-w-[300px] bg-[#070707] flex flex-col items-center text-white`}
    >
      {/* Input handles */}
      <div className="absolute top-0 left-0 right-0 flex justify-around -mt-2">
        {inputNotches?.map((notch, index) => (
          <Handle
            key={index}
            type="target"
            position={Position.Top}
            id={notch.type}
            style={{
              background: notch.color,
              boxShadow: `0 0 10px ${notch.color}`,
            }}
            className="w-3 h-3 rounded-full"
          />
        ))}
      </div>

      {/* Icon */}
      <div className="flex flex-col items-center mb-4 mt-2">
        {image
          ? Icon && <Icon className="w-10 h-10 text-blue-600" />
          : Icon && <Icon className="w-10 h-10 text-blue-600" />}
      </div>

      {/* Label */}
      <div className="text-center mb-4">
        <div className="text-base font-semibold">{label}</div>
        <div className="text-sm text-gray-400">{type}</div>
      </div>

      {/* Parameters */}
      {parameters && (
        <div className="w-full space-y-3">
          {parameters.map((param, index) => (
            <div key={index} className="flex flex-col items-start w-full">
              <label className="text-xs font-medium text-gray-400 mb-1">
                {param.key}
              </label>
              <input
                type="text"
                value={param.value}
                onChange={(e) =>
                  onParameterChange &&
                  onParameterChange(param.key, e.target.value)
                }
                className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-800 text-white outline-none focus:ring-2 "
              />
            </div>
          ))}
        </div>
      )}

      {/* Output handles */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around -mb-2">
        {outputNotches?.map((notch, index) => (
          <Handle
            key={index}
            type="source"
            position={Position.Bottom}
            id={notch.type}
            style={{
              background: notch.color,
              boxShadow: `0 0 10px ${notch.color}`,
            }}
            className="w-3 h-3 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default CustomNode;
