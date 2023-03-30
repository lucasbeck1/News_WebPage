import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";

interface ArticleData {
  article: {
    id: number;
    headline: string;
    drophead: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    author: string;
    section: string;
    body: string;
  };
}

export default function CardArticle(props: ArticleData) {
  const { id, headline, drophead, image, createdAt } = props.article;

  return (
    <>
      <Grid
        direction="column"
        alignItems="center"
        item
        xs={12}
        /* spacing={0} */
        /* justifyContent="center" */
        /* style={{ minHeight: "100vh" }} */
      >
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/detail/${id}`}
        >
          <CardActionArea>
            <CardHeader title={headline} subheader={drophead}></CardHeader>
            <CardMedia
              component="img"
              height="300"
              image={image}
              alt="article loading"
              style={{ borderRadius: 5 }}
            />
          </CardActionArea>
        </NavLink>
      </Grid>
    </>
  );
}
