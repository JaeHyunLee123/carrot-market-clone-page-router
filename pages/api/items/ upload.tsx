import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const item = await prisma.item.create({
    data: {
      name,
      price: +price,
      description,
      imageUrl: "#",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.status(200).json({ ok: true, itemId: item.id });
};

export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: true })
);
