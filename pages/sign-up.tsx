import Button from "@components/button";
import ErrorMessage from "@components/errormessage";
import Input from "@components/input";
import Layout from "@components/layout";
import useMutation from "@libs/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ISignupForm {
  username: string;
  password: string;
  passwordConfirm: string;
}

interface ISignupResponse {
  ok: boolean;
  error?: string;
}

const Signup = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<ISignupForm>({ mode: "all" });
  const [signup, { result, isLoading }] =
    useMutation<ISignupResponse>("/api/users/sign-up");

  const onValid = ({ username, password }: ISignupForm) => {
    if (isLoading) return;
    signup({ username, password });
  };

  useEffect(() => {
    if (result && result.ok) router.push("/log-in");

    if (result?.error === "usernameExist") {
      setError("username", { message: "이미 사용중인 닉네임입니다" });
    }
  }, [result, router, setError]);

  return (
    <Layout canGoBack={false}>
      <div className="px-4 pb-10 w-full">
        <h3 className="text-3xl font-bold text-center">캐럿마켓 회원가입</h3>
        <div className="mt-8 w-full flex flex-col items-center">
          <form onSubmit={handleSubmit(onValid)} className="w-4/5 space-y-4">
            <Input
              label="닉네임"
              name="username"
              register={register("username", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 5,
                  message: "5글자 이상 입력해주세요",
                },
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
                minLength: {
                  value: 8,
                  message: "8글자 이상 입력해주세요",
                },
                validate: {
                  mustContainUpperLower: (value) =>
                    (value && /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(value)) ||
                    "소문자와 대문자 각각 한 개 이상 포함되어야합니다",
                  mustContainSpecialChar: (value) =>
                    (value &&
                      /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).+$/.test(value)) ||
                    "특수문자가 한 개 이상 포함되어야 합니다",
                  mustContainDigit: (value) =>
                    (value && /^(?=.*\d).+$/.test(value)) ||
                    "숫자가 한 개 이상 포함되어야 합니다",
                },
              })}
            />
            <ErrorMessage text={errors.password?.message} />

            <Input
              label="비밀번호 확인"
              name="passwordconfirm"
              kind="password"
              type="password"
              register={register("passwordConfirm", {
                required: "비밀번호 확인을 입력해주세요",
                validate: {
                  isPasswordSame: () => {
                    const [original, confrim] = getValues([
                      "password",
                      "passwordConfirm",
                    ]);
                    return (
                      original === confrim || "비밀번호 확인이 같지 않습니다"
                    );
                  },
                },
              })}
            />
            <ErrorMessage text={errors.passwordConfirm?.message} />

            <Button text="회원가입" isLoading={isLoading} />
          </form>
        </div>
      </div>

      <div className="relative">
        <div className="absolute w-full border-t border-gray-300" />
        <div className="relative -top-3 text-center">
          <span className="bg-white px-2 text-sm text-gray-500">
            이미 계정이 있으신가요?
          </span>
        </div>
      </div>
      <Link href="/log-in">
        <span className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-500 hover:bg-gray-400 font-medium">
          로그인
        </span>
      </Link>
    </Layout>
  );
};

export default Signup;
