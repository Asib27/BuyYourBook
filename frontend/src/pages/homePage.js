import { Box, Grid, Skeleton} from "@mui/material";
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
                    {/* <Carousel align='start' slideSize="70%" height={200} slideGap="sm" controlsOffset="xs" controlSize={29} loop>
                        {
                            books.map((book, idx)=>{
                                return (<BookCardMedium key={idx}  book={book}/>);
                            })
                        }
                    </Carousel> */}
                    <Grid container spacing={2} sx={{pt: 2}}>
                        {
                            books.map((book, idx)=>{
                                return (<Grid item lg={4} sm={4} xl={4} xs={12}>
                                            <BookCardMedium key={idx}  book={book}/>
                                        </Grid>
                                        );
                            })
                        }
                    </Grid>
                </Box>
            ) : (
                <Skeleton sx={{m : 2}} variant="rectangular" animation="wave" height={100}/>
                
            )
        }
        </>
    );
}