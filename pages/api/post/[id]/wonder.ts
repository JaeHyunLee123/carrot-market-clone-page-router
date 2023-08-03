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

  const alreadyExist = await prisma.wondering.findFirst({
    where: {
      userId: user.id,
      postId: +id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (alreadyExist) {
    await prisma.wondering.delete({
      where: {
        id: alreadyExist.id,
      },
    });
  } else {
    await prisma.wondering.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  return res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
