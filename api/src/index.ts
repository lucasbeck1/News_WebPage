// eslint-disable-line no-console
import server from "./app";

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`%s listening at ${PORT}`);
});
