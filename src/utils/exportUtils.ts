import { useFlowStore } from '../store/flowStore';

export function downloadJson() {
  const { nodes, edges } = useFlowStore.getState();
  const jsonData = JSON.stringify({ nodes, edges }, null, 2);

  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ai-pipeline-flow.json';
  a.click();
}
