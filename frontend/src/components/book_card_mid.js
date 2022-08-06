import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardActions, CardHeader, CardMedia, IconButton } from "@mui/material";


export default function BookCardMedium(props) {
    const Book = {
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art of computer programming",
        author: "Knuth"
    };

    return (
        <Card sx={{width: '16%'}}>
            <CardMedia
                component="img"
                image={Book.image}
                alt={Book.name}
            />
            <CardHeader 
                title={Book.name}
                subheader={Book.author}
            />
            <CardActions>
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