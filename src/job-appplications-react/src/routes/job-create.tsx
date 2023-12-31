import { Form, useActionData } from "react-router-dom";
import { Button, RadioGroup, Radio, Link, Spacer, Textarea } from "@nextui-org/react";
import RouterLink from "../components/shared/router-link";
import FormInput from "../components/shared/form-input";
import { MdSave } from "react-icons/md";
import { BiChevronsLeft, BiSolidErrorCircle, BiSolidFile, BiSolidFileBlank, BiSolidBuildingHouse, BiSolidEnvelope, BiSolidNotepad, BiSolidUserCircle, BiWorld } from "react-icons/bi";
import { PiPhoneCallFill } from "react-icons/pi";

export default function JobCreate() {
  const actionData = useActionData() as string;
  let errors;
  if (actionData) {
    errors = JSON.parse(actionData);
    console.log(errors);
  }

  return (
    <div className="grid h-screen place-items-center">
      <div className="container mx-auto max-w-2xl bg-zinc-950 rounded-lg p-4 m-2 border-2 border-solid border-zinc-900">
        <h1 className="text-3xl">Create <span className="font-thin text-slate-600">New Application</span></h1>
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
        <Form method="post">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormInput name="title" label="Title" placeholder="Title of the job" isRequired maxLength={128} icon={<BiWorld />} />
            <FormInput name="url" label="Url" placeholder="https://cool-new-job.com" maxLength={255} icon={<BiSolidNotepad />} />
            <RadioGroup name="jobType" label="Select Job Type" orientation="horizontal" isRequired color="primary">
              <Radio value="Contract" size="sm" color="success">Contract</Radio>
              <Radio value="Permanent" size="sm" color="secondary">Permanent</Radio>
            </RadioGroup>
            <FormInput name="jobId" label="Job Id" isRequired maxLength={50} icon={<BiSolidFile />}
              validationState={errors?.errors["JobId"] ? "invalid" : "valid"}
              errorMessage={errors?.errors["JobId"] ? errors?.errors['JobId'][0] : ""}
            />
            <FormInput name="jobRef" label="Job Ref" maxLength={50} icon={<BiSolidFileBlank />} />
            <FormInput name="contactName" label="Contact Name" isRequired maxLength={50} icon={<BiSolidUserCircle />} />
            <FormInput name="company" label="Company" maxLength={50} icon={<BiSolidBuildingHouse />} />
            <FormInput name="telephone" label="Telephone" maxLength={50} icon={<PiPhoneCallFill />} />
            <FormInput name="email" label="Email" type="email" placeholder="example@somewhere.com" maxLength={100} icon={<BiSolidEnvelope />} />
            <Textarea name="notes" label="Notes" labelPlacement="inside" placeholder="Enter details and updates about this job" variant="bordered" color="primary" className="md:col-span-2" />
          </div>
          <Spacer y={8} />
          <Button type="submit" color="primary" endContent={<MdSave size={20} />}>Save</Button>
        </Form >
      </div >
    </div>
  );
}