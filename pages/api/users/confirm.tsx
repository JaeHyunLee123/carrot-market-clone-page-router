import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const { verification } = req.body;

  const token = await prisma.token.findUnique({
    where: {
      payload: verification,
    },
  });

  if (!token) return res.status(404).end();

  req.session.user = {
    id: token?.userId,
  };
  await req.session.save();
  await prisma.token.deleteMany({
    where: {
      userId: token.userId,
    },
  });
  res.status(200).json({ ok: true });
};

export default withApiSession(withHandler("POST", handler));
