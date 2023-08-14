import { cls } from "@libs/client/utils";
import type { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  label: string;
  name: string;
  kind?: "text" | "price" | "password";
  required?: boolean;
  register?: UseFormRegisterReturn;
  type?: string;
  [key: string]: any;
}

const Input = ({
  label,
  name,
  kind = "text",
  required = true,
  register,
  type,
  ...rest
}: IInputProps) => {
  return (
    <div>
      <label
        className="mb-1 block text-sm font-medium text-gray-600"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="rounded-md relative flex  items-center shadow-sm">
        <input
          {...rest}
          {...register}
          id={name}
          type={type ? type : kind === "price" ? "number" : "text"}
          className={cls(
            "appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 ",
            "focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          )}
          required={required}
        />
        {kind === "price" ? (
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">원</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
