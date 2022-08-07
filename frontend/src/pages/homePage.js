import { Box, Tab, Tabs } from "@mui/material";
import BookCardMedium from "../components/book_card_mid";
import Carousel from "nuka-carousel/lib/carousel";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HomePage(props) {
    const Book = {
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    };

    return (
        <Box >
            <Carousel wrapAround={true}
            slidesToShow={7} cellSpacing={20}>
                <BookCardMedium book={Book}/>
                <BookCardMedium book={Book}/>
                <BookCardMedium book={Book}/>
                <BookCardMedium book={Book}/>
                <BookCardMedium book={Book}/>
            </Carousel>
        </Box>
    );
}