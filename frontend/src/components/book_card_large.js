import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import bookService from '../services/book.service';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { useCart } from 'react-use-cart';
import { Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';

// import PropTypes from 'prop-types';
// import ColorLensIcon from '@mui/icons-material/ColorLens';
// import { TwitterPicker } from 'react-color';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useSnackbarHelper = ()=>{
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleSnackbarClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
        setOpenSnackbar(false);
    }

    const SnackbarHelper = ()=>(
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            <AlertTitle>Success</AlertTitle>
                Item added to cart succesfully.
            </Alert>
        </Snackbar>
    )

    return {
        openSnackbar,
        setOpenSnackbar,
        SnackbarHelper
    }
}

const useModalHelper = ()=>{
    const [openedModal, setOpenedModal] = React.useState(false);
    const handleModalClose = ()=>{
        setOpenedModal(false);
    }

    const CommentModal = ({onSubmit, book})=>{
        const author = book.writersOfTheBook.map(w=>w.name).join(' , ');
        return (
            <Dialog 
                open={openedModal} 
                onClose={handleModalClose}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle>Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {
                            "Write review about \"" + book.name + "\" by \""
                            + author + "\" . You review will be posted publicly. "
                        }
                    </DialogContentText>
                    <Formik
                        initialValues={{review : ''}}
                        validationSchema={
                            Yup.object({
                                review: Yup.string().required('Please enter your review')
                            })
                        }
                        onSubmit={(values, {resetForm})=>{
                            setOpenedModal(false);
                            resetForm();
                            onSubmit(values);
                        }}
                    >
                        <Form>
                            <Field
                                component={TextField}
                                id="review"
                                name="review"
                                placeholder="Type here"
                                fullWidth
                                variant="standard"
                                multiline    
                            />

                            <DialogActions>
                                <Button onClick={handleModalClose}>Cancel</Button>
                                <Button type='submit'>Submit</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>
        )
    }

    return {
        openedModal, setOpenedModal, CommentModal
    }
}

// class ColorPic extends React.Component {
//   static propTypes = {
//     expanded: PropTypes.bool,
//     onExpandEvent: PropTypes.func,
//     onChange: PropTypes.func,
//     currentState: PropTypes.object,
//   };

//   stopPropagation = (event) => {
//     event.stopPropagation();
//   };

//   onChange = (color) => {
//     const { onChange } = this.props;
//     onChange('color', color);
//   }

//   renderModal = () => {
//     const { color } = this.props.currentState;
//     return (
//       <div
//         onClick={this.stopPropagation}
//       >
//         <TwitterPicker color={color} onChangeComplete={this.onChange} />
//       </div>
//     );
//   };

//   render() {
//     const { expanded, onExpandEvent } = this.props;
//     return (
//       <div
//         aria-haspopup="true"
//         aria-expanded={expanded}
//         aria-label="rdw-color-picker"
//       >
//         <div
//           onClick={onExpandEvent}
//         >
//           <ColorLensIcon/>
//         </div>
//         {expanded ? this.renderModal() : undefined}
//       </div>
//     );
//   }
// }

export default function BookCardLarge(props) {
//   const theme = useTheme();
    const {addItem} = useCart();
    
    const {openedModal, setOpenedModal, CommentModal} = useModalHelper();
    const { openSnackbar, setOpenSnackbar, SnackbarHelper} = useSnackbarHelper();

    const onClickingBuy = ()=>{
        const item  = {
            id: Book.isbn, 
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

        item.id = Book.isbn;
        addItem(item, 1);
        setOpenSnackbar(true);
    }

    const onClickReview = ()=>{
        setOpenedModal(true);
    }

    const onReviewSubmit = (values)=>{
        console.log(values);
    }

    const Book = props.book;

    const BookName = Book.name;
    const BookAuthor = Book.writersOfTheBook.map(w=>w.name).join(' , ');;
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
                <IconButton aria-label="Review" onClick={() => onClickReview()}>
                    <InsertCommentOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
        <SnackbarHelper/>

        <CommentModal onSubmit={onReviewSubmit} book={Book}/>
    </Card>
  );
}
