import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
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
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
