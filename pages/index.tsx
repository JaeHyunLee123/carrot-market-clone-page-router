import type { NextPage } from "next";
import Layout from "../components/layout";
import FloatingButton from "../components/floatingbutton";
import Item from "../components/item";

const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar={true}>
      <div className="flex flex-col space-y-5 px-4">
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
        <FloatingButton href="/item/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};
export default Home;
