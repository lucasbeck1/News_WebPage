import { storeSections } from "../../reducers/sliceSections";
import { AppDispatch } from "../../store";
import {
  getApiSections,
  createApiSection,
  updateApiArticle,
  deleteApiArticle,
} from "./api";
import {
  getStaticSections,
  createStaticSection,
  updateStaticSection,
  deleteStaticSection,
} from "./static";

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

  if (!getSec.length) {
    getSec = getStaticSections();
  }

  return dispatch(storeSections(getSec));
}

async function createSection(data: string): Promise<{ message: string }> {
  let createArt: { message: string } = await createApiSection(data);

  if (createArt.message === "REQUEST ERROR") {
    createArt = createStaticSection(data);
  }

  return createArt;
}

async function updateSection(
  id: number,
  data: string
): Promise<{ message: string }> {
  let createArt: { message: string } = await updateApiArticle(id, data);

  if (createArt.message === "REQUEST ERROR") {
    createArt = updateStaticSection(id, data);
  }

  return createArt;
}

async function deleteSection(id: number): Promise<{ message: string }> {
  let createArt: { message: string } = await deleteApiArticle(id);

  if (createArt.message === "REQUEST ERROR") {
    createArt = deleteStaticSection(id);
  }

  return createArt;
}

export { getSections, createSection, updateSection, deleteSection };
