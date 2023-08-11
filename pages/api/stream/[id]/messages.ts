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
    body: { message },
  } = req;

  if (!(id && user && message)) return res.status(400).json({ ok: false });

  await prisma.message.create({
    data: {
      message,
      user: {
        connect: {
          id: user.id,
        },
      },
      stream: {
        connect: {
          id: +id.toString(),
        },
      },
    },
  });

  res.status(200).json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
