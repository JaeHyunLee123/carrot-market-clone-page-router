import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";

interface IEditProfileForm {
  email?: string;
  phone?: string;
  formError?: string;
  name?: string;
}

interface IEditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IEditProfileForm>();
  const [editProfile, { result, loading }] =
    useMutation<IEditProfileResponse>("/api/users/me");

  useEffect(() => {
    setValue("name", user?.name);
    if (user?.email) setValue("email", user?.email);
    if (user?.phone) setValue("phone", user?.phone);
  }, [user, setValue]);

  useEffect(() => {
    if (result && !result.ok) {
      setError("formError", { message: result.error });
    }
  }, [result, setError]);

  const onValid = ({ email, phone, name }: IEditProfileForm) => {
    if (loading) return;
    if (!(email || phone || name)) {
      setError("formError", {
        message: "업데이트 요소 중 하나는 적어야 합니다",
      });
    }
    editProfile({ email, phone, name });
  };

  return (
    <Layout canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-4 flex flex-col space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="aspect-square w-14 bg-gray-400 rounded-full" />
          <div>
            <label
              htmlFor="profileimage"
              className="text-gray-900 border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
            >
              프로필 사진 바꾸기
            </label>
            <input
              id="profileimage"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <Input
          name="name"
          label="닉네임"
          kind="text"
          required={false}
          register={register("name")}
        />
        <Input
          name="email"
          label="이메일"
          kind="email"
          required={false}
          register={register("email")}
        />
        <Input
          name="phonenumber"
          label="휴대폰 번호"
          kind="phone"
          required={false}
          register={register("phone")}
        />
        {errors.formError ? (
          <span className="my-2 text-sm text-red-400 text-center">
            {errors.formError.message}
          </span>
        ) : null}
        <Button text={loading ? "로딩중" : "프로필 업데이트"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
