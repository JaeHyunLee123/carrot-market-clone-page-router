import type { NextPage } from "next";
import Message from "@components/message";
import Layout from "@components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout canGoBack={true} title="니꼬">
      <div className="px-4">
        <div className="flex flex-col space-y-3">
          <Message message="안녕?" />
          <Message
            message="밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자밥 한 번 먹자"
            reversed={true}
          />
        </div>
        <div className="fixed m-auto w-full max-w-lg bottom-2 inset-x-0 px-3">
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
    </Layout>
  );
};

export default ChatDetail;
