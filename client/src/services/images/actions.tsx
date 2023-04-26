import { uploadApiImage } from "./api";

async function uploadImage(formData: FormData): Promise<{ message: string }> {
  let resMessage: { message: string } = await uploadApiImage(formData);

  return resMessage;
}

export { uploadImage };
