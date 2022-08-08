import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import bookService from '../services/book.service';

export default function BookCardLarge(props) {
//   const theme = useTheme();
  const bookId = props.bookId;
  const Book = bookService.getBookById(bookId);

  const BookName = Book.name;
  const BookAuthor = Book.author;
  const description = Book.description;

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
                <Typography variant='body1'>
                    {description}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="Buy">
                    Buy
                </IconButton>
                <IconButton aria-label="play/pause">
                    Share
                </IconButton>
                <IconButton aria-label="next">
                    Review
                </IconButton>
            </Box>
        </Box>
    </Card>
  );
}
