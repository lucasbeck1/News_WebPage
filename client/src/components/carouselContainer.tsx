import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

type examplesProp = {
  name: string;
  description: string;
  image: string;
};

function Item(props: examplesProp) {
  return (
    <Paper sx={{ p: 1, m: 0 }}>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <img
        alt="carrousel"
        src={props.image}
        width={"100%"}
        style={{
          objectFit: "contain",
          maxHeight: "20rem",
          backgroundColor: "#dfdfdf",
          borderRadius: 5,
        }}
      ></img>
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default function CarouselContainer() {
  type examples = {
    name: string;
    description: string;
    image: string;
  };

  var items: examples[] = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      image:
        "https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548_960_720.jpg",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      image:
        "https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978_960_720.jpg",
    },
    {
      name: "Random Name #3",
      description: "Hi do you like it ?!",
      image:
        "https://cdn.pixabay.com/photo/2017/12/27/14/02/friends-3042751_960_720.jpg",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item
          key={i}
          name={item.name}
          description={item.description}
          image={item.image}
        />
      ))}
    </Carousel>
  );
}
