import './App.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AssigmentsData } from './models';
import { AssignmentsListView } from './modules/student/views/AssignmentsListView';
import { AuthView } from './modules/auth/views/AuthView';
import { selectIsLoggedIn } from './store/slices/auth';

function App() {
  const [assignmentsData, setAssignmentsData] = useState<AssigmentsData[]>([]);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    fetch('/api/assignments')
      .then((res) => res.json())
      .then((res) => setAssignmentsData(res.data));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={isLoggedIn ? <Navigate to="/student" /> : <Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/student" /> : <AuthView />}
        />
        <Route
          path="/student"
          element={
            isLoggedIn ? (
              <AssignmentsListView assignmentsData={assignmentsData} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
