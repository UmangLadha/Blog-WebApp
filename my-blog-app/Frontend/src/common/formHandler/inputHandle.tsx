import { UseFormRegister, FieldValues, Path } from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  inputPlaceholder: string;
  inputType: string;
  errorMsg?: string;
  required: boolean;
  register: UseFormRegister<T>;
  error?: string;
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
}: InputProps<T>) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 font-medium text-gray-700">{label}</label>
      <input
        type={inputType}
        placeholder={inputPlaceholder}
        {...register(name, { required })}
        className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      {error && (
        <span className="text-red-500 text-sm">{errorMsg || error}</span>
      )}
    </div>
  );
}

export default Input;
