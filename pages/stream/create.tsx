import type { NextPage } from "next";
import Layout from "../../components/layout";
import Button from "../../components/button";
import TextArea from "../../components/textarea";
import Input from "../../components/input";

const Create: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <div className="flex flex-col space-y-5 px-4">
        <Input label="라이브 이름" name="livename" kind="text" />
        <TextArea name="description" label="설명" />
        <Button text="라이브 시작!" />
      </div>
    </Layout>
  );
};

export default Create;
