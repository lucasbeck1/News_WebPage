import authors from "../../dataExamples/authors.json";

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

let allAuthors: Author[] = authors;

function getStaticAuthors(): Author[] {
  return allAuthors;
}

function createStaticAuthor(data: authorCreation) {
  const newID: number = Date.now();

  const newAuthor: Author = {
    id: newID.toString(),
    name: data.name,
    mail: data.mail,
    admin: data.admin || false,
    password: data.password,
  };

  const newAuthorsArray = [newAuthor].concat(allAuthors);
  allAuthors = newAuthorsArray;

  return { message: "Create succesfull" };
}

function updateStaticAuthor(data: authorUpdate) {
  if (!data.adminKey) {
    return { message: "Invalid Request" };
  }

  const index = allAuthors.findIndex((author) => author.id === data.id);
  const author = allAuthors.find((author) => author.id === data.id);

  if (!author) {
    return { message: "Not author found" };
  }

  const updateAuthor: Author = {
    id: data.id,
    admin: data.admin || author.admin,
    name: data.name || author.name,
    mail: data.mail || author.mail,
  };

  const authorsCopy = allAuthors.slice();
  authorsCopy[index] = updateAuthor;
  allAuthors = authorsCopy;

  return { message: "Update succesfull" };
}

function deleteStaticAuthor(id: string) {
  const index = allAuthors.findIndex((author) => author.id === id);

  if (index < 0) {
    return { message: "Not author found" };
  }

  const allAuthorsCopy = allAuthors.slice();
  allAuthorsCopy.splice(index, 1);
  allAuthors = allAuthorsCopy;

  return { message: "Delete succesfull" };
}

export {
  getStaticAuthors,
  createStaticAuthor,
  updateStaticAuthor,
  deleteStaticAuthor,
};
