import { Box, LinearProgress, Paper, Rating, Stack, Typography } from "@mui/material";
import CommentCardHolder from "../components/comment_holder";
import reviewService from "../services/review.service";
import BookCardLarge from "../components/book_card_large";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ReviewLeftPan = (props)=>{
    const rating_avg = reviewService.getRatingAvg();
    const no_of_review = reviewService.getNoOfReview();

    return (
        <Box pt={5}>
            <Stack alignItems='center'>
                <Typography variant='h2'>{rating_avg}</Typography>
                <Rating name="user-rating" defaultValue={rating_avg} precision={0.1} readOnly />
                <Typography>{no_of_review} reviews</Typography>
            </Stack>
        </Box>
    );
}

const RatingViewer = (props)=>{
    const rating = props.rating_percent;
    const rating_text = props.rating_text;

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
    const percents = reviewService.getPercents();
    let elements = percents.map((val, idx)=>{
        return (<RatingViewer key={idx} rating_percent={val} rating_text={idx+1}/>)
    }).reverse();


    return (
        <Box pr={10} pl={10} pb={5} pt={5}>
            <Stack >
                {elements}
            </Stack>
        </Box>
    )
}

export default function ReviewPage(props){
    const params = useParams();
    const bookId = params.isbn;

//     const initialValue =
//   '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';
//     const [review, setReview] = useState(initialValue);

    return (
        <Stack sx={{width: '80%'}} spacing={5}>
            <BookCardLarge bookId={bookId}/>
            <Paper elevation={3} style={{margin: '20', padding: '50'}}>
                <Typography alignSelf='flex-start' variant='h5'>Ratings and Reviews</Typography>
                <Stack direction="row" spacing={2}>
                    <Box sx={{ width: '20%' }}>
                        <ReviewLeftPan/>
                    </Box>
                    <Box sx={{ width: '80%' }}>
                        <ReviewRightPan/>
                    </Box>
                </Stack>
            </Paper>
            
            <CommentCardHolder/>

        </Stack>
    );
}