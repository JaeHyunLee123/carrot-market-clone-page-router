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

    return res.status(200).json({ ok: true, itemId: item.id });
  } else if (req.method === "GET") {
    const items = await prisma.item.findMany({
      include: {
        _count: {
          select: {
            favorites: true,
          },
        },
      },
    });
    return res.status(200).json({ ok: true, items });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: true })
);
