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

  const reviews = await prisma.review.findMany({
    where: {
      reviewedForId: user.id,
    },
    include: {
      reviewedBy: {
        select: {
          id: true,
          username: true,
          avatarId: true,
        },
      },
    },
  });

  res.status(200).json({ ok: true, reviews });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
