import { Box} from "@mui/material";
import BookCardMedium from "../components/book_card_mid";
import {Carousel} from "@mantine/carousel";
import CommentCard from "../components/comment";
import bookService from "../services/book.service";

export default function HomePage(props) {
    const bookId = bookService.getBookIds();

    return (
        <Box >
            <Carousel align='start' slideSize="70%" height={200} slideGap="sm" controlsOffset="xs" controlSize={29} loop>
                {
                    bookId.map((id)=>{
                        return (<BookCardMedium key={id} book={bookService.getBookById(id)}/>);
                    })
                }
            </Carousel>
            <CommentCard key={1} comment_id={1}/>
            <CommentCard key={2} comment_id={2}/>
            <CommentCard key={3} comment_id={3}/>
            <CommentCard key={4} comment_id={0}/>
        </Box>
    );
}