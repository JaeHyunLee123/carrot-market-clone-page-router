import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";
import ItemList from "@components/item-list";

const Loved: NextPage = () => {
  return (
    <Layout canGoBack={true} title="관심목록">
      <div className="flex flex-col space-y-5">
        <ItemList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;
