import { ComponentPropsWithoutRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { label: string; value: string | number };

type InputProps = {
  legend: string;
  as?: "input";
  registration?: UseFormRegisterReturn;
  error?: string;
} & ComponentPropsWithoutRef<"input">;

type TextareaProps = {
  legend: string;
  as: "textarea";
  rows?: number;
  registration?: UseFormRegisterReturn;
  error?: string;
} & ComponentPropsWithoutRef<"textarea">;

type SelectProps = {
  legend: string;
  as: "select";
  options: string[] | Option[];
  className?: string;
  registration?: UseFormRegisterReturn;
  error?: string;
} & ComponentPropsWithoutRef<"select">;

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const FormInput = (props: FormFieldProps) => {
  const { legend, as = "input", id, registration, className, error } = props;
  const inputId = id || legend.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <fieldset
        className={clsx(
          "border-1 rounded-xl px-2 py-1 transition-colors duration-200 group",
          error
            ? "border-red-500"
            : "border-muted-foreground/70 focus-within:border-primary/70"
        )}
      >
        <legend
          className={clsx(
            "text-sm lg:text-md font-semibold px-2",
            error
              ? "text-red-500"
              : "text-muted-foreground group-focus-within:text-primary"
          )}
        >
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
            className="bg-transparent w-full min-h-20 text-base md:text-lg outline-none border-none px-2 resize-y"
            {...(props as TextareaProps)}
            {...registration}
          />
        )}

        {/* {as === "select" && (
          <select
            id={inputId}
            className="bg-transparent w-full text-base md:text-lg outline-none border-none px-2 pb-1.5"
            {...(props as SelectProps)}
            {...registration}
          >
            {(props as SelectProps).options.map((option) => (
              <option key={option} value={option} className="bg-background">
                {option}
              </option>
            ))}
          </select>
        )} */}
        {as === "select" && (
          <Select {...registration}>
            <SelectTrigger
              id={inputId}
              className={clsx(
                "w-full bg-transparent text-base md:text-lg border-none outline-none pb-3",
                error ? "border-red-500" : "border-muted-foreground/70"
              )}
            >
              <SelectValue placeholder={legend} />
            </SelectTrigger>
            <SelectContent className="bg-background group">
              {(props as SelectProps).options.map((option) => {
                const value =
                  typeof option === "string" ? option : option.value.toString();
                const label =
                  typeof option === "string" ? option : option.label;

                return (
                  <SelectItem
                    key={value}
                    value={value}
                    className="cursor-pointer px-2 py-1 rounded-md transition-colors data-[highlighted]:bg-muted data-[highlighted]:text-foreground"
                  >
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </fieldset>
      {error && <p className="text-red-500 text-sm px-2 mt-1">{props.error}</p>}
    </div>
  );
};

export default FormInput;
