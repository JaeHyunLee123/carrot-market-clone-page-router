import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler, { IResposeType } from "@libs/server/withHandler";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  //TODO: Deal with data
  const { verification } = req.body;

  console.log(verification);
  res.status(200).end();
};

export default withHandler("POST", handler);
