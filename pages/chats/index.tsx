import type { NextPage } from "next";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar={true}>
      <div className="px-4">
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
    </Layout>
  );
};

export default Chats;
