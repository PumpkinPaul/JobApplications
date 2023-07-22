import { useEffect, useState } from 'react';

enum ApplicationStatus
{
    Applied,
    AwaitingCall,
    Interview,
    Expired,
    Declined,
    Filled
}

interface IJobApplication {
  id : number;
  url : string;
  title : string;
  jobId : string;
  jobRef : string;
  contactName : string;
  telephone : string;
  appliedDate : string;
  status : ApplicationStatus;
  notes? : string;
}

export default function JobApplications() {
  const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);
  
  useEffect(() => {
    fetch('https://localhost:7176/api/jobapplication')
      .then((response) => response.json())
      .then((json) => setJobApplications(json || []));
  }, [])

  return (
    <>
      <h1>Job Applications</h1>
      <JobApplicationsTable  
        jobApplications={jobApplications} 
      />
    </>
  );
}

const JobApplicationsTable = (
   { jobApplications } : { jobApplications : IJobApplication[] }
) : JSX.Element => (
  <table className="table table-striped table-hover table-bordered table-sm">
    <thead className="table-dark">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Job Id</th>
        <th scope="col">Ref</th>
        <th scope="col">Contact</th>
        <th scope="col">Telephone</th>
        <th scope="col">Applied</th>
        <th scope="col">Status</th>
      </tr>
    </thead>

    <tbody>
      { jobApplications.map((jobApplication : IJobApplication) => 
      <JobApplicationsTableRow
        key={jobApplication.id}
        jobApplication={jobApplication} 
      />
      )}
    </tbody>
  </table>
)

const JobApplicationsTableRow = ({
  jobApplication : {
    url,
    title,
    jobId,
    jobRef,
    contactName,
    telephone,
    appliedDate,
    status,
  }
} : { jobApplication : IJobApplication}) : JSX.Element => 
  <tr>
    <td><a href={url} rel="noreferrer" target='_blank'>{title}</a></td>
    <td>{jobId}</td>
    <td>{jobRef}</td>
    <td>{contactName}</td>
    <td>{telephone}</td>
    <td>{new Date(appliedDate).toDateString()}</td>
    <td>{status}</td>
  </tr>