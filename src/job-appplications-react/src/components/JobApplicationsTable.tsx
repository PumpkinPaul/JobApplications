import { useState } from "react";
import { useSubmit } from "react-router-dom";
import { SortDescriptor } from "@react-types/shared";
import { BiTrash } from "react-icons/bi";
import {
  Chip,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { PiPhoneCallFill } from "react-icons/pi";
import {
  IJobApplication,
  IHeaderColumn,
  statusColor
} from "./JobApplications";
import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";

const statusColorMap: statusColor = {
  "Applied": "primary",
  "AwaitingCall": "secondary",
  "Interview": "success",
  "Expired": "danger",
  "Filled": "danger",
  "Declined": "danger",
  "Dead": "danger",
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

  const [selectedId, setSelectedId] = useState<number>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const submit = useSubmit();

  return <>
    <Table
      aria-label="Job applications table"
      isStriped={false}
      isHeaderSticky
      removeWrapper
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[710px]",
        td: "py-1 border-b-2 border-solid border-zinc-800",
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
          id, url, title, jobId, jobRef, contactName, company, telephone, appliedDate, status,
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
                description={company}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  isBordered: false,
                  color: "primary",
                  size: "sm"
                }} />
            </TableCell>
            <TableCell>
              {telephone && <PiPhoneCallFill size={20} className="inline-block mr-1 text-zinc-600" />}
              {telephone}
            </TableCell>
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
                  <DropdownMenu aria-label="Row actions">
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem onClick={() => {
                      setSelectedId(id)
                      onOpen();
                    }}>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >

    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="opaque">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Delete Application</ModalHeader>
            <ModalBody>
              <p className="font-thin text-zinc-400">
                Are you sure you want to delete the application?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="danger" endContent={<BiTrash size={20} />} onPress={() => {
                submit(selectedId as any, { method: "delete", encType: "application/json" });
                onClose();
              }}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
}
