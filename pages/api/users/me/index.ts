import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  if (req.method === "GET") {
    const profile = await prisma.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });

    res.status(200).json({ ok: true, profile });
  } else if (req.method === "POST") {
    const {
      session: { user },
      body: { username, avatarId },
    } = req;

    if (!user) return res.status(400).json({ ok: false });

    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { username: true, avatarId: true },
    });

    if (username && username !== currentUser?.username) {
      const isExist = Boolean(
        await prisma.user.findUnique({
          where: { username },
          select: { id: true },
        })
      );

      if (isExist)
        return res
          .status(400)
          .json({ ok: false, error: "이 이름은 이미 사용중입니다" });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          username,
        },
      });
    }
    if (avatarId && avatarId !== currentUser?.avatarId) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatarId: avatarId,
        },
      });
    }
  }

  res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler, isPrivate: true })
);
