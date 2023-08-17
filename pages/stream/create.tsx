import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import TextArea from "@components/textarea";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream } from "@prisma/client";

interface IStreamForm {
  name: string;
  description: string;
}

interface IStreamResponse {
  ok: boolean;
  stream?: Stream;
}

const Create: NextPage = () => {
  const { register, handleSubmit } = useForm<IStreamForm>();
  const [createStream, { result, isLoading }] =
    useMutation<IStreamResponse>("/api/stream");
  const router = useRouter();

  const onValid = (form: IStreamForm) => {
    if (isLoading) return;
    createStream(form);
  };

  useEffect(() => {
    if (result && result.ok) router.push(`/stream/${result.stream?.id}`);
  }, [result, router]);

  return (
    <Layout canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-5 px-4"
      >
        <Input
          register={register("name", { required: true })}
          label="라이브 이름"
          name="livename"
          kind="text"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="설명"
        />
        <Button text="라이브 시작!" isLoading={isLoading} />
      </form>
    </Layout>
  );
};

export default Create;
