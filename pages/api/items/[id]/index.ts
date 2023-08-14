import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const {
    query: { id },
    session: { user },
  } = req;

  if (!(id && user)) return res.status(400).json({ ok: false });

  const item = await prisma.item.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatarId: true,
        },
      },
    },
  });

  if (!item) return res.status(404).json({ ok: false });

  const terms = item.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedItems = await prisma.item.findMany({
    where: {
      OR: terms,
      AND: {
        NOT: { id: item.id },
      },
    },
    take: 4,
  });

  const isFavorite = !!(await prisma.favorite.findFirst({
    where: {
      userId: user.id,
      itemId: +id.toString(),
    },
    select: {
      id: true,
    },
  }));

  return res.json({ ok: true, item, relatedItems, isFavorite });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
