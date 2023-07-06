import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack={true}>
      <form className="px-4 flex flex-col space-y-3">
        <TextArea placeholder="궁굼한 것을 물어보세요!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
