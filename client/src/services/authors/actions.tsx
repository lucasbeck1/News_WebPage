import { storeAuthors } from "../../reducers/sliceUsers";
import { AppDispatch } from "../../store";
import {
  getApiAuthors,
  createApiAuthor,
  updateApiAuthor,
  deleteApiAuthor,
} from "./api";

type Author = {
  id: string;
  admin: boolean;
  name: string;
  mail: string;
  password?: string;
};

type authorCreation = {
  name: string;
  mail: string;
  password: string;
  admin?: boolean;
};

type authorUpdate = {
  id: string;
  admin?: boolean;
  name?: string;
  mail?: string;
  oldPassword?: string;
  newPassword?: string;
};

async function getAuthors(dispatch: AppDispatch): Promise<{
  payload: Author[];
  type: "authors/storeAuthors";
}> {
  let getArts: Author[] = await getApiAuthors();
  return dispatch(storeAuthors(getArts));
}

async function createAuthor(
  data: authorCreation
): Promise<{ message: string }> {
  let createArt: { message: string } = await createApiAuthor(data);
  return createArt;
}

async function updateAuthor(data: authorUpdate): Promise<{ message: string }> {
  let createArt: { message: string } = await updateApiAuthor(data);
  return createArt;
}

async function deleteAuthor(id: string): Promise<{ message: string }> {
  let createArt: { message: string } = await deleteApiAuthor(id);
  return createArt;
}

export { getAuthors, createAuthor, updateAuthor, deleteAuthor };
