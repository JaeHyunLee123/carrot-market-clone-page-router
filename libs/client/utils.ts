//set this url to your own cloudflare image delivery url
const cloudflareImageDeliveryUrl =
  "https://imagedelivery.net/RArPUwqfSYUhqYRxr1wxig/";

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

type imageVariant = "public" | "avatar" | "menu";
export const getCloudflareImageUrl = (
  imageId: string,
  variant: imageVariant = "public"
) => {
  return cloudflareImageDeliveryUrl + imageId + "/" + variant;
};
