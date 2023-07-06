import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingbutton";
import Link from "next/link";

const Community: NextPage = () => {
  return (
    <Layout title="동네 생활" hasTabBar={true}>
      <div className="px-4 relative">
        {[1, 1, 1, 1, 1].map((v, index) => (
          <Link
            href="/community/1"
            key={index}
            className="flex flex-col space-y-2 border-b pb-3  border-gray-300 mb-4"
          >
            <span className="rounded-full w-fit bg-gray-200 text-gray-900 px-2 py-0.5 text-xs font-semibold">
              동네질문
            </span>
            <span className="font-semibold text-gray-900">
              <span className="text-orange-500">Q.</span> What is the best mandu
              restaurant?
            </span>
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm text-gray-500">니꼬</span>
              <span className="text-sm text-gray-500">18시간 전</span>
            </div>
            <div className="flex space-x-2">
              <span className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-700 cursor-pointer">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 1</span>
              </span>
              <span className="flex items-center space-x-1 text-gray-600 text-sm hover:text-gray-700 cursor-pointer">
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
                <span>답변 1</span>
              </span>
            </div>
          </Link>
        ))}
        <FloatingButton href="/community/write">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              border-gray-300
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
