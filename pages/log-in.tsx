import { useEffect, useState } from "react";
import Button from "@components/button";
import Layout from "@components/layout";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorMessage from "@components/errormessage";

interface ILoginForm {
  username: string;
  password: string;
}

interface ILoginResponse {
  ok: boolean;
  error?: string;
}

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginForm>({ mode: "all" });
  const [login, { result, isLoading }] =
    useMutation<ILoginResponse>("/api/users/log-in");

  const onValid = (form: ILoginForm) => {
    if (isLoading) return;
    login(form);
  };

  useEffect(() => {
    if (result && result.ok) router.push("/");
    if (result?.error === "noUser")
      setError("username", { message: "이 닉네임은 존재하지 않습니다" });
    if (result?.error === "passwordIncorrect")
      setError("password", { message: "비밀번호가 올바르지 않습니다" });
  }, [result, router, setError]);

  return (
    <Layout canGoBack={false}>
      <div className="px-4 pb-10 w-full">
        <h3 className="text-3xl font-bold text-center">캐럿마켓 로그인</h3>
        <div className="mt-8 w-full flex flex-col items-center">
          <form onSubmit={handleSubmit(onValid)} className="space-y-4 w-4/5">
            <Input
              label="닉네임"
              name="username"
              register={register("username", {
                required: "닉네임을 입력해주세요",
              })}
            />
            <ErrorMessage text={errors.username?.message} />
            <Input
              label="비밀번호"
              name="password"
              kind="password"
              type="password"
              register={register("password", {
                required: "비밀번호를 입력해주세요",
              })}
            />
            <ErrorMessage text={errors.password?.message} />
            <Button text="로그인" isLoading={isLoading} />
          </form>
        </div>
      </div>

      <div className="relative">
        <div className="absolute w-full border-t border-gray-300" />
        <div className="relative -top-3 text-center">
          <span className="bg-white px-2 text-sm text-gray-500">
            아직 계정이 없으신가요?
          </span>
        </div>
      </div>
      <Link href="/sign-up">
        <span className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-500 hover:bg-gray-400 font-medium">
          회원가입
        </span>
      </Link>
    </Layout>
  );
};

export default Login;
