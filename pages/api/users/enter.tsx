import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler from "@libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //TODO: Deal with data
  const { phone, email } = req.body;

  const userInfo = phone ? { phone: +phone } : { email };

  const user = await prisma.user.upsert({
    where: {
      ...userInfo,
    },
    create: {
      ...userInfo,
      name: `당근이${Math.ceil(Math.random() * 10000)}`,
    },
    update: {},
  });

  const token = await prisma.token.create({
    data: {
      payload: `${Math.floor(100000 + Math.random() * 900000)}`,
      userId: user.id,
    },
  });

  console.log(token);

  res.status(200).end();
};

export default withHandler("POST", handler);
