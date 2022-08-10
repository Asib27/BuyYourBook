import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import bookService from '../services/book.service';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { red } from '@mui/material/colors';
import { useCart } from 'react-use-cart';

export default function BookCardLarge(props) {
//   const theme = useTheme();
    const {addItem} = useCart();

  const bookId = props.bookId;
  const Book = bookService.getBookById(bookId);

  const BookName = Book.name;
  const BookAuthor = Book.author;
  const description = Book.description;

  const onClickingBuy = ()=>{
    const item  = {
        id: Book.bookId, 
        book: {
            bookId: 1,
            image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
            name: "The art ",
            author: "Knuth",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem",
            price: "199",
        }, 
        quantity: 1, 
        price: Book.price,
    }

    addItem(item, 1);
  }

  return (
    <Card sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={Book.image}
            alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {BookName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {BookAuthor}
                </Typography >
                <Typography variant='body1' align='left'>
                    {description}
                </Typography>
                <Typography variant='h6' align='left' sx={{mt: 2}}>
                    {Book.price + "Tk"}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="Buy" onClick={onClickingBuy}>
                    <AddShoppingCartIcon/>
                </IconButton>
                <IconButton aria-label="Share">
                    <ShareIcon/>
                </IconButton>
                <IconButton aria-label="Review">
                    <InsertCommentOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    </Card>
  );
}
