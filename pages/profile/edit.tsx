import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import { getCloudflareImageUrl } from "@libs/client/utils";
import { uploadImage } from "@libs/client/cloudflare-image";

interface IEditProfileForm {
  formError?: string;
  username?: string;
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
    setValue("username", user?.username);
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

  const onValid = async ({ username, avatar }: IEditProfileForm) => {
    if (isLoading) return;
    if (!(username || avatar)) {
      setError("formError", {
        message: "업데이트 요소 중 하나는 수정해야 합니다",
      });
    }
    if (avatar && avatar.length > 0) {
      const id = await uploadImage(avatar[0], `${user?.id}-avatar`);

      editProfile({ username, avatarId: id });
    } else {
      editProfile({ username });
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
            src={
              avatarPreview ||
              getCloudflareImageUrl(user?.avatarId || "", "avatar")
            }
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
          register={register("username")}
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
