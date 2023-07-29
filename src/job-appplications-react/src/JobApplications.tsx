import {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import {
  Chip,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Spacer,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";

import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";

type ApplicationStatus = "Applied" | "AwaitingCall" | "Interview" | "Expired" | "Declined" | "Filled" | "Dead";

interface IJobApplication {
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

type statusColor = { [key in ApplicationStatus]: "success" | "danger" | "default" | "primary" | "secondary" | "warning" | undefined }

const statusColorMap: statusColor = {
  "Applied": "primary",
  "AwaitingCall": "primary",
  "Interview": "success",
  "Expired": "danger",
  "Filled": "danger",
  "Declined": "danger",
  "Dead": "warning",
};

export default function JobApplications() {
  const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

  const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      //setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
          //onValueChange={onSearchChange}
          />
          {/*<div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {jobApplications.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
                */}
        </div>
      </div>
    );
  }, [
    filterValue,
    //statusFilter,
    //visibleColumns,
    //onRowsPerPageChange,
    //users.length,
    //onSearchChange,
    //hasSearchFilter,
  ]);

  useEffect(() => {
    fetch('https://localhost:7176/api/jobapplication')
      .then((response) => response.json())
      .then((json) => setJobApplications(json || []));
  }, [])

  return (
    <>
      <h1 className="text-3xl">Job Applications</h1>
      <Spacer y={8} />
      <Button color="primary" onPress={() => alert("Create a new job applicaton")}>Create New</Button>
      <Spacer y={8} />
      <JobApplicationsTable
        jobApplications={jobApplications}
        topContent={topContent}
      />
    </>
  );
}

const JobApplicationsTable = (
  { jobApplications, topContent }: { jobApplications: IJobApplication[], topContent: any }
): JSX.Element => (
  <Table
    aria-label="Job applications table"
    isStriped
    isHeaderSticky
    /*sortDescriptor={sortDescriptor}*/
    topContent={topContent}
    topContentPlacement="outside"
  /*onSelectionChange={setSelectedKeys}*/
  /*onSortChange={setSortDescriptor}*/
  >
    <TableHeader>
      <TableColumn>Title</TableColumn>
      <TableColumn>Job Id</TableColumn>
      <TableColumn>Ref</TableColumn>
      <TableColumn>Contact</TableColumn>
      <TableColumn>Telephone</TableColumn>
      <TableColumn>Applied</TableColumn>
      <TableColumn>Status</TableColumn>
    </TableHeader>

    <TableBody>
      {jobApplications.map(({
        id,
        url,
        title,
        jobId,
        jobRef,
        contactName,
        telephone,
        appliedDate,
        status,
      }: IJobApplication) =>
        <TableRow key={id}>
          <TableCell>
            <Link color="primary"
              href={url}
              isExternal
              showAnchorIcon
              size="md"
              underline="none"
            >
              {title}
            </Link>
          </TableCell>
          <TableCell>{jobId}</TableCell>
          <TableCell>{jobRef}</TableCell>
          <TableCell>
            <User
              name={contactName}
              description={'company'}
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                isBordered: false,
                color: "primary"
              }}
            />
          </TableCell>
          <TableCell>{telephone}</TableCell>
          <TableCell>{new Date(appliedDate).toDateString()}</TableCell>
          <TableCell>
            <Chip color={statusColorMap[status] || "success"} size="sm" variant="dot">
              {status}
            </Chip>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table >
)