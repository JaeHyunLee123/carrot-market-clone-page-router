import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";

interface WriteForm {
  question: string;
}

interface WriteRespose {
  ok: boolean;
  post?: Post;
}

const Write: NextPage = () => {
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, result }] = useMutation<WriteRespose>("/api/post");
  const router = useRouter();

  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
  };

  useEffect(() => {
    if (result && result.ok) router.push(`/community/${result.post?.id}`);
  }, [result, router]);

  return (
    <Layout canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-4 flex flex-col space-y-3"
      >
        <TextArea
          register={register("question", {
            required: true,
            minLength: 5,
            maxLength: 300,
          })}
          placeholder="궁굼한 것을 물어보세요!"
        />
        <Button text={loading ? "로딩중" : "질문 올리기"} />
      </form>
    </Layout>
  );
};

export default Write;
