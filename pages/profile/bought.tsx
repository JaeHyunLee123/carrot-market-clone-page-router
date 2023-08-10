import type { NextPage } from "next";
import Layout from "@components/layout";
import Item from "@components/item";
import ItemList from "@components/item-list";

const Bought: NextPage = () => {
  return (
    <Layout canGoBack={true} title="구매내역">
      <div className="flex flex-col space-y-5">
        <ItemList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;
