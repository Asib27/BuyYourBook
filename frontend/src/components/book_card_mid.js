import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardActionArea, CardActions, CardHeader, CardMedia, IconButton} from "@mui/material";
import kConst from "../const";


export default function BookCardMedium(props) {
    const Book = props.book;
    const navigate = useNavigate();
    const placeholder_image = kConst.placeholder_image;

    return (
        <Card sx={{p : 1, }}>
            <CardActionArea onClick={()=> navigate('/book/' + Book.isbn)}
            >
                <CardMedia
                    component="img"
                    height="100"
                    image={Book.image? Book.image: placeholder_image}
                    alt={Book.name}
                    title={Book.name}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                />
                <CardHeader 
                    title={Book.name}
                    subheader={Book.writersOfTheBook.map(wr=> wr.name).join(' , ')}
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