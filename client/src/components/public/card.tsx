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
    body: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    author: { name: string };
    section: { name: string };
  };
}

export default function CardArticle(props: ArticleData) {
  const { id, headline, drophead, image } = props.article;

  return (
    <>
      <Grid alignItems="center" item xs={12}>
        <NavLink
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/detail/${id}`}
        >
          <CardActionArea>
            <CardHeader title={headline} subheader={drophead} />
            <CardMedia
              component="img"
              image={image}
              alt="article loading"
              style={{
                borderRadius: 5,
                objectPosition: "center",
                objectFit: "cover",
                width: "100%",
                aspectRatio: "28/9",
              }}
            />
          </CardActionArea>
        </NavLink>
      </Grid>
    </>
  );
}
