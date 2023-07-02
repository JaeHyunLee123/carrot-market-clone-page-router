import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="py-16 px-10">
      <div className="flex flex-col space-y-2">
        {[1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex cursor-pointer mt-5 border-b pb-4 items-center space-x-4"
          >
            <div className="w-12 aspect-square rounded-full bg-gray-400" />
            <div>
              <p className="font-medium text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-600">Hello</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
