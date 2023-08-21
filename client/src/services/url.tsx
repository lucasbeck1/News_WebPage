const localhost: string =
  import.meta.env.VITE_backend_url || "http://localhost:3001";

export const domain: string = localhost;
