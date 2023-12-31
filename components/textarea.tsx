import { cls } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface ITextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  [key: string]: any;
}

const TextArea = ({
  label,
  name,
  placeholder,
  register,
  ...rest
}: ITextAreaProps) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        {...register}
        id={name}
        className={cls(
          "mt-1 shadow-sm w-full  rounded-md border-gray-300 text-sm",
          "focus:ring-orange-500 focus:border-orange-500"
        )}
        placeholder={placeholder}
        rows={4}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
