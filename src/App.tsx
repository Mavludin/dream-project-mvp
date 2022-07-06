import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AssigmentsData } from "./models";
import { AssignmentsListView } from "./modules/student/views/AssignmentsListView";
import { AuthView } from "./modules/auth/views/AuthView";
import { selectIsLoggedIn } from "./store/slices/auth";

function App() {
  const [assignmentsData, setAssignmentsData] = useState<AssigmentsData[]>([]);

  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    fetch("/api/assignments")
      .then((res) => res.json())
      .then((res) => setAssignmentsData(res.data));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/student");
    } else {
      navigate("/auth");
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/auth"
          element={<AuthView />}
        />
        <Route
          path="/student"
          element={<AssignmentsListView assignmentsData={assignmentsData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
