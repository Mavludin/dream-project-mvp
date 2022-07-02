import './App.css';
import { useEffect, useState } from 'react';
import { AssigmentsData } from './models';
import { AssignmentsListView } from './modules/student/views/AssignmentsListView';

function App() {
  const [assignmentsData, setAssignmentsData] = useState<AssigmentsData[]>([]);

  useEffect(() => {
    fetch('/api/assignments')
      .then((res) => res.json())
      .then((res) => setAssignmentsData(res.data));
  }, []);

  return (
    <div className="App">
      <AssignmentsListView assignmentsData={assignmentsData} />
    </div>
  );
}

export default App;
