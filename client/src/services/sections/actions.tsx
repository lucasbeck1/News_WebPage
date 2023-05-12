import { storeSections } from "../../reducers/sliceSections";
import { AppDispatch } from "../../store";
import {
  getApiSections,
  createApiSection,
  updateApiArticle,
  deleteApiArticle,
} from "./api";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

async function getSections(dispatch: AppDispatch): Promise<{
  payload: Section[];
  type: "sections/storeSections";
}> {
  let getSec: Section[] = await getApiSections();
  return dispatch(storeSections(getSec));
}

async function createSection(data: string): Promise<{ message: string }> {
  let createArt: { message: string } = await createApiSection(data);
  return createArt;
}

async function updateSection(
  id: number,
  data: string
): Promise<{ message: string }> {
  let createArt: { message: string } = await updateApiArticle(id, data);
  return createArt;
}

async function deleteSection(id: number): Promise<{ message: string }> {
  let createArt: { message: string } = await deleteApiArticle(id);
  return createArt;
}

export { getSections, createSection, updateSection, deleteSection };
