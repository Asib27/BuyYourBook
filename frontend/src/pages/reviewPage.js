import { Box, LinearProgress, Rating, Stack, Typography } from "@mui/material";
import CommentCardHolder from "../components/comment_holder";

const ReviewLeftPan = (props)=>{
    const rating_avg = 4.1;
    const no_of_review = 100;

    return (
        <Stack>
            <Typography>{rating_avg}</Typography>
            <Rating name="user-rating" defaultValue={no_of_review} precision={0.1} readOnly />
            <Typography>{no_of_review}</Typography>
        </Stack>
    );
}

const ReviewRightPan = (props)=>{
    console.log('called');
    return (
        <Stack spacing={2}>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={50} />
                
            </Box>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={60} />
                
            </Box>
        </Stack>
    )
}

export default function ReviewPage(props){
    return (
        <div>
            <Stack spacing={2} direction="row">
                <ReviewLeftPan/>
                <ReviewRightPan/>
            </Stack>
            <CommentCardHolder/>

        </div>
    );
}