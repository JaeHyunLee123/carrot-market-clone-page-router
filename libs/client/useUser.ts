import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useUser = () => {
  const { data, error } = useSWR("/api/users/me", fetcher);

  const router = useRouter();

  if (!data.ok) return router.replace("/enter");

  return data;
};

export default useUser;
