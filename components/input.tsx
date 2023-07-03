import { cls } from "../libs/utils";

interface IInputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price" | "email";
  required?: boolean;
  [key: string]: any;
}

const Input = ({
  label,
  name,
  kind = "text",
  required = true,
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
        {kind === "phone" ? (
          <span className="h-[42px] flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
        ) : null}
        <input
          id={name}
          type={
            kind === "text" ? "text" : kind === "email" ? "email" : "number"
          }
          className={cls(
            "appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 ",
            "focus:outline-none focus:ring-orange-500 focus:border-orange-500",
            kind === "phone" ? "rounded-l-none" : ""
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
