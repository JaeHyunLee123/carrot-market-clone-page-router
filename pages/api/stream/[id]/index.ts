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
  } = req;

  if (!id) return res.status(400).json({ ok: false });

  const stream = await prisma.stream.findUnique({
    where: { id: +id.toString() },
    include: {
      messages: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!stream) return res.status(404).json({ ok: false });

  res.status(200).json({ ok: true, stream });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
