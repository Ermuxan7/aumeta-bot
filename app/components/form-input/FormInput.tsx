import { ComponentPropsWithoutRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";

type InputProps = {
  legend: string;
  as?: "input";
  registration?: UseFormRegisterReturn;
  error?: string
} & ComponentPropsWithoutRef<"input">;

type TextareaProps = {
  legend: string;
  as: "textarea";
  rows?: number;
  registration?: UseFormRegisterReturn;
  error?: string
} & ComponentPropsWithoutRef<"textarea">;

type SelectProps = {
  legend: string;
  as: "select";
  options: string[];
  className?: string;
  registration?: UseFormRegisterReturn;
  error?: string
} & ComponentPropsWithoutRef<"select">;

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const FormInput = (props: FormFieldProps) => {
  const { legend, as = "input", id, registration, className, error } = props;
  const inputId = id || legend.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <fieldset className={clsx("border-1  rounded-lg px-2 py-1 transition-colors duration-200 group", error ? "border-red-500" : "border-muted-foreground focus-within:border-primary")}>
        <legend className={clsx("text-sm lg:text-md font-semibold px-2", error ? "text-red-500"
      : "text-muted-foreground group-focus-within:text-primary")}>
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
            rows={(props as TextareaProps).rows ?? 3}
            className="bg-transparent w-full min-h-20 max-h-80 text-base md:text-lg outline-none border-none px-2 resize-y"
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
      {error && (
          <p className="text-red-500 text-sm px-2 mt-1">{props.error}</p>
        )}
    </div>
  );
};

export default FormInput;
