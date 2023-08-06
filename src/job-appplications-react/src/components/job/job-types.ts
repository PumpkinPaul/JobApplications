export type ApplicationStatus = "Applied" | "AwaitingCall" | "Interview" | "Expired" | "Declined" | "Filled" | "Dead";
export type JobType = "Contract" | "Permanent";

export const statusOptions = ["Applied", "AwaitingCall", "Interview", "Expired", "Declined", "Filled", "Dead"];

export interface Job {
  id: number;
  url: string;
  title: string;
  jobId: string;
  jobRef: string;
  jobType: JobType;
  contactName: string;
  company: string;
  telephone: string;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
}

export type jobTypeColor = { [key in JobType]: "success" | "secondary" | undefined };
export type statusColor = { [key in ApplicationStatus]: "success" | "danger" | "default" | "primary" | "secondary" | "warning" | undefined };

export interface HeaderColumn {
  name: string,
  uid: string,
  sortable?: boolean,
};

