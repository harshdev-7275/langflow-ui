
import { ReactFlowProvider } from 'reactflow';
import Flow from './components/Flow';

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;
