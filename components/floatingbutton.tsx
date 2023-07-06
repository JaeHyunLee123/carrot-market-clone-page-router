import Link from "next/link";
import React from "react";
import { cls } from "../libs/client/utils";

interface IFloatingButtonProps {
  children: React.ReactNode;
  href: string;
}

const FloatingButton = ({ href, children }: IFloatingButtonProps) => {
  return (
    <Link
      className={cls(
        "cursor-pointer transition-colors fixed bottom-32 right-5 bg-orange-500 rounded-full p-4 shadow-xl text-white",
        "hover:bg-orange-600"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default FloatingButton;
