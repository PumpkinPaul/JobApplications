import { Key } from "react";
import { Selection } from "@nextui-org/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import RouterLink from "./RouterLink";
import { PlusIcon } from "../icons/PlusIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

const JobApplicationsTableTopContent = ({
  statusOptions,
  filterValue,
  onSearchClear,
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: {
  statusOptions: string[],
  filterValue: string | undefined,
  onSearchClear: () => void,
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>,
  statusFilter: 'all' | Iterable<Key>,
  onStatusFilterChange: (keys: Selection) => any
}): JSX.Element => (

  <div className="flex gap-4">
    <div className="flex justify-between gap-3 items-end">
      <Input
        isClearable
        className="w-full sm:max-w-[44%]"
        placeholder="Search jobs..."
        startContent={<SearchIcon />}
        value={filterValue}
        onClear={onSearchClear}
        onChange={onSearchChange}
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
            onSelectionChange={onStatusFilterChange}
          >
            {statusOptions.map((status) => (
              <DropdownItem key={status} className="capitalize">
                {status}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          color="primary"
          href="/create"
          as={RouterLink}
          endContent={
            <PlusIcon width={undefined} height={undefined} />
          }>
          Add New
        </Button>
      </div>
    </div>
  </div>
);

export default JobApplicationsTableTopContent;