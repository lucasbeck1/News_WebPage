import { uploadApiImage } from "./api";

async function uploadImage(
  formData: FormData
): Promise<{ message: string; fileName: string }> {
  let resMessage: { message: string; fileName: string } = await uploadApiImage(
    formData
  );

  return resMessage;
}

export { uploadImage };
