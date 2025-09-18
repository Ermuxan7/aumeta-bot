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

type BaseProps = {
  legend: string;
  value?: string | number;
  className?: string;
  error?: string;
  disabled?: boolean;
};

type InputProps = BaseProps &
  ComponentPropsWithoutRef<"input"> & {
    as?: "input";
    registration?: UseFormRegisterReturn;
  };

type TextareaProps = BaseProps &
  ComponentPropsWithoutRef<"textarea"> & {
    as: "textarea";
    rows?: number;
    registration?: UseFormRegisterReturn;
  };

type SelectProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"select">, "onChange" | "value"> & {
    as: "select";
    options: string[] | Option[];
    onChange?: (value: string | number) => void;
    registration?: UseFormRegisterReturn;
  };

type FormFieldProps = InputProps | TextareaProps | SelectProps;
const FormInput = (props: FormFieldProps) => {
  const {
    legend,
    as = "input",
    id,
    registration,
    value,
    className,
    error,
    disabled,
  } = props;
  const inputId = id || legend.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      <fieldset
        disabled={disabled}
        className={clsx(
          "border-1 rounded-xl px-2 py-1 transition-colors duration-200 group",
          disabled && "border-muted/95",
          error
            ? "border-red-500"
            : "border-muted-foreground/70 focus-within:border-primary/70"
        )}
      >
        <legend
          className={clsx(
            "text-sm lg:text-md font-semibold px-2 transition-all duration-200 ease-in",
            disabled && "text-muted-foreground/30",
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
          <Select
            value={
              value !== undefined && value !== null ? String(value) : undefined
            }
            onValueChange={(val) => {
              const num = Number(val);
              (props as SelectProps).onChange?.(isNaN(num) ? val : num);
            }}
            disabled={disabled || !(props as SelectProps).options?.length}
          >
            <SelectTrigger className="w-full border-none" aria-label={legend}>
              <SelectValue placeholder={legend} />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {(props as SelectProps).options?.length ? (
                (props as SelectProps).options.map(
                  (option: string | Option) => {
                    const optValue =
                      typeof option === "string"
                        ? option
                        : String(option.value);
                    const optLabel =
                      typeof option === "string" ? option : option.label;

                    return (
                      <SelectItem key={optValue} value={optValue}>
                        {optLabel}
                      </SelectItem>
                    );
                  }
                )
              ) : (
                <div className="p-2 text-muted-foreground">No options</div>
              )}
            </SelectContent>
          </Select>
        )}
      </fieldset>
      {error && <p className="text-red-500 text-sm px-2 mt-1">{props.error}</p>}
    </div>
  );
};

export default FormInput;
