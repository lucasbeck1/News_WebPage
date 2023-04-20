import { storeSections } from "../../reducers/sliceSections";
import { AppDispatch } from "../../store";
import { getApiSections } from "./api";
import { getStaticSections } from "./static";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

async function getSections(dispatch: AppDispatch): Promise<{
  payload: Section[];
  type: "section/storeSections";
}> {
  let getSec: Section[] = await getApiSections();

  if (!getSec.length) {
    getSec = getStaticSections();
  }

  return dispatch(storeSections(getSec));
}

export { getSections };
