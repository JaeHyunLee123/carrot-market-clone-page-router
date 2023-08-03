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

  const alreadyExists = await prisma.favorite.findFirst({
    where: {
      itemId: +id.toString(),
      userId: user?.id,
    },
  });

  if (alreadyExists) {
    await prisma.favorite.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await prisma.favorite.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        item: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  return res.status(200).json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
