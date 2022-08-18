import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import bookService from '../services/book.service';

import { Modal } from '@mantine/core';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { AlertTitle, Button, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useCart } from 'react-use-cart';
import { EditorState } from 'draft-js';

import { NativeSelect } from '@mantine/core';

import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { TwitterPicker } from 'react-color';

import { convertFromRaw } from 'draft-js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


class ColorPic extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color);
  }

  renderModal = () => {
    const { color } = this.props.currentState;
    return (
      <div
        onClick={this.stopPropagation}
      >
        <TwitterPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-color-picker"
      >
        <div
          onClick={onExpandEvent}
        >
          <ColorLensIcon/>
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default function BookCardLarge(props) {
//   const theme = useTheme();
    const {addItem} = useCart();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openedModal, setOpenedModal] = React.useState(false);
    const [review, setReview] = React.useState(EditorState.createEmpty());
    const handleSnackbarClose = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
      
        setOpenSnackbar(false);
    }

    

    const editorToolbarProps = {
        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
        inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
            bold: { className: undefined },
            italic: { className: undefined },
            underline: {  className: undefined },
            strikethrough: {  className: undefined },
            monospace: { className: undefined },
            superscript: {  className: undefined },
            subscript: {  className: undefined },
        },
        blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
        },
        fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
        },
        fontFamily: {
            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
        },
        list: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['unordered', 'ordered', 'indent', 'outdent'],
            unordered: {  className: undefined },
            ordered: {  className: undefined },
            indent: { className: undefined },
            outdent: {  className: undefined },
        },
        textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['left', 'center', 'right', 'justify'],
            left: {  className: undefined },
            center: {  className: undefined },
            right: {  className: undefined },
            justify: { className: undefined },
        },
        colorPicker: {
            component: ColorPic,
        },
        link: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_self',
            options: ['link', 'unlink'],
            link: {  className: undefined },
            unlink: {  className: undefined },
            linkCallback: undefined
        },
        emoji: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            emojis: [
            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
            '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
            '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
            '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
            '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
            '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
            '✅', '❎', '💯',
            ],
        },
        embedded: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            embedCallback: undefined,
            defaultSize: {
            height: 'auto',
            width: 'auto',
            },
        },
        image: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: undefined,
            previewImage: false,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
            height: 'auto',
            width: 'auto',
            },
        },
        remove: {  className: undefined, component: undefined },
        history: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ['undo', 'redo'],
            undo: {  className: undefined },
            redo: {  className: undefined },
        },
    }

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
        setOpenSnackbar(true);
    }

    const onClickReview = ()=>{
        setOpenedModal(true);
    }

    const onReviewSubmit = ()=>{
        console.log(convertFromRaw(review));
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
                <IconButton aria-label="Review" onClick={() => onClickReview()}>
                    <InsertCommentOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            <AlertTitle>Success</AlertTitle>
                Item added to cart succesfully.
            </Alert>
        </Snackbar>

        <Modal
            opened={openedModal}
            onClose={() => setOpenedModal(false)}
            title="Write your review"
            size='lg'
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            centered
        >
            <Paper  elevation={2}>
                <Editor
                    editorState={review}
                    onEditorStateChange={setReview}
                    toolbar={editorToolbarProps}
                />
            </Paper>            
            <Button fullWidth sx={{mt: 2}} onClick={onReviewSubmit}>
                Submit
            </Button>
        </Modal>
    </Card>
  );
}
