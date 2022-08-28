import { Stack } from "@mui/material";
import CommentCard from "./comment";

import PropTypes from 'prop-types';

export default function CommentCardHolder({comments}){
    var commentCards = comments.map((comment, idx)=>{
        return <CommentCard comment={comment} key={idx}/>
    });

    return (
        <Stack spacing={2}>
            {commentCards}
        </Stack>
    );
}

CommentCardHolder.propTypes = {
    comments: PropTypes.array.isRequired
}