import { getCloudflareImageUrl } from "@libs/client/cloudflare";
import Image from "next/image";
import Link from "next/link";

interface IItemProps {
  title: string;
  id: number;
  price: number;
  hearts: number;
  imageId: string;
}

const Item = ({ title, id, price, hearts, imageId }: IItemProps) => {
  return (
    <Link
      href={`/item/${id}`}
      className="flex border-b pb-4 cursor-pointer justify-between"
    >
      <div className="flex space-x-4">
        <Image
          src={getCloudflareImageUrl(imageId, "menu")}
          alt="item image"
          width={80}
          height={80}
          className="w-20 aspect-square bg-gray-100 rounded-md"
        />
        <div className="pt-2 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className="font-medium mt-1 text-gray-900 ">
            {price.toLocaleString()}원
          </span>
        </div>
      </div>
      <div className="flex justify-end items-end space-x-2">
        <div className="flex items-center text-sm text-gray-500 space-x-0.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{hearts}</span>
        </div>
        {/* <div className="flex items-center text-sm text-gray-500 space-x-0.5">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>{comments}</span>
        </div> */}
      </div>
    </Link>
  );
};

export default Item;
