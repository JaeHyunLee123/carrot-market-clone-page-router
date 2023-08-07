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
    body: { answer },
  } = req;

  if (!(id && user)) return res.status(400).json({ ok: false });

  const post = await prisma.post.findUnique({
    where: {
      id: +id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (!post) return res.status(404).json({ ok: false });

  const newAnswer = await prisma.answer.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      post: {
        connect: {
          id: post.id,
        },
      },
      answer,
    },
  });

  return res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
