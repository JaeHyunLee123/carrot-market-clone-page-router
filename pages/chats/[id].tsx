import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <div className="px-4 py-16">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="w-1/2 border border-gray-400 rounded-lg py-2 px-4">
            Hi how much are you selling them for?
          </p>
        </div>
        <div className="flex flex-row-reverse items-center space-x-3 space-x-reverse">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">
            I want ￦20,000
          </p>
        </div>
        <div className="flex  items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">미쳤어?</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="w-1/2 border border-gray-400 rounded-lg py-2 px-4">
            Hi how much are you selling them for?
          </p>
        </div>
        <div className="flex flex-row-reverse items-center space-x-3 space-x-reverse">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">
            I want ￦20,000
          </p>
        </div>
        <div className="flex  items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">미쳤어?</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="w-1/2 border border-gray-400 rounded-lg py-2 px-4">
            Hi how much are you selling them for?
          </p>
        </div>
        <div className="flex flex-row-reverse items-center space-x-3 space-x-reverse">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">
            I want ￦20,000
          </p>
        </div>
        <div className="flex  items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">미쳤어?</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="w-1/2 border border-gray-400 rounded-lg py-2 px-4">
            Hi how much are you selling them for?
          </p>
        </div>
        <div className="flex flex-row-reverse items-center space-x-3 space-x-reverse">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">
            I want ￦20,000
          </p>
        </div>
        <div className="flex  items-center space-x-3">
          <div className="aspect-square w-10 bg-gray-400 rounded-full" />
          <p className="border border-gray-400 rounded-lg py-2 px-4">미쳤어?</p>
        </div>
      </div>
      <div className="fixed m-auto w-full mx-w-md bottom-2 inset-x-0 px-3">
        <div className="relative flex items-center">
          <input
            className="pr-16 shadow-sm rounded-full w-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            type="text"
          />
          <button className="cursor-pointer absolute right-2 rounded-full px-3 py-1 text-white bg-orange-500 focus:ring ring-offset-2 ring-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
