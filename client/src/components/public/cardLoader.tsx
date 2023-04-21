import ContentLoader from "react-content-loader";
import { Box } from "@mui/material";

export default function CardLoader() {
  return (
    <>
      <Box
        style={{
          width: "100%",
          aspectRatio: "28/9",
        }}
      >
        <ContentLoader
          speed={2.5}
          backgroundColor="#d4d4d4"
          foregroundColor="#898989"
          viewBox="0 0 180 70"
        >
          <rect x="0" y="5" rx="0" ry="0" width="1280" height="0.8rem" />
          <rect x="0" y="20" rx="0" ry="0" width="1280" height="5rem" />
        </ContentLoader>
      </Box>
    </>
  );
}
