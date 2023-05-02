import { storeAuthors } from "../../reducers/sliceUsers";
import { AppDispatch } from "../../store";
import {
  getApiAuthors,
  createApiAuthor,
  updateApiAuthor,
  deleteApiAuthor,
} from "./api";
import {
  getStaticAuthors,
  createStaticAuthor,
  updateStaticAuthor,
  deleteStaticAuthor,
} from "./static";

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
  adminKey: string;
  admin?: boolean;
};

type authorUpdate = {
  id: string;
  adminKey: string;
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

  if (!getArts.length) {
    getArts = getStaticAuthors();
  }

  return dispatch(storeAuthors(getArts));
}

async function createAuthor(
  data: authorCreation
): Promise<{ message: string }> {
  let createArt: { message: string } = await createApiAuthor(data);

  if (createArt.message === "REQUEST ERROR") {
    createArt = createStaticAuthor(data);
  }

  return createArt;
}

async function updateAuthor(data: authorUpdate): Promise<{ message: string }> {
  let createArt: { message: string } = await updateApiAuthor(data);

  if (createArt.message === "REQUEST ERROR") {
    createArt = updateStaticAuthor(data);
  }

  return createArt;
}

async function deleteAuthor(
  id: string,
  adminKey: string
): Promise<{ message: string }> {
  let createArt: { message: string } = await deleteApiAuthor(id, adminKey);

  if (createArt.message === "REQUEST ERROR") {
    createArt = deleteStaticAuthor(id);
  }

  return createArt;
}

export { getAuthors, createAuthor, updateAuthor, deleteAuthor };
