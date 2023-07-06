import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/clients";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(401).end();
  }

  //TODO: Deal with data
  console.log(req.body);

  res.status(200).end();
};

export default handler;
