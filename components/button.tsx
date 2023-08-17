import { cls } from "@libs/client/utils";

interface IButtonProps {
  large?: boolean;
  text: string;
  isLoading?: boolean;
  [key: string]: any;
}

const Button = ({
  large = false,
  onClick,
  text,
  isLoading = false,
  ...rest
}: IButtonProps) => {
  return (
    <button
      {...rest}
      className={cls(
        "w-full bg-orange-500 text-white px-4 border border-transparent rounded-md shadow-sm font-medium ",
        "hover:bg-orange-600",
        "focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none",
        large ? "py-3 text-base" : "py-2 text-sm "
      )}
      disabled={isLoading}
    >
      {isLoading ? "로딩중" : text}
    </button>
  );
};

export default Button;
