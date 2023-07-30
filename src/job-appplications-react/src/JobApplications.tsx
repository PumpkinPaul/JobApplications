import { Key } from 'react';
import {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {
  Chip,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Pagination,
  Selection,
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
const statusOptions = ["Applied", "AwaitingCall", "Interview", "Expired", "Declined", "Filled", "Dead"];

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

const DEFAULT_STATUS_FILTERS = ["Applied", "AwaitingCall", "Interview"];

export default function JobApplications() {
  const [jobApplications, setJobApplications] = useState<IJobApplication[]>([]);
  const [filterValue, setFilterValue] = useState<string | undefined>("");
  const [statusFilter, setStatusFilter] = useState<Selection>(new Set(DEFAULT_STATUS_FILTERS)); //("all)")
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
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

  const topContent = useMemo(() => {
    return (
      <div className="flex gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
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
                  <DropdownItem key={status} className="capitalize">
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={
              <PlusIcon width={undefined} height={undefined} />
            }>
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    onSearchChange,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={hasSearchFilter} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={hasSearchFilter} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, hasSearchFilter, onNextPage, onPreviousPage]);

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
        topContent={topContent}
        bottomContent={bottomContent}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
      />
    </>
  );
}

const JobApplicationsTable = ({
  jobApplications,
  topContent,
  bottomContent,
  sortDescriptor,
  setSortDescriptor,
}: {
  jobApplications: IJobApplication[],
  topContent: any,
  bottomContent: any,
  sortDescriptor: any,
  setSortDescriptor: any,
}): JSX.Element => (
  <Table
    aria-label="Job applications table"
    isStriped
    isHeaderSticky
    bottomContent={bottomContent}
    bottomContentPlacement="outside"
    classNames={{
      wrapper: "max-h-[382px]",
    }}
    sortDescriptor={sortDescriptor}
    topContent={topContent}
    topContentPlacement="outside"
    onSortChange={setSortDescriptor}
  >
    <TableHeader>
      <TableColumn>Title</TableColumn>
      <TableColumn>Job Id</TableColumn>
      <TableColumn>Ref</TableColumn>
      <TableColumn>Contact</TableColumn>
      <TableColumn>Telephone</TableColumn>
      <TableColumn>Applied</TableColumn>
      <TableColumn allowsSorting={true}>Status</TableColumn>
      <TableColumn>Actions</TableColumn>
    </TableHeader>

    <TableBody emptyContent={"No job applications found"}>
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
            <Chip className="capitalize border-none gap-1" color={statusColorMap[status] || "success"} size="sm" variant="dot">
              {status}
            </Chip>
          </TableCell>
          <TableCell>
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-400" width={undefined} height={undefined} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table >
)