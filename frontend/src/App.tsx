import { useEffect, useState } from 'react';
import './App.css';
import { AssignmentsView } from './pages/AssignmentsView/AssignmentsView';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Examples = {
  input: string;
  output: string;
};

export type AssigmentsData = {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  examples: Examples[];
};

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
