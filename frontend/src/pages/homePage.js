import { Box, Skeleton} from "@mui/material";
import BookCardMedium from "../components/book_card_mid";
import {Carousel} from "@mantine/carousel";
import CommentCard from "../components/comment";
import bookService from "../services/book.service";
import { useEffect, useState } from "react";

export default function HomePage(props) {
    const [loaded, setLoaded] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const bookId = await bookService.getBookIds();
            setBooks(bookId);
            setLoaded(true);
        }
        fetchData();
    }, [])

    return (
        <>
        {
            loaded?(
                <Box >
                    <Carousel align='start' slideSize="70%" height={200} slideGap="sm" controlsOffset="xs" controlSize={29} loop>
                        {
                            books.map((book, idx)=>{
                                return (<BookCardMedium key={idx}  book={book}/>);
                            })
                        }
                    </Carousel>
                    <CommentCard key={1} comment_id={1}/>
                    <CommentCard key={2} comment_id={2}/>
                    <CommentCard key={3} comment_id={3}/>
                    <CommentCard key={4} comment_id={0}/>
                </Box>
            ) : (
                <Skeleton variant="rectangular" animation="wave" height={100}/>
                
            )
        }
        </>
    );
}