import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import Input from "@components/input";

const EditProfile: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className="px-4 flex flex-col space-y-4">
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

        <Input name="email" label="이메일" kind="email" />
        <Input name="phonenumber" label="휴대폰 번호" kind="phone" />

        <Button text="Update Profile" />
      </div>
    </Layout>
  );
};

export default EditProfile;
