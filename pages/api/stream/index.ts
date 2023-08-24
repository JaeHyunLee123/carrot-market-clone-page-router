import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/prismaClients";
import withHandler, { IResposeType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

interface ICloudflareResponse {
  result: {
    uid: string;
    rtmps: {
      url: string;
      streamKey: string;
    };
  };
  [key: string]: any;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResposeType>
) => {
  if (req.method === "POST") {
    const {
      body: { name, description },
      session: { user },
    } = req;

    const {
      result: {
        uid,
        rtmps: { url, streamKey },
      },
    }: ICloudflareResponse = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}`,
        }
      )
    ).json();

    if (!(name && description && user))
      return res.status(400).json({ ok: false });

    const stream = await prisma.stream.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        description,
        name,
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
      },
      select: { id: true },
    });

    res.status(200).json({ ok: true, stream });
  } else if (req.method === "GET") {
    const {
      query: { page, pagesize },
    } = req;

    const size = pagesize ? +pagesize.toString() : 10;

    const streams = await prisma.stream.findMany({
      select: { name: true, id: true, cloudflareId: true },
      orderBy: { createdAt: "desc" },
      take: size,
      skip: Number(page) * size,
    });

    res.status(200).json({ ok: true, streams });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler, isPrivate: true })
);
