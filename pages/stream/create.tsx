import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";
import TextArea from "../../components/textarea";

const Create: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className=" space-y-5 px-4">
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            라이브 이름
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

        <TextArea name="description" label="설명" />
        <Button text="라이브 시작!" />
      </div>
    </Layout>
  );
};

export default Create;
