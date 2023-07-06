import type { NextPage } from "next";

import Layout from "@components/layout";

const ItemDetail: NextPage = () => {
  return (
    <Layout canGoBack={true} title="갤럭시 S50">
      <div className="flex flex-col px-4">
        <div>
          <div className="w-full h-96 bg-gray-400" />
          <div className="flex  cursor-pointer mt-5 border-b pb-4 items-center space-x-4">
            <div className="w-12 aspect-square rounded-full bg-gray-400" />
            <div>
              <p className="font-medium text-gray-700">Steve Jebs</p>
              <p className="text-sm text-gray-600">View profile &rarr;</p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="font-semibold text-4xl text-gray-900">갤럭시 S50</h1>
            <p className="mt-1 text-2xl text-gray-900">$140</p>
            <p className="mt-3 text-gray-900">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="mt-4 flex justify-between">
              <div className="w-1/6" />
              <button className="w-4/6 px-4 py-2 rounded-md font-medium hover:bg-orange-600 focus:ring ring-offset-2 ring-orange-500 hover:ring-orange-600 bg-orange-500 text-white">
                Talk to seller
              </button>
              <button className="w-1/6 flex justify-center items-center text-gray-400 hover:text-gray-500">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-semibold text-3xl">Similar items</h2>
          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="w-30 aspect-square bg-gray-400" />
                <h3 className="text-sm text-gray-500">Galaxy S60</h3>
                <p className="text-xs font-semibold text-gray-900">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
