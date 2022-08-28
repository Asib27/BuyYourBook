import { Box, LinearProgress, Paper, Rating, Skeleton, Stack, Typography } from "@mui/material";
import CommentCardHolder from "../components/comment_holder";
import reviewService from "../services/review.service";
import BookCardLarge from "../components/book_card_large";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import bookService from "../services/book.service";

const ReviewLeftPan = ({ratingAvg, noReview})=>{
    reviewService.getRatingAvg();
    reviewService.getNoOfReview();

    return (
        <Box pt={5}>
            <Stack alignItems='center'>
                <Typography variant='h2'>{ratingAvg}</Typography>
                <Rating name="user-rating" defaultValue={ratingAvg} precision={0.1} readOnly />
                <Typography>{noReview} reviews</Typography>
            </Stack>
        </Box>
    );
}

const RatingViewer = (props)=>{
    const rating = props.rating_percent;
    const rating_text = props.rating_text;

    console.log(rating, rating_text);

    return (
        <Stack direction='row' alignItems='center' spacing={2}>
            <Typography>{rating_text}</Typography>
            <Box sx={{ width: '100%', color: 'green', padding: '0' }}>
                <LinearProgress color='inherit' variant="determinate" value={rating} />
            </Box>
        </Stack>
    )
}

const ReviewRightPan = (props)=>{
    const percents = props.percentReview;
    const percentMap = {};
    for(let p in percents){
        percentMap[Math.floor(p)] = +percents[p];
    }
    let elements = [];

    for(let i = 1; i <= 5; i++){
        const val = percentMap[i] ?? 0;
        elements.push((<RatingViewer key={i} rating_percent={val} rating_text={i}/>))
    }

    return (
        <Box pr={10} pl={10} pb={5} pt={5}>
            <Stack >
                {elements}
            </Stack>
        </Box>
    )
}

export default function ReviewPage(props){
    const [Book, setBook] = useState(undefined);
    const [ratingAvg, setRatingAvg] = useState(undefined);
    const [noReview, setNoReview] = useState(undefined);
    const [percentReview, setPercentReview] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        const bookId = params.isbn;
        const fetchData = async ()=>{
            let data = await bookService.getBookByIsbn(bookId);
            setBook(data);
        }
        fetchData();
        
    }, [params.isbn]);
    
    useEffect(() => {
        const isbn = params.isbn;
        const fetchData = async ()=>{
            let data = await reviewService.getRatingAvg(isbn);
            setRatingAvg(data);
        }
        fetchData();
        
    }, [params.isbn]);

    useEffect(() => {
        const isbn = params.isbn;
        const fetchData = async ()=>{
            let data = await reviewService.getNoOfReview(isbn);
            setNoReview(data);
        }
        fetchData();
        
    }, [params.isbn]);

    useEffect(() => {
        const isbn = params.isbn;
        const fetchData = async ()=>{
            let data = await reviewService.getPercents(isbn);
            setPercentReview(data);
        }
        fetchData();
        
    }, [params.isbn]);

    return (
        <Stack sx={{width: '80%'}} spacing={5}>
            {
                Book ? (
                    <BookCardLarge book = {Book}/>
                ):(
                    <Skeleton sx={{m : 2}} variant="rectangular" height={200}/>
                )
            }
            <Paper elevation={3} style={{margin: '20', padding: '50'}}>
                <Typography  variant='h5' sx={{pt: 3, pl: 5}}>Ratings and Reviews</Typography>
                <Stack direction="row" spacing={2}>
                    <Box sx={{ width: '20%' }}>
                        {
                            (ratingAvg !== undefined && noReview !== undefined) ? (
                                <ReviewLeftPan 
                                    ratingAvg={ratingAvg}
                                    noReview={noReview}
                                />
                            ):(
                                <Skeleton sx={{m : 2}} variant="rectangular" height={200}/>
                            )
                        }
                    </Box>
                    <Box sx={{ width: '80%' }}>
                        {
                            percentReview? (
                                <ReviewRightPan percentReview={percentReview}/>
                            ):(
                                <Skeleton sx={{m : 2}} variant="rectangular" height={200}/>
                            )
                        }
                        
                    </Box>
                </Stack>
            </Paper>
            
            <CommentCardHolder/>

        </Stack>
    );
}