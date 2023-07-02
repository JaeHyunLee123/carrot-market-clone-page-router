import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="px-4 py-16">
      <div>
        <label className="cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md text-gray-600 hover:text-orange-500 hover:border-orange-500">
          <svg
            className="h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input className="hidden" type="file" />
        </label>
      </div>
      <div className="mt-5">
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <div className="rounded-md relative flex  items-center shadow-sm">
          <input
            id="name"
            type="email"
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
      </div>
      <div className="my-5">
        <label
          htmlFor="price"
          className="text-sm font-medium text-gray-700 mb-1 block"
        >
          Price
        </label>
        <div className="rounded-md shadow-sm relative flex items-center">
          <div className="pointer-events-none absolute left-0 pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id="price"
            className="px-7 appearance-none w-full py-2 border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm placeholder-gray-400"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute pointer-events-none right-0 pr-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Description
        </label>
        <textarea
          rows={4}
          className="mt-1 shadow-sm w-full focus:ring focus:ring-orange-500 rounded-md boder-gray-500 focus:border-orange-500"
        />
      </div>
      <button className="px-4 py-2 w-full mt-4 rounded-md font-medium hover:bg-orange-600 focus:ring ring-offset-2 ring-orange-500 hover:ring-orange-600 bg-orange-500 text-white">
        Upload product
      </button>
    </div>
  );
};

export default Upload;
