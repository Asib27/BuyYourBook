import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardActions, CardHeader, CardMedia, IconButton} from "@mui/material";
import { useState } from 'react';


export default function BookCardMedium(props) {
    let [shadow, setShadow] = useState(1);

    const Book = {
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth"
    };

    return (
        <Card 
        >
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