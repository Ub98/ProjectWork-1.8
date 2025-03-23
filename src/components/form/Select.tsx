import { Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
  name: string;
  control: any;
  error?: boolean;
  hint?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  className = "",
  name,
  control,
  error,
  hint,
  disabled,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isError = fieldState.error ? true : error;

        return (
          <div className="relative">
            <select
              disabled={disabled}
              {...field}
              className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
                field.value
                  ? "text-gray-800 dark:text-white/90"
                  : "text-gray-400 dark:text-gray-400"
              } ${className} ${isError ? "border-error-500" : ""} ${
                disabled
                  ? "text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                  : ""
              }`}
            >
              {/* Placeholder option */}
              <option value="" disabled>
                {placeholder}
              </option>
              {/* Map over options */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Mostra errore o hint */}
            {(hint || fieldState.error?.message) && (
              <p
                className={`mt-1.5 text-xs ${
                  isError ? "text-error-500" : "text-gray-500"
                }`}
              >
                {fieldState.error?.message || hint}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default Select;
