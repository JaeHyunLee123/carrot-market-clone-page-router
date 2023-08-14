interface IErrorMessageProps {
  text?: string;
}

const ErrorMessage = ({ text }: IErrorMessageProps) => {
  return (
    <span className="text-sm text-center text-red-500">
      {text ? text : null}
    </span>
  );
};

export default ErrorMessage;
