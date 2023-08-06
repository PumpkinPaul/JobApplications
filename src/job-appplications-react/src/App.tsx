import { Outlet } from "react-router-dom";
import './App.css';
import JobApplications from './routes/jobs-list'

function App() {
  return (
    <div>
      <JobApplications />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
