import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  return res.json({ ok: true });
};

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
