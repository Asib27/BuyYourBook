import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function BookCardLarge() {
//   const theme = useTheme();
  const BookName = "Introduction to algorithm";
  const BookAuthor = "Knuth";
  const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem"

  return (
    <Card sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg"
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
