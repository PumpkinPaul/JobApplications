import {
  Button,
  Spacer,
} from "@nextui-org/react";
import RouterLink from "./RouterLink";
import { PlusIcon } from "../icons/PlusIcon";

interface Props {
}

const JobApplicationsTableCreate = ({
}: Props): JSX.Element => (
  <>
    <h1 className="text-6xl">Create New Application</h1>
    <Spacer y={8} />
    <div className="flex">
      <Button
        color="primary"
        href="/"
        as={RouterLink}
        endContent={
          <PlusIcon width={undefined} height={undefined} />
        }>
        Cancel
      </Button>
      <Spacer x={8} />
      <Button
        color="primary"
        href="/create"
        as={RouterLink}
        endContent={
          <PlusIcon width={undefined} height={undefined} />
        }>
        Save
      </Button>
    </div>
  </>
);

export default JobApplicationsTableCreate;