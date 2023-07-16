import type { NextPage } from "next";
import useSWR from "swr";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { Item } from "@prisma/client";
import Link from "next/link";

interface IItemWithUserInfo extends Item {
  user: { id: number; name: string };
}

interface IItemInformation {
  ok: boolean;
  item?: IItemWithUserInfo;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();

  const { data } = useSWR<IItemInformation>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );

  console.log(data);

  return (
    <Layout canGoBack={true} title={data?.item?.name}>
      <div className="flex flex-col px-4">
        <div>
          <div className="w-full h-96 bg-gray-400" />
          <div className="flex  cursor-pointer mt-5 border-b pb-4 items-center space-x-4">
            <div className="w-12 aspect-square rounded-full bg-gray-400" />
            <div>
              <p className="font-medium text-gray-700">
                {data?.item?.user?.name}
              </p>
              <Link
                href={`/proflie/${data?.item?.user?.id}`}
                className="text-sm text-gray-600"
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="font-semibold text-4xl text-gray-900">
              {data?.item?.name}
            </h1>
            <p className="mt-1 text-2xl text-gray-900">{`$${data?.item?.price}`}</p>
            <p className="mt-3 text-gray-900">{data?.item?.description}</p>
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
