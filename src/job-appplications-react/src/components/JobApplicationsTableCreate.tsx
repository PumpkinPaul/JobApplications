import { Form, useActionData } from "react-router-dom";
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
import {
  BiChevronsLeft,
  BiSolidErrorCircle,
  BiSolidFile,
  BiSolidFileBlank,
  BiSolidBuildingHouse,
  BiSolidNotepad,
  BiSolidUserCircle, BiWorld
} from "react-icons/bi";
import { PiPhoneCallFill } from "react-icons/pi";

interface IProblemDetails {
  errors: object,
  status: number,
  title: string,
  type: string
}

interface IPwcInputProps {
  name: string,
  type: string
}

const PwcInput = ({
  name: string,
}: IPwcInputProps) => {
  return (
    <Input name="url" type="text" variant='bordered' labelPlacement="inside" label="Url" maxLength={255} placeholder="https://cool-new-job.com"
      startContent={
        <BiWorld className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
      }>
    </Input>
  );
}

const JobApplicationsTableCreate = () => {
  const actionData = useActionData() as string;
  let errors;
  if (actionData) {
    errors = JSON.parse(actionData);
    console.log(errors);
  }
  return (
    <div className="container">
      <h1 className="text-3xl">Create <span className="font-thin text-slate-600">New Application</span></h1>
      <Spacer y={2} />
      <Link as={RouterLink} href="/"><BiChevronsLeft /> Back to list</Link>
      <Spacer y={4} />
      {errors && (
        <>
          <div className="bg-danger rounded-lg p-4">
            <BiSolidErrorCircle className="text-2xl flex-shrink-0 inline-block mr-2" />
            {errors?.title}
          </div>
          <Spacer y={4} />
        </>
      )}
      <Form method="post">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Input name="title" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Title" isRequired maxLength={128}
            startContent={
              <BiSolidNotepad className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }>
          </Input>
          <Input name="url" type="text" variant='bordered' labelPlacement="inside" label="Url" maxLength={255} placeholder="https://cool-new-job.com"
            startContent={
              <BiWorld className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }>
          </Input>
          <Input name="jobId" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Job Id" isRequired maxLength={50}
            startContent={
              <BiSolidFile className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            validationState={errors?.errors["JobId"] ? "invalid" : "valid"}
            errorMessage={errors?.errors["JobId"] ? errors?.errors['JobId'][0] : ""}
          >
          </Input>
          <Input name="jobRef" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Job Ref" maxLength={50}
            startContent={
              <BiSolidFileBlank className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }>
          </Input>
          <Input name="contactName" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Contact Name" isRequired maxLength={50}
            startContent={
              <BiSolidUserCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }>
          </Input>
          <Input name="company" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Company" maxLength={50}
            startContent={
              <BiSolidBuildingHouse className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }>
          </Input>
          <Input name="telephone" type="text" size='sm' variant='bordered' labelPlacement="inside" label="Telephone" maxLength={50} placeholder=""
            startContent={
              <PiPhoneCallFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }>
          </Input>
          <Input name="email" type="email" size='sm' variant='bordered' labelPlacement="inside" label="Email" maxLength={100} placeholder="example@email.com"
            startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Textarea
            name="notes"
            label="Notes"
            labelPlacement="inside"
            placeholder="Enter details and updates about this job"
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
      </Form >
    </div >
  );
}

export default JobApplicationsTableCreate;