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

  const post = await prisma.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });

  if (!post) return res.status(404).json({ ok: false });

  const isWondering = Boolean(
    await prisma.wondering.findFirst({
      where: {
        postId: post.id,
        userId: user.id,
      },
      select: { id: true },
    })
  );

  return res.json({ ok: true, post, isWondering });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
