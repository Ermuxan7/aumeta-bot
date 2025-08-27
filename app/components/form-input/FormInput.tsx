import { ComponentPropsWithoutRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  legend: string;
  as?: "input";
  registration?: UseFormRegisterReturn;
} & ComponentPropsWithoutRef<"input">;

type TextareaProps = {
  legend: string;
  as: "textarea";
  registration?: UseFormRegisterReturn;
} & ComponentPropsWithoutRef<"textarea">;

type SelectProps = {
  legend: string;
  as: "select";
  options: string[];
  className?: string;
  registration?: UseFormRegisterReturn;
} & ComponentPropsWithoutRef<"select">;

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const FormInput = (props: FormFieldProps) => {
  const { legend, as = "input", id, registration, className } = props;
  const inputId = id || legend.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <fieldset className="border border-muted-foreground rounded-lg px-2 py-1 focus-within:border-primary transition-colors duration-200">
        <legend className="text-muted-foreground  text-sm lg:text-md px-2">
          <label htmlFor={inputId}>{legend}</label>
        </legend>
        {as === "input" && (
          <input
            id={inputId}
            className="bg-transparent w-full text-base md:text-lg outline-none border-none px-2 py-1 mb-1 "
            {...(props as InputProps)}
            {...registration}
          />
        )}
        {as === "textarea" && (
          <textarea
            id={inputId}
            className="bg-transparent w-full min-h-20 max-h-60 text-base md:text-lg outline-none border-none px-2 resize-y "
            {...(props as TextareaProps)}
            {...registration}
          />
        )}

        {as === "select" && (
          <select
            id={inputId}
            className="bg-transparent w-full text-base md:text-lg outline-none border-none px-2 py-1"
            {...(props as SelectProps)}
            {...registration}
          >
            {(props as SelectProps).options.map((option) => (
              <option key={option} value={option} className="bg-background">
                {option}
              </option>
            ))}
          </select>
        )}
      </fieldset>
    </div>
  );
};

export default FormInput;
