import { useState, useEffect } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Spacer, Textarea } from "@nextui-org/react";
import RouterLink from "./RouterLink";
import { MdSave } from "react-icons/md";
import { BiChevronsLeft, BiSolidErrorCircle } from "react-icons/bi";
import { IJobApplication } from "./JobApplications";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

const statusOptions = ["Applied", "AwaitingCall", "Interview", "Expired", "Declined", "Filled", "Dead"];

const JobApplicationsEdit = () => {
  const [status, setStatus] = useState("");

  const actionData = useActionData() as string;
  let errors;
  if (actionData) {
    errors = JSON.parse(actionData);
    console.log(errors);
  }

  const loaderData = useLoaderData() as IJobApplication;
  const { notes } = loaderData;

  useEffect(() => {
    setStatus(loaderData.status);
  }, [loaderData]);

  return (
    <div className="grid h-screen place-items-center">
      <div className="container mx-auto max-w-2xl bg-zinc-950 rounded-lg p-4 m-2 border-2 border-solid border-zinc-900">
        <h1 className="text-3xl">Edit <span className="font-thin text-slate-600">Application</span></h1>
        <Spacer y={2} />
        <Link as={RouterLink} href="/"><BiChevronsLeft /> Back to list</Link>
        <Spacer y={4} />
        {errors && (
          <>
            <div className="bg-danger-300 rounded-lg p-4">
              <BiSolidErrorCircle className="text-2xl flex-shrink-0 inline-block mr-2" />
              {errors?.title}
            </div>
            <Spacer y={4} />
          </>
        )}
        <Form method="patch">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <input name="status" type="hidden" value={status} />
            <Dropdown>
              <DropdownTrigger>
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  {status}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={true}
                selectionMode="single"
                onAction={(key) => setStatus(key as string)}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    {status}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Textarea
              name="notes"
              label="Notes"
              labelPlacement="inside"
              placeholder="Enter details and updates about this job"
              variant="bordered"
              color="primary"
              className="md:col-span-2"
              defaultValue={notes}
            />
          </div>
          <Spacer y={8} />
          <Button
            type="submit"
            color="primary"
            endContent={<MdSave size={20} />}
          >
            Save
          </Button>
        </Form >
      </div >
    </div >
  );
}

export default JobApplicationsEdit;