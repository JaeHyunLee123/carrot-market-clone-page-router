import { NextPage } from "next";

const StreamList: NextPage = () => {
  return (
    <div className="px-4 py-16">
      <div className="flex flex-col"></div>
      {[1, 1, 1, 1, 1].map((_, i) => (
        <div key={i} className="flex flex-col space-y-2 border-b pb-3 mt-4">
          <div className="w-full bg-gray-400 aspect-video rounded-sm" />
          <span className="text-gray-800 text-lg">Wow this is a video!</span>
        </div>
      ))}
      <button className="hover:bg-orange-500 cursor-pointer transition-colors fixed bottom-16 right-5 bg-orange-400 rounded-full p-4 shadow-xl text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default StreamList;
