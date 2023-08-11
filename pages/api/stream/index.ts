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
      body: { name, description },
      session: { user },
    } = req;

    if (!(name && description && user))
      return res.status(400).json({ ok: false });

    const stream = await prisma.stream.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        description,
        name,
      },
      select: { id: true },
    });

    res.status(200).json({ ok: true, stream });
  } else if (req.method === "GET") {
    const streams = await prisma.stream.findMany({
      select: { name: true, id: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ ok: true, streams });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: true })
);
