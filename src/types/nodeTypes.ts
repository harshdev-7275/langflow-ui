import { Zap, Upload, Database, Brain, Send } from 'lucide-react';


export const nodeTypes = [
  { type: 'trigger', label: 'Trigger', icon: Zap, description: 'Start your pipeline' },
  { type: 'ingestion', label: 'Ingestion', icon: Upload, description: 'Data intake process' },
  { type: 'datastore', label: 'Data Store', icon: Database, description: 'Store your data' },
  { type: 'llm', label: 'LLM', icon: Brain, description: 'Language Model processing' },
  { type: 'test', label: 'test', icon: Send, description: 'test' },
  { type: 'output', label: 'Output', icon: Send, description: 'Final results' },

];

export const iconMap = {
  trigger: Zap,
  ingestion: Upload,
  datastore: Database,
  llm: Brain,
  output: Send,
};

export const colorMap = {
  trigger: 'border-yellow-400 bg-yellow-50',
  ingestion: 'border-blue-400 bg-blue-50',
  datastore: 'border-green-400 bg-green-50',
  llm: 'border-purple-400 bg-purple-50',
  output: 'border-red-400 bg-red-50',
};
