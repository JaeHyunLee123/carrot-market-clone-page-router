import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  //TODO: Deal with data
  const { verification } = req.body;

  const token = await prisma.token.findUnique({
    where: {
      payload: verification,
    },
  });

  if (!token) {
    res.status(404).end();
  }

  console.log(token);

  req.session.user = {
    id: token?.userId,
  };
  await req.session.save();
  res.status(200).end();
};

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "123123489065723904572389457803y7890375639254789031231231",
});
