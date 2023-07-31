import {
  SortDescriptor
} from "@react-types/shared";

import {
  Chip,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";

import {
  IJobApplication,
  IHeaderColumn,
  statusColor
} from "./JobApplications";


import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";

const statusColorMap: statusColor = {
  "Applied": "primary",
  "AwaitingCall": "primary",
  "Interview": "success",
  "Expired": "danger",
  "Filled": "danger",
  "Declined": "danger",
  "Dead": "warning",
};

interface Props {
  jobApplications: IJobApplication[],
  headerColumns: IHeaderColumn[],
  topContent: any,
  bottomContent: any,
  sortDescriptor: SortDescriptor,
  setSortDescriptor: (descriptor: SortDescriptor) => any,
}

export default function JobApplicationsTable({
  jobApplications,
  headerColumns,
  topContent,
  bottomContent,
  sortDescriptor,
  setSortDescriptor,
}: Props): JSX.Element {
  return <Table
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
    <TableHeader columns={headerColumns}>
      {(column) => (
        <TableColumn
          key={column.uid}
          align={column.uid === "actions" ? "center" : "start"}
          allowsSorting={column.sortable}
        >
          {column.name}
        </TableColumn>
      )}
    </TableHeader>

    <TableBody emptyContent={"No job applications found"}>
      {jobApplications.map(({
        id, url, title, jobId, jobRef, contactName, telephone, appliedDate, status,
      }: IJobApplication) => (
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
              }} />
          </TableCell>
          <TableCell>{telephone}</TableCell>
          <TableCell>{new Date(appliedDate).toDateString()}</TableCell>
          <TableCell>
            <Chip className="capitalize border-none gap-1" color={statusColorMap[status] || "primary"} size="sm" variant="dot">
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
      ))}
    </TableBody>
  </Table>;
}