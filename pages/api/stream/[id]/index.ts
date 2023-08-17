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

  const stream = await prisma.stream.findUnique({
    where: { id: +id.toString() },
    select: {
      id: true,
      name: true,
      description: true,
      userId: true,
      cloudflareId: true,
      cloudflareKey: true,
      cloudflareUrl: true,
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatarId: true,
              id: true,
            },
          },
        },
      },
    },
  });

  if (!stream) return res.status(404).json({ ok: false });

  const isOwner = stream.userId === user.id;

  if (!isOwner) {
    stream.cloudflareKey = "xxxxx";
    stream.cloudflareUrl = "xxxxx";
  }

  res.status(200).json({
    ok: true,
    stream,
  });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
