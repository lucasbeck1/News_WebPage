import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
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
        container
        direction="column"
        alignItems="center"
        /* spacing={0} */
        /* justifyContent="center" */
        /* style={{ minHeight: "100vh" }} */
      >
        <Card
          sx={{
            maxWidth: 900,
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/detail/${id}`}
          >
            <CardActionArea>
              <CardHeader title={headline} subheader={createdAt}></CardHeader>
              <CardMedia
                component="img"
                height="300"
                image={image}
                alt="article loading"
              />
              <CardContent>
                {/*   
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography> 
                */}
                <Typography variant="body2" color="text.secondary">
                  {drophead}
                </Typography>
              </CardContent>
            </CardActionArea>
          </NavLink>
        </Card>
      </Grid>

      {/* <br></br>
      <br></br>

      <Grid container direction="column" alignItems="center">
        <Card sx={{ maxWidth: 825 }}>
          <CardActionArea>
            <CardHeader
              title="Article Title"
              subheader="September 14, 2016"
            ></CardHeader>
            <Paper
              sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                mb: 4,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_960_720.jpg)`,
              }}
            > */}
      {/* Increase the priority of the hero background image */}
      {/* {
                <img
                  style={{ display: "none" }}
                  src={
                    "https://cdn.pixabay.com/photo/2019/07/23/13/51/shepherd-dog-4357790_960_720.jpg"
                  }
                  alt={"Image Text"}
                />
              }
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,.3)",
                }}
              />
              <Grid container>
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      height: 300,
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                    }}
                  >
                    <Typography variant="h5" color="inherit" paragraph>
                      {
                        "Article Description: This space is for the article subhead, put some text here please"
                      }
                    </Typography>
                    <Link variant="subtitle1" href="#">
                      {"Continue reading…"}
                    </Link>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </CardActionArea>
        </Card>
      </Grid>
      <br></br>
      <br></br> */}
    </>
  );
}
