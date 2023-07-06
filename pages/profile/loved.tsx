import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";

const Loved: NextPage = () => {
  return (
    <Layout canGoBack={true} title="관심목록">
      <div className="flex flex-col space-y-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
          key={i}
          id={1}
          title="맥북 에어"
          price={1000000}
          comments={5}
          hearts={10}
        />
        ))}
      </div>
    </Layout>
  );
};

export default Loved;
