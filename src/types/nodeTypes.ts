import { Zap, Upload, Database, Brain, Send, FileText, Code, File } from 'lucide-react';

export const nodeTypes = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: Zap,
    image: '/images/trigger.png',
    description: 'Start your pipeline',
    inputNotches: [],
    outputNotches: [{ type: 'event', label: 'Event Triggered', color: 'yellow' }],
    rules : ["ingestionText", "ingestionFile", "ingestionAPI"]
  },
  {
    type: 'ingestion',
    label: 'Ingestion',
    icon: Upload,
    image: '/images/ingestion.png',
    description: 'Data intake process',
    subTypes: [
      {
        type: 'ingestionText',
        label: 'Text Ingestion',
        icon: FileText,
        description: 'Ingest text data',
        inputNotches: [{ type: 'config', label: 'Configuration', color: 'blue' }],
        outputNotches: [{ type: 'text', label: 'Text Output', color: 'blue' }],
        parameters: [
          { key: 'Text Source', value: '' },
        ],
        rules: ["datastore"]
      },
      {
        type: 'ingestionFile',
        label: 'File Ingestion',
        icon: File,
        description: 'Ingest files such as CSV or JSON',
        inputNotches: [{ type: 'config', label: 'Configuration', color: 'blue' }],
        outputNotches: [{ type: 'file', label: 'File Output', color: 'green' }],
        parameters: [
          { key: 'File Path', value: '' },
        ],
        rules:["datastore"]
      },
      {
        type: 'ingestionAPI',
        label: 'API Ingestion',
        icon: Code,
        description: 'Ingest data via APIs',
        inputNotches: [{ type: 'config', label: 'Configuration', color: 'blue' }],
        outputNotches: [{ type: 'apiData', label: 'API Data Output', color: 'purple' }],
        parameters: [
          { key: 'API URL', value: '' },
          { key: 'Headers', value: '' },
        ],
        rules:["datastore"]
      },
    ],
  },
  {
    type: 'datastore',
    label: 'Data Store',
    icon: Database,
    image: '/images/datastore.png',
    description: 'Store your data for processing or retrieval',
    inputNotches: [{ type: 'data', label: 'Input Data', color: 'green' }],
    outputNotches: [{ type: 'data', label: 'Stored Data', color: 'green' }],
    parameters: [
      { key: 'Database Name', value: '' },
      { key: 'Connection String', value: '' },
    ],
    rules:["llm", "output"]
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: Brain,
    image: '/images/llm.png',
    description: 'Process data using Language Models',
    inputNotches: [
      { type: 'prompt', label: 'Prompt Input', color: 'purple' },
      { type: 'data', label: 'Context Data', color: 'green' },
    ],
    outputNotches: [{ type: 'response', label: 'LLM Response', color: 'purple' }],
    parameters: [
      { key: 'Base URL', value: 'https://api.openai.com/v1' },
      { key: 'API Key', value: '' },
    ],
    rules:["output"]
  },
  {
    type: 'output',
    label: 'Output',
    icon: Send,
    image: '/images/output.png',
    description: 'Display or export the final results',
    inputNotches: [{ type: 'data', label: 'Final Data', color: 'red' }],
    outputNotches: [],
    rules:[]
  },
];

export const iconMap = {
  trigger: Zap,
  ingestion: Upload,
  ingestionText: FileText,
  ingestionFile: File,
  ingestionAPI: Code,
  datastore: Database,
  llm: Brain,
  output: Send,
};

export const colorMap = {
  trigger: 'border-yellow-400 ',
  ingestion: 'border-blue-400 ',
  ingestionText: 'border-blue-500 ',
  ingestionFile: 'border-blue-600 ',
  ingestionAPI: 'border-blue-700',
  datastore: 'border-green-400',
  llm: 'border-purple-400',
  output: 'border-red-400',
};
