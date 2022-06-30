import './App.css';
import { useEffect, useState } from 'react';
import { AssigmentsData } from './models';
import { AssignmentsView } from './pages/AssignmentsView/AssignmentsView';

function App() {
  const [assignmentsData, setAssignmentsData] = useState<AssigmentsData[]>([]);

  useEffect(() => {
    fetch('/api/assignments')
      .then((res) => res.json())
      .then((res) => setAssignmentsData(res.data));
  }, []);

  return (
    <div className="App">
      <AssignmentsView assignmentsData={assignmentsData} />
    </div>
  );
}

export default App;
