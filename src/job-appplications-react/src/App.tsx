import './App.css';
import JobApplications from './JobApplications'

function App() {
  return (
    <div className="App">
      <JobApplications />
      <button className="btn btn-primary" onClick={() => alert("Create a new job applicaton")}>Hello</button>
    </div>
  );
}

export default App;
