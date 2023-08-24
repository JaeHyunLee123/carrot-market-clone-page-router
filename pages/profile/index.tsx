import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import useSWR from "swr";
import { Review, User } from "@prisma/client";
import { cls } from "@libs/client/utils";
import { getCloudflareImageUrl } from "@libs/client/cloudflare";
import Image from "next/image";
interface IReviewWithReviewer extends Review {
  reviewedBy: User;
}

interface IReviewsResponse {
  ok: boolean;
  reviews: IReviewWithReviewer[];
}

const Profile: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<IReviewsResponse>("/api/reviews");

  return (
    <Layout title="프로필" hasTabBar={true}>
      <div className="px-4">
        <div className="flex items-center space-x-2">
          <Image
            src={getCloudflareImageUrl(user?.avatarId || "", "avatar")}
            className="aspect-square w-16 rounded-full"
            width={80}
            height={80}
            alt="avatar"
          />
          <div className="flex flex-col">
            <span className=" text-gray-900">{user?.username}</span>
            <Link href="/profile/edit" className="text-sm text-gray-500">
              프로필 편집 &rarr;
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-10">
          <Link
            href="/profile/sold"
            className="flex flex-col items-center space-y-2 cursor-pointer"
          >
            <div className="w-fit bg-orange-500 p-4 rounded-full text-white hover:bg-orange-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm text-gray-500">판매내역</span>
          </Link>
          <Link
            href="/profile/bought"
            className="flex flex-col items-center space-y-2 cursor-pointer"
          >
            <div className="w-fit bg-orange-500 p-4 rounded-full text-white hover:bg-orange-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span className="text-sm text-gray-500">구매내역</span>
          </Link>
          <Link
            href="/profile/loved"
            className="flex flex-col items-center space-y-2 cursor-pointer"
          >
            <div className="w-fit bg-orange-500 p-4 rounded-full text-white hover:bg-orange-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm text-gray-500">관심목록</span>
          </Link>
        </div>
        <div>
          {data?.reviews.map((review) => (
            <div key={review.id}>
              <div className="flex space-x-2 items-center mt-10">
                <img
                  src={getCloudflareImageUrl(
                    review.reviewedBy.avatarId,
                    "avatar"
                  )}
                  className="aspect-square w-14 rounded-full"
                />
                <div>
                  <h4 className="text-gray-900">
                    {review.reviewedBy.username}
                  </h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <svg
                        key={level}
                        className={cls(
                          " h-5 w-5",
                          level <= review.score
                            ? "text-yellow-400"
                            : "text-gray-400"
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-gray-600 px-5">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
