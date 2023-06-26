import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 px-10 py-10 grid gap-10 min-h-screen">
      <div className="bg-white p-5 rounded-3xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="flex justify-between my-1">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tooly Table</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-2/4 mx-auto
          hover:bg-teal-500 hover:text-black active:bg-yellow-500 block
        "
        >
          Checkout
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5 -mb-10">
          <div className="flex relative -top-16 justify-between items-end">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-400 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$180</span>
            </div>
          </div>
          <div className="relative flex flex-col -top-10 items-center justify-start -mt-3">
            <span className="text-lg font-medium">이재현</span>
            <span className="text-sm text-gray-500">한국</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <div className="flex justify-between">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>⭐️4.9</span>
            <span className="shadow-lg p-1 rounded-xl">💖</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-60 mb-5" />
        <div>
          <div className="flex flex-col">
            <span className="font-medium mb-1.5">Swoon Lounge</span>
            <span className="text-xs text-gray-500">Chair</span>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="space-x-3">
              <button className="w-5 h-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-1 ring-yellow-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-1 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-1 ring-teal-500 transition" />
            </div>
            <div className="flex justify-center items-center space-x-2">
              <button className="bg-blue-200  text-white rounded-lg p-2 w-8 aspect-square ">
                -
              </button>
              <span className="text-lg">1</span>
              <button className="bg-blue-200  text-white rounded-lg p-2  w-8 aspect-square ">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-3xl">$450</span>
          <button className="bg-blue-500 text-white rounded-lg p-5">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
