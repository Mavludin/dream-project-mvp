import './App.css';
import { useEffect, useState } from 'react';
import { AssigmentsData } from './models';
import { AssignmentsListView } from './modules/student/views/AssignmentsListView';
import { AuthView } from './modules/auth/views/AuthView';

function App() {
  const [assignmentsData, setAssignmentsData] = useState<AssigmentsData[]>([]);

  useEffect(() => {
    fetch('/api/assignments')
      .then((res) => res.json())
      .then((res) => setAssignmentsData(res.data));
  }, []);

  return (
    <div className="App">
      {/* <AssignmentsListView assignmentsData={assignmentsData} /> */}
      <AuthView />
    </div>
  );
}

export default App;
