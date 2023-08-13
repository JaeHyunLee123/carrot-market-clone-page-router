const cloudflareImageDeliveryUrl =
  "https://imagedelivery.net/RArPUwqfSYUhqYRxr1wxig/";

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

type imageVariant = "public" | "avatar";
export const getCloudflareImageUrl = (
  imageId: string,
  variant: imageVariant = "public"
) => {
  return cloudflareImageDeliveryUrl + imageId + "/" + variant;
};
