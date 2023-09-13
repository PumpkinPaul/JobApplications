import { useEffect, useState, useMemo, useCallback } from 'react';
import { Selection, SortDescriptor, Spacer } from "@nextui-org/react";
import { useLoaderData } from "react-router-dom";
import { Job, HeaderColumn } from "../components/job/job-types"
import JobsTable from "../components/job/jobs-table";
import JobsFilter from "../components/job/jobs-filter";
import JobsPager from "../components/job/jobs-pager";

const statusOptions = ["Applied", "AwaitingCall", "Interview", "Expired", "Declined", "Filled", "Dead"];

//const apiUrl = "http://localhost:5150/api";
const apiUrl = "http://localhost:5000/api";
export async function loader() {
  return fetch(`${apiUrl}/jobapplication`)
    .then((response) => response.json())
}

const headerColumns: HeaderColumn[] = [
  { name: "Title", uid: "title" },
  { name: "Job Id / Ref", uid: "jobId" },
  { name: "Contact", uid: "contact", sortable: true },
  { name: "Telephone", uid: "telephone" },
  { name: "Applied", uid: "applied", sortable: true },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const DEFAULT_STATUS_FILTERS = ["Applied", "AwaitingCall", "Interview"];

export default function JobList() {
  const [jobApplications, setJobApplications] = useState<Job[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(DEFAULT_STATUS_FILTERS)); //("all)")
  const [rowsPerPage] = useState(10);
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
        jobApplication.title.toLowerCase().includes(filterValue?.toLowerCase() || "") ||
        jobApplication.jobId.toLowerCase().includes(filterValue?.toLowerCase() || "") ||
        jobApplication.contactName.toLowerCase().includes(filterValue?.toLowerCase() || "") ||
        jobApplication.company.toLowerCase().includes(filterValue?.toLowerCase() || "") ||
        jobApplication.jobType.toLowerCase().includes(filterValue?.toLowerCase() || ""),
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

  const data = useLoaderData() as Job[];
  useEffect(() => {
    setJobApplications(data);
  }, [data]);

  return (
    <div className="grid h-screen place-items-center ">
      <div className="container mx-auto bg-zinc-950 rounded-lg p-4 m-2 border-2 border-solid border-zinc-900 shadow-2xl">
        <h1 className="text-3xl">Job <span className="font-thin text-slate-600">Applications</span></h1>
        <Spacer y={8} />
        <JobsTable
          jobApplications={sortedJobApplications}
          headerColumns={headerColumns}
          topContent={
            <JobsFilter
              statusOptions={statusOptions}
              filterValue={filterValue}
              onSearchClear={() => setFilterValue('')}
              onSearchChange={(e) => onSearchChange(e.target.value)}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          }
          bottomContent={
            <JobsPager
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
      </div>
    </div>
  );
}