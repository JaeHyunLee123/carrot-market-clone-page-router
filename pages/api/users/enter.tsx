import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/clients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import twilio from "twilio";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  //TODO: Deal with data
  const { phone, email } = req.body;

  const userInfo = phone ? { phone } : email ? { email } : null;

  if (!userInfo) return res.status(400).json({ ok: false });

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

  // if (phone) {
  //   await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.PHONE_NUMBER!,
  //     body: `로그인 코드는 '${token.payload}'입니다`,
  //   });
  // } else {
  //   const email = await mail.send({
  //     from: "jhyon123@gmail.com",
  //     to: "jhyon123@gmail.com",
  //     subject: "캐럿마켓 로그인 코드",
  //     text: `로그인 코드는 '${token.payload}'입니다`,
  //   });
  // }

  return res.json({ ok: true });
};

export default withHandler("POST", handler);
