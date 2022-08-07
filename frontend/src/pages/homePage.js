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
    return (
        <Box >
            <Carousel wrapAround={true}
            slidesToShow={7} cellSpacing={20}>
                <BookCardMedium/>
                <BookCardMedium/>
                <BookCardMedium/>
                <BookCardMedium/>
                <BookCardMedium/>
            </Carousel>
        </Box>
    );
}