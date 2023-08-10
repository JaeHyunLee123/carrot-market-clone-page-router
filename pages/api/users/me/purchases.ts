import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const {
    session: { user },
  } = req;

  if (!user) return res.status(400).json({ ok: false });

  const purchases = await prisma.transaction.findMany({
    where: {
      buyerId: user.id,
    },
    include: {
      item: {
        include: {
          _count: {
            select: {
              favorites: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({ ok: true, purchases });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
