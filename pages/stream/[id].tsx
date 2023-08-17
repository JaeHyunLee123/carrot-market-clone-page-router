import { NextPage } from "next";
import Layout from "@components/layout";
import Message from "@components/message";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Stream, User } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect, useRef } from "react";
import { getCloudflareImageUrl } from "@libs/client/cloudflare-image";

interface IStreamWithMessage extends Stream {
  messages: {
    message: string;
    id: number;
    user: { id: number; avatarId?: string };
  }[];
}

interface IStreamResponse {
  ok: boolean;
  stream: IStreamWithMessage;
}

interface IMessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IMessageForm>();
  const { data, mutate } = useSWR<IStreamResponse>(
    router.query.id ? `/api/stream/${router.query.id}` : null
  );
  const [sendMessage, { isLoading, result }] = useMutation(
    `/api/stream/${router.query.id}/messages`
  );

  const onValid = (form: IMessageForm) => {
    if (isLoading || !user) return;
    reset();
    mutate(
      (prev) =>
        prev && {
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                message: form.message,
                user: { id: user.id, avatar: user.avatar || undefined },
                id: Date.now(),
              },
            ],
          },
        },
      false
    );
    sendMessage(form);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });

  return (
    <Layout canGoBack={true}>
      <div className="px-4 pb-10">
        <div className="flex flex-col space-y-2 pb-3 mt-4">
          <div className="w-full bg-gray-400 aspect-video rounded-sm" />
          <span className="text-gray-800 text-2xl text-center">
            {data?.stream.name}
          </span>
          <span className="text-gray-600 text-sm">
            {data?.stream.description}
          </span>
        </div>

        <div className="flex flex-col space-y-3 mt-5 h-[45vh] overflow-y-scroll">
          <div className="flex flex-col space-y-3">
            {data?.stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id}
                avatarUrl={getCloudflareImageUrl(
                  message.user.avatarId || "",
                  "avatar"
                )}
              />
            ))}
            <div ref={scrollRef} />
          </div>
        </div>

        <div className="fixed m-auto w-full max-w-lg bottom-2 inset-x-0 px-3">
          <form
            onSubmit={handleSubmit(onValid)}
            className="relative flex items-center"
          >
            <input
              {...register("message", { required: true })}
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
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default StreamDetail;
