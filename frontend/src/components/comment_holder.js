import { Stack } from "@mui/material";
import commentService from "../services/comment.service";
import CommentCard from "./comment";


export default function CommentCardHolder(props){
    const no_of_comments = commentService.getNoOfComment();

    var commentCards = [];
    for(let i = 0; i < no_of_comments; i++){
        commentCards.push(<CommentCard comment_id={i} key={i}/>);
    }

    return (
        <Stack spacing={2}>
            {commentCards}
        </Stack>
    );
}