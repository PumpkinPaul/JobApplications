import { useState, useEffect } from "react";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Spacer, Textarea } from "@nextui-org/react";
import RouterLink from "../components/shared/router-link";
import { MdSave } from "react-icons/md";
import { BiChevronsLeft, BiSolidErrorCircle } from "react-icons/bi";
import { ApplicationStatus, Job } from "../components/job/job-types";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { statusColorMap } from "../components/job/jobs-table";

const statusOptions = ["Applied", "AwaitingCall", "Interview", "Expired", "Declined", "Filled", "Dead"];

export default function JobEdit() {
  const [status, setStatus] = useState<ApplicationStatus>();

  const actionData = useActionData() as string;
  let errors;
  if (actionData) {
    errors = JSON.parse(actionData);
    console.log(errors);
  }

  const loaderData = useLoaderData() as Job;
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
                  <Chip className="border-none gap-1" color={statusColorMap[status as ApplicationStatus] || "primary"} size="sm" variant="dot">
                    {status}
                  </Chip>
                </Button>
              </DropdownTrigger>
              <DropdownMenu disallowEmptySelection aria-label="Table Columns" closeOnSelect={true} selectionMode="single" onAction={(key) => setStatus(key as ApplicationStatus)}>
                {statusOptions.map((status) => (
                  <DropdownItem key={status} className="capitalize">
                    <Chip className="text-zinc-500 text-tiny border-none gap-1" color={statusColorMap[status as ApplicationStatus] || "primary"} size="sm" variant="dot">
                      {status}
                    </Chip>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Textarea name="notes" label="Notes" labelPlacement="inside" placeholder="Enter details and updates about this job" variant="bordered" color="primary" className="md:col-span-2" defaultValue={notes} />
          </div>
          <Spacer y={8} />
          <Button type="submit" color="primary" endContent={<MdSave size={20} />}>
            Save
          </Button>
        </Form >
      </div >
    </div >
  );
}