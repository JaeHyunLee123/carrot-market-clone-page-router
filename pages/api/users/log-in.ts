import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const { username, password } = req.body;

  if (!(username && password)) return res.status(400).json({ ok: false });

  const user = await prisma.user.findUnique({
    where: { username },
    select: { password: true, id: true },
  });

  if (!user) return res.status(400).json({ ok: false, error: "noUser" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect)
    return res.status(400).json({ ok: false, error: "passwordIncorrect" });

  req.session.user = {
    id: user.id,
  };

  await req.session.save();

  return res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
