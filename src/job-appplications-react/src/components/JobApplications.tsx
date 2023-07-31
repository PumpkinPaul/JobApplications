import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  Selection,
  SortDescriptor,
  Spacer,
} from "@nextui-org/react";
import JobApplicationsTable from "./JobApplicationsTable";
import JobApplicationsTableTopContent from "./JobApplicationsTableTopContent";
import JobApplicationsTableBottomContent from "./JobApplicationsTableBottomContent";

type ApplicationStatus = "Applied" | "AwaitingCall" | "Interview" | "Expired" | "Declined" | "Filled" | "Dead";
const statusOptions = ["Applied", "AwaitingCall", "Interview", "Expired", "Declined", "Filled", "Dead"];

export interface IJobApplication {
  id: number;
  url: string;
  title: string;
  jobId: string;
  jobRef: string;
  contactName: string;
  telephone: string;
  appliedDate: string;
  status: ApplicationStatus;
  notes?: string;
}

export type statusColor = { [key in ApplicationStatus]: "success" | "danger" | "default" | "primary" | "secondary" | "warning" | undefined }

export interface IHeaderColumn {
  name: string,
  uid: string,
  sortable?: boolean,
};

const headerColumns: IHeaderColumn[] = [
  { name: "Title", uid: "title" },
  { name: "Job Id", uid: "jobId" },
  { name: "Ref", uid: "jobRef" },
  { name: "Contact", uid: "contact", sortable: true },
  { name: "Telephone", uid: "telephone" },
  { name: "Applied", uid: "applied", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const DEFAULT_STATUS_FILTERS = ["Applied", "AwaitingCall", "Interview"];

export default function JobApplications() {
  const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(DEFAULT_STATUS_FILTERS)); //("all)")
  const [rowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "appliedDate",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredJobApplications = [...jobApplications];

    if (hasSearchFilter) {
      filteredJobApplications = filteredJobApplications.filter((jobApplication) =>
        jobApplication.contactName.toLowerCase().includes(filterValue?.toLowerCase() || ""),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredJobApplications = filteredJobApplications.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredJobApplications;
  }, [hasSearchFilter, jobApplications, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedJobApplications = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = 1;//a[sortDescriptor.column];
      const second = 2;//b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  useEffect(() => {
    fetch('https://localhost:7176/api/jobapplication')
      .then((response) => response.json())
      .then((json) => setJobApplications(json || []));
  }, [])

  return (
    <>
      <h1 className="text-6xl">Job Applications</h1>
      <Spacer y={8} />
      <JobApplicationsTable
        jobApplications={sortedJobApplications}
        headerColumns={headerColumns}
        topContent={
          <JobApplicationsTableTopContent
            statusOptions={statusOptions}
            filterValue={filterValue}
            onSearchClear={() => setFilterValue('')}
            onSearchChange={(e) => onSearchChange(e.target.value)}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />
        }
        bottomContent={
          <JobApplicationsTableBottomContent
            hasSearchFilter={hasSearchFilter}
            page={page}
            pages={pages}
            onPageChange={setPage}
            onPreviousPage={onPreviousPage}
            onNextPage={onNextPage}
          />
        }
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
      />
    </>
  );
}