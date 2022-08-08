import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardActionArea, CardActions, CardHeader, CardMedia, IconButton} from "@mui/material";


export default function BookCardMedium(props) {
    const Book = props.book;
    const navigate = useNavigate();

    return (
        <Card >
            <CardActionArea onClick={()=> navigate('/book/' + Book.bookId)}>
                <CardMedia
                    component="img"
                    sx={{height: '100' , width: 'fit'}}
                    image={Book.image}
                    alt={Book.name}
                />
                <CardHeader 
                    title={Book.name}
                    subheader={Book.author}
                />
            </CardActionArea>

            <CardActions sx={{display: "none"}}>
                <IconButton aria-label="add to cart">
                    <AddShoppingCartIcon/>
                </IconButton>
                <IconButton aria-label="review">
                    <CommentIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <IconButton aria-label="more">
                    <MoreVertIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}