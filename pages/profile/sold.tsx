import type { NextPage } from "next";
import Layout from "@components/layout";
import ItemList from "@components/item-list";

const Sold: NextPage = () => {
  return (
    <Layout canGoBack={true} title="판매내역">
      <div className="flex flex-col space-y-5">
        <ItemList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
