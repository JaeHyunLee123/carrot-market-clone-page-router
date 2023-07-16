import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const { id } = req.query;

  if (!id) return res.status(400).json({ ok: false });

  const item = await prisma.item.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  if (!item) return res.status(404).json({ ok: false });

  return res.json({ ok: true, item });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
