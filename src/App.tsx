import './App.css';
import { useEffect, useState } from 'react';
import { AssigmentsData } from './models';
import { AppRoutes } from './AppRoutes';
import AppConfig from './config/AppConfig';

function App() {
  const [assignmentsData, setAssignmentsData] = useState<AssigmentsData[]>([]);

  useEffect(() => {
    fetch(`${AppConfig.apiUrl}/api/assignments/`)
      .then((res) => res.json())
      .then((res) => setAssignmentsData(res.data));
  }, []);

  return (
    <div className="App">
      <AppRoutes assignmentsData={assignmentsData} />
    </div>
  );
}

export default App;
