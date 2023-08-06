import { Input } from "@nextui-org/react";

export interface FormInputProps {
  name: string,
  type?: string
  label: string,
  placeholder?: string,
  isRequired?: boolean,
  maxLength?: number
  icon?: React.ReactNode,
  validationState?: "invalid" | "valid",
  errorMessage?: string
}

export default function FormInput({
  icon,
  ...rest
}: FormInputProps) {
  return (
    <Input
      variant='bordered'
      color="primary"
      labelPlacement="inside"
      autoComplete="off"
      endContent={
        <div className="text-2xl text-default-400 pointer-events-none flex-shrink-0">{icon}</div>
      }
      {...rest}>
    </Input>
  );
}