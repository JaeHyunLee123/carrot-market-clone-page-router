import type { NextPage } from "next";
import Layout from "@components/layout";
import Button from "@components/button";
import TextArea from "@components/textarea";
import Input from "@components/input";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";

interface IUploadItemForm {
  name: string;
  price: number;
  description: string;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<IUploadItemForm>();
  const [uploadItem, { loading, data }] = useMutation("/api/items");

  const onValid = (itemData: IUploadItemForm) => {
    if (loading) return;
    uploadItem(itemData);
  };

  return (
    <Layout canGoBack={true}>
      <form
        onSubmit={handleSubmit(onValid)}
        className="px-4 flex flex-col space-y-4"
      >
        <div>
          <label className="cursor-pointer w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md text-gray-600 hover:text-orange-500 hover:border-orange-500">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input className="hidden" type="file" />
          </label>
        </div>
        <Input
          register={register("name", { required: true })}
          label="상품 이름"
          name="product"
          kind="text"
        />
        <Input
          register={register("price", { required: true })}
          label="가격"
          name="price"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="설명"
        />
        <Button text={loading ? "로딩 중" : "상품 팔기"} />
      </form>
    </Layout>
  );
};

export default Upload;
