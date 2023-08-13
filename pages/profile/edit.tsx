import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";

interface IEditProfileForm {
  email?: string;
  phone?: string;
  formError?: string;
  name?: string;
  avatar?: FileList;
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
    watch,
  } = useForm<IEditProfileForm>();
  const [editProfile, { result, isLoading }] =
    useMutation<IEditProfileResponse>("/api/users/me");
  const [avatarPreview, setAvatarPreview] = useState("");

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

  const newAvatar = watch("avatar");
  useEffect(() => {
    if (newAvatar && newAvatar.length > 0) {
      const file = newAvatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [newAvatar]);

  const onValid = async ({ email, phone, name, avatar }: IEditProfileForm) => {
    if (isLoading) return;
    if (!(email || phone || name || avatar)) {
      setError("formError", {
        message: "업데이트 요소 중 하나는 수정해야 합니다",
      });
    }
    if (avatar && avatar.length > 0) {
      const { id, uploadURL } = await (await fetch("/api/files")).json();

      const form = new FormData();
      form.append("file", avatar[0], `${user?.id}`);
      await fetch(uploadURL, {
        method: "POST",
        body: form,
      });

      return;

      //editProfile({ email, phone, name, avatarUrl });
    } else {
      editProfile({ email, phone, name });
    }
  };

  return (
    <Layout canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-4 flex flex-col space-y-4"
      >
        <div className="flex items-center space-x-3">
          <img
            src={avatarPreview || "#"}
            className="aspect-square w-14 rounded-full"
          />
          <div>
            <label
              htmlFor="profileimage"
              className="text-gray-900 border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
            >
              프로필 사진 바꾸기
            </label>
            <input
              {...register("avatar")}
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
        <Button text={isLoading ? "로딩중" : "프로필 업데이트"} />
      </form>
    </Layout>
  );
};

export default EditProfile;
