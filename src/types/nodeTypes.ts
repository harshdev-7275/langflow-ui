import { Zap, Upload, Database, Brain, Send, FileText, Code, File } from 'lucide-react';

// Node configuration
export const nodeTypes = [
  {
    type: 'trigger',
    label: 'Trigger',
    icon: Zap,
    image: '/images/trigger.png',
    description: 'Start your pipeline',

  },
  {
    type: 'ingestion',
    label: 'Ingestion',
    icon: Upload,
    image: '/images/ingestion.png',
    description: 'Data intake process',
    subTypes: [
      { type: 'ingestionText', label: 'Text Ingestion', icon: FileText, description: 'Ingest text data' },
      { type: 'ingestionFile', label: 'File Ingestion', icon: File, description: 'Ingest files such as CSV or JSON' },
      { type: 'ingestionAPI', label: 'API Ingestion', icon: Code, description: 'Ingest data via APIs' },
    ],
  },
  {
    type: 'datastore',
    label: 'Data Store',
    icon: Database,
    image: '/images/datastore.png',
    description: 'Store your data for processing or retrieval',
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: Brain,
    image: '/images/llm.png',
    description: 'Process data using Language Models',
  },
  {
    type: 'output',
    label: 'Output',
    icon: Send,
    image: '/images/output.png',
    description: 'Display or export the final results',
  },
];

// Maps for colors and icons
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
  trigger: 'border-yellow-400 bg-yellow-50',
  ingestion: 'border-blue-400 bg-blue-50',
  ingestionText: 'border-blue-500 bg-blue-100',
  ingestionFile: 'border-blue-600 bg-blue-200',
  ingestionAPI: 'border-blue-700 bg-blue-300',
  datastore: 'border-green-400 bg-green-50',
  llm: 'border-purple-400 bg-purple-50',
  output: 'border-red-400 bg-red-50',
};
