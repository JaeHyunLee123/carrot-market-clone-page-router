import { cls } from "../libs/client/utils";
import { useState, useEffect } from "react";

interface IMessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

const Message = ({ message, avatarUrl, reversed }: IMessageProps) => {
  return (
    <div
      className={cls(
        "flex  items-start space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      <div className="w-8 aspect-square flex-shrink-0 rounded-full bg-slate-400" />
      <div
        className={`max-w-[200px] text-sm text-gray-700 p-2 border border-gray-300 rounded-md`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
