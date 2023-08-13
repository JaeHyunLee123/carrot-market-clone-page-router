import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

interface ICloudflareResponse {
  result: {
    id: string;
    uploadURL: string;
  };
  success: boolean;
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  const response: ICloudflareResponse = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
        },
      }
    )
  ).json();

  console.log(response);

  res.status(200).json({ ok: true, ...response.result });
};

export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: true })
);
