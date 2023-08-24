import type { NextPage } from "next";
import useSWR from "swr";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { Item } from "@prisma/client";
import Link from "next/link";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import Image from "next/image";
import { getCloudflareImageUrl } from "@libs/client/cloudflare";

interface IItemWithUserInfo extends Item {
  user: { id: number; username: string; avatarId: string };
}

interface IItemResponse {
  ok: boolean;
  item?: IItemWithUserInfo;
  relatedItems?: Item[];
  isFavorite?: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<IItemResponse>(
    router.query.id ? `/api/items/${router.query.id}` : null
  );
  const [toggleFav, { isLoading }] = useMutation(
    `/api/items/${router.query.id}/favorites`
  );

  const onFavoriteClick = () => {
    if (isLoading || !data) return;
    toggleFav({});
    mutate({ ...data, isFavorite: !data.isFavorite }, false);
  };

  return (
    <Layout canGoBack={true}>
      <div className="flex flex-col px-4 mb-10">
        <div>
          <div className="relative w-full h-96">
            <Image
              src={getCloudflareImageUrl(data?.item?.imageId || "")}
              fill
              alt="itemImage"
              className="rounded-lg object-contain"
            />
          </div>

          <div className="flex  cursor-pointer mt-5 border-b pb-4 items-center space-x-4">
            <Image
              src={getCloudflareImageUrl(
                data?.item?.user.avatarId || "",
                "avatar"
              )}
              height={48}
              width={48}
              alt="uploaderAvatar"
              className="w-12 aspect-square rounded-full bg-gray-400"
            />
            <div>
              <p className="font-medium text-gray-700">
                {data?.item?.user?.username}
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
            <p className="mt-1 text-2xl text-gray-900">{`${data?.item?.price.toLocaleString()}원`}</p>
            <p className="mt-3 text-gray-900">{data?.item?.description}</p>
            <div className="mt-4 flex justify-between">
              <div className="w-1/6" />
              <button className="w-4/6 px-4 py-2 rounded-md font-medium hover:bg-orange-600 focus:ring ring-offset-2 ring-orange-500 hover:ring-orange-600 bg-orange-500 text-white">
                Talk to seller
              </button>
              <button
                onClick={onFavoriteClick}
                className={cls(
                  "w-1/6 flex justify-center items-center cursor-pointer",
                  data?.isFavorite
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={data?.isFavorite ? "currentColor" : "none"}
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
            {data?.relatedItems?.map((item) => (
              <Link href={`/item/${item.id}`} key={item.id}>
                <div className="w-30 aspect-square bg-gray-400" />
                <h3 className="text-sm text-gray-500">{item.name}</h3>
                <p className="text-xs font-semibold text-gray-900">{`${item.price.toLocaleString()}원`}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
