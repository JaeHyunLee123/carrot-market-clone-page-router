import type { NextPage } from "next";

const EditProfile: NextPage = () => {
  return (
    <div className="py-16 px-4">
      <div className="flex items-center space-x-3">
        <div className="aspect-square w-14 bg-gray-400 rounded-full" />
        <div>
          <label
            htmlFor="profileimage"
            className="text-gray-900 border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
          >
            Change Photo
          </label>
          <input
            id="profileimage"
            type="file"
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>

      <div className="flex flex-col mt-5 space-y-1">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          className="shadow-sm rounded-md w-full border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500"
        />
      </div>

      <div className="flex flex-col mt-5 space-y-1">
        <label htmlFor="phone">Phone number</label>
        <div className="flex rounded-sm shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 select-none bg-gray-50 text-gray-500">
            +82
          </span>
          <input
            id="input"
            className="appearance-none rounded-l-none w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm placeholder-gray-400"
            type="number"
            required
          />
        </div>
      </div>

      <button className="px-4 py-2 w-full mt-4 rounded-md font-medium hover:bg-orange-600 focus:ring ring-offset-2 ring-orange-500 hover:ring-orange-600 bg-orange-500 text-white">
        Update Profile
      </button>
    </div>
  );
};

export default EditProfile;
