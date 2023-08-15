import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  if (req.method === "POST") {
    const {
      body: { question },
      session: { user },
    } = req;

    if (!(question && user)) return res.status(400).json({ ok: false });

    const post = await prisma.post.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        question,
      },
    });

    return res.json({ ok: true, post });
  } else if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
    });

    return res.json({ ok: true, posts });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: true })
);
