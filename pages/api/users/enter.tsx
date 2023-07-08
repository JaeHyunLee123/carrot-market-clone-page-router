import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler from "@libs/server/withHandler";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //TODO: Deal with data
  const { phone, email } = req.body;

  const payload = phone ? { phone: +phone } : { email };

  const user = await prisma.user.upsert({
    where: {
      ...payload,
    },
    create: {
      ...payload,
      name: `당근이${Math.ceil(Math.random() * 10000)}`,
    },
    update: {},
  });

  console.log(user);

  res.status(200).end();
};

export default withHandler("POST", handler);
