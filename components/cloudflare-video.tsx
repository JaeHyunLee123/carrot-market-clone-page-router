import { cloudflareCustomerCode } from "@libs/client/cloudflare";

interface ICFVideoProp {
  streamID: string;
}

const CFVideo = ({ streamID }: ICFVideoProp) => {
  return (
    <iframe
      src={`https://customer-${cloudflareCustomerCode}.cloudflarestream.com/${streamID}/iframe`}
      className="border-none w-full aspect-video rounded-sm shadow-sm"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowFullScreen={true}
    ></iframe>
  );
};

export default CFVideo;
