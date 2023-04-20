import sections from "../../dataExamples/sections.json";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

function getStaticSections(): Section[] {
  return sections;
}

export { getStaticSections };
