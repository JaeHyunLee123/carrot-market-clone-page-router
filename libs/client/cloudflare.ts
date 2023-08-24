//upload image to cloudflare
export const uploadImage = async (image: File, imageName: string) => {
  const { uploadURL } = await (await fetch("/api/files")).json();

  const form = new FormData();
  form.append("file", image, imageName);

  const {
    result: { id },
  } = await (
    await fetch(uploadURL, {
      method: "POST",
      body: form,
    })
  ).json();

  return id;
};

//set this url to your own cloudflare image delivery url
const cloudflareImageDeliveryUrl =
  "https://imagedelivery.net/RArPUwqfSYUhqYRxr1wxig/";
type imageVariant = "public" | "avatar" | "menu";
export const getCloudflareImageUrl = (
  imageId: string,
  variant: imageVariant = "public"
) => {
  return cloudflareImageDeliveryUrl + imageId + "/" + variant;
};

export const cloudflareCustomerCode = "k9b8drf9qom1xd57";
export const getThumbnailUrl = (streamId: string) => {
  return `https://customer-${cloudflareCustomerCode}.cloudflarestream.com/${streamId}/thumbnails/thumbnail.jpg?time=1s&height=270`;
};
