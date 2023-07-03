import { NextPage } from "next";
import Layout from "../../components/layout";
import FloatingButton from "../../components/floatingbutton";
import Link from "next/link";

const StreamList: NextPage = () => {
  return (
    <Layout title="라이브" hasTabBar={true}>
      <div className="px-4">
        <div className="flex flex-col space-y-4">
          {[1, 1, 1, 1, 1].map((_, i) => (
            <Link
              href="/stream/1"
              key={i}
              className="flex flex-col space-y-2 border-b pb-3"
            >
              <div className="w-full bg-gray-400 aspect-video rounded-sm" />
              <span className="text-gray-800 text-lg">
                Wow this is a video!
              </span>
            </Link>
          ))}
        </div>
        <FloatingButton href="/stream/create">
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
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default StreamList;
