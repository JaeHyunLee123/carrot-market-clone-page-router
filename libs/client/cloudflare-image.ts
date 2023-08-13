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

const upsertImage = () => {};

/*
1. 기존의 이미지 cloudfare에서 삭제한다
  1-1. db에서 기존의 이미지 id를 가져온다
  1-2. 그럴려면 어떤 모델의 어떤 튜플의 이미지를 바꾸는지 알아야한다 -> 파라미터로 받기
  1-3. api를 요청해 cloudfare에서 이미지 삭제

2. 새로운 이미지 cloudfare에 업로드

3. db에 있는 이미지 id 업데이트
*/
