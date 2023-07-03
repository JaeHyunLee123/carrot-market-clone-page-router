import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";

const Create: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className=" space-y-5 px-4">
        <div>
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

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
            rows={4}
          />
        </div>
        <Button text="Go Live!" />
      </div>
    </Layout>
  );
};

export default Create;
