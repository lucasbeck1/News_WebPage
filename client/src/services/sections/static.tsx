import sections from "../../dataExamples/sections.json";

type Section = {
  id: number;
  name: string;
  quantity: number;
};

let allSections: Section[] = sections;

function getStaticSections(): Section[] {
  return allSections;
}

function createStaticSection(name: string) {
  const newID: number = Date.now();
  const newSection: Section = {
    id: newID,
    name: name,
    quantity: 0,
  };

  allSections = [...allSections, newSection];

  return { message: "Create succesfull" };
}

function updateStaticSection(id: number, name: string) {
  const sectionToUpdate = allSections.find((section) => section.id === id);
  if (!sectionToUpdate) {
    return { message: "Not section found" };
  }
  const index = allSections.findIndex((section) => section.id === id);

  const newArticle: Section = {
    id,
    name,
    quantity: sectionToUpdate.quantity,
  };

  const sectionsCopy = allSections.slice();
  sectionsCopy[index] = newArticle;
  allSections = sectionsCopy;

  return { message: "Update succesfull" };
}

function deleteStaticSection(id: number) {
  const sectionToUpdate = allSections.find((section) => section.id === id);
  if (!sectionToUpdate) {
    return { message: "Not section found" };
  }
  const index = allSections.findIndex((section) => section.id === id);

  const sectionsCopy = allSections.slice();
  sectionsCopy.splice(index, 1);
  allSections = sectionsCopy;

  return { message: "Delete succesfull" };
}

export {
  getStaticSections,
  createStaticSection,
  updateStaticSection,
  deleteStaticSection,
};
