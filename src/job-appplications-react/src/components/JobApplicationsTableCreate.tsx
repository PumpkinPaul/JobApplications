import { Form } from "react-router-dom";
import {
  Button,
  Input,
  Link,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import RouterLink from "./RouterLink";
import { MailIcon } from "../icons/MailIcon";
import { MdSave } from "react-icons/md";

const JobApplicationsTableCreate = () => (
  <div className="container">
    <h1 className="text-3xl">Create <span className="font-thin text-slate-600">New Application</span></h1>
    <Spacer y={2} />
    <Link as={RouterLink} href="/">Back to list</Link>
    <Spacer y={4} />
    <Form method="post">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <Input name="title" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Title" isRequired maxLength={128} />
        <Input name="url" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Url" maxLength={255} placeholder="https://cool-new-job.com" />
        <Input name="jobId" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Job Id" isRequired maxLength={50} />
        <Input name="jobRef" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Job Ref" maxLength={50} />
        <Input name="contactName" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Contact Name" isRequired maxLength={50} />
        <Input name="company" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Company" maxLength={50} />
        <Input name="telephone" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Telephone" maxLength={50} placeholder="" />
        <Input name="email" type="email" size='sm' variant='bordered' labelPlacement="inside" label="Email" maxLength={100} placeholder="example@email.com"
          startContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Textarea
          name="notes"
          label="Notes"
          labelPlacement="inside"
          placeholder="Enter job description"
          variant="bordered"
          className="md:col-span-2"
        />
      </div>
      <Spacer y={8} />
      <Button
        type="submit"
        color="primary"
        endContent={
          <MdSave size={20} />
        }>
        Save
      </Button>
    </Form>
  </div>
);

export default JobApplicationsTableCreate;