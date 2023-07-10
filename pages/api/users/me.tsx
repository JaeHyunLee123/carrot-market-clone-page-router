import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}

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

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password: "123123489065723904572389457803y7890375639254789031231231",
});
