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
      body: { email, phone, name },
    } = req;

    if (!user) return res.status(400).json({ ok: false });

    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { email: true, phone: true, name: true },
    });

    if (email && currentUser?.email !== email) {
      const isExist = Boolean(
        await prisma.user.findUnique({
          where: { email },
          select: { id: true },
        })
      );
      if (isExist)
        return res
          .status(400)
          .json({ ok: false, error: "이 이메일은 사용중입니다" });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email,
        },
      });
      return res.json({ ok: true });
    }

    if (phone && currentUser?.phone !== phone) {
      const isExist = Boolean(
        await prisma.user.findUnique({
          where: { phone },
          select: { id: true },
        })
      );
      if (isExist)
        return res
          .status(400)
          .json({ ok: false, error: "이 전화번호는 사용중입니다" });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          phone,
        },
      });
      return res.json({ ok: true });
    }

    if (name && name !== currentUser?.name) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
        },
      });
    }
  }
  res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler, isPrivate: true })
);
