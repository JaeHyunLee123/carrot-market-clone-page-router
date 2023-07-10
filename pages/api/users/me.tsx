import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const profile = await prisma.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });

  res.status(200).json({ ok: true, profile });
};

export default withApiSession(withHandler("GET", handler));
