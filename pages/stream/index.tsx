import { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingbutton";
import Link from "next/link";
import useSWR from "swr";
import { Stream } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useIntersect from "@libs/client/useIntersect";
import { getThumbnailUrl } from "@libs/client/cloudflare";
import Image from "next/image";
import useSWRInfinite from "swr/infinite";

interface IStreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const PAGE_SIZE = 10;

const getKey = (pageIndex: number, previousPageData: IStreamsResponse) => {
  if (previousPageData && previousPageData.streams.length < PAGE_SIZE)
    return null; // reached the end

  return `/api/stream?page=${pageIndex}&pagesize=${PAGE_SIZE}`; // SWR key
};

const StreamList: NextPage = () => {
  const { data, size, setSize, isLoading } =
    useSWRInfinite<IStreamsResponse>(getKey);

  const isEmpty = data?.[0].streams.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1].streams.length < PAGE_SIZE);

  console.log(data);

  return (
    <Layout title="라이브" hasTabBar={true}>
      <div className="px-4">
        <div className="flex flex-col space-y-4">
          {data?.map((item) => {
            return item.streams.map((stream) => (
              <Link
                href={`/stream/${stream.id}`}
                key={stream.id}
                className="flex flex-col space-y-2 border-b pb-3"
              >
                <div className="w-full relative aspect-video rounded-sm">
                  <Image
                    src={getThumbnailUrl(stream.cloudflareId)}
                    alt="thumnail"
                    fill
                  />
                </div>
                <span className="text-gray-800 text-lg">{stream.name}</span>
              </Link>
            ));
          })}

          <button
            onClick={() => setSize(size + 1)}
            disabled={isLoading || isReachingEnd}
          >
            {isLoading
              ? "Loading..."
              : isReachingEnd
              ? "No more data"
              : "Load more data"}
          </button>
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
