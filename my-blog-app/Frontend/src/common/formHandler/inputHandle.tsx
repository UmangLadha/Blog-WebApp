import {
  UseFormRegister,
  FieldValues,
  Path,
  ValidationRule,
  FieldError,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  inputPlaceholder: string;
  inputType: string;
  errorMsg?: string;
  required: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
  minLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  matchWith?:string
}

function Input<T extends FieldValues>({
  label,
  name,
  inputType,
  inputPlaceholder,
  register,
  errorMsg,
  required,
  error,
  minLength,
  pattern,
  matchWith
}: InputProps<T>) {
  return (
    <div className="flex flex-col mb-3 w-full text-left">
      {label && (
        <label className="mb-1 font-medium text-gray-700">{label}</label>
      )}
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        {...register(name, {
          required: {
            value: required,
            message: errorMsg || "This field is required",
          },
          minLength,
          pattern,
          validate: matchWith?(value) =>
            value === matchWith || "Passwords do not match":undefined
        })} //running checking is matchWith value is there or not only then running validate function
        className="border outline-none py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-300"
      />
      {error && (
        <span className="text-red-500 text-sm">
          {errorMsg || error.message}
        </span>
      )}
    </div>
  );
}

export default Input;
