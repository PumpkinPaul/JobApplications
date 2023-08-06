import { PressEvent } from "@react-types/shared";
import { Button, Pagination } from "@nextui-org/react";

const JobsPager = ({
  hasSearchFilter,
  page,
  pages,
  onPageChange,
  onPreviousPage,
  onNextPage
}: {
  hasSearchFilter: boolean,
  page: number,
  pages: number,
  onPageChange: (page: number) => void,
  onPreviousPage: (e: PressEvent) => void,
  onNextPage: (e: PressEvent) => void
}): JSX.Element => (
  <div className="py-2 px-2 flex justify-between items-center">
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      isDisabled={false}
      page={page}
      total={pages}
      onChange={onPageChange}
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

export default JobsPager;
