import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/clients";
import withHandler from "@libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //TODO: Deal with data
  console.log(req.body);

  res.status(200).end();
};

export default withHandler("POST", handler);
