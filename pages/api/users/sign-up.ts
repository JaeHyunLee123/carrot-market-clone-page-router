import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import bycript from "bcrypt";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const {
    body: { username, password },
  } = req;

  if (!(username && password)) return res.status(400).json({ ok: false });

  const isExist = Boolean(
    await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    })
  );

  if (isExist)
    return res.status(400).json({ ok: false, error: "usernameExist" });

  const hashedPassword = await bycript.hash(password, 5);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.status(200).json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: true })
);
