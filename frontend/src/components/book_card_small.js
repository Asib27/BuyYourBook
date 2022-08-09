import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Typography } from "@mui/material";
import { useCart } from "react-use-cart";

export default function BookCardSmall(props) {
    const { updateItemQuantity, getItem } = useCart();
    const item = getItem(props.itemId);
    const Book = item.book;
    
    return (
        <Card sx={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between'}}>
            <CardHeader
                avatar={
                    <Avatar src={Book.image}/>
                }

                title={Book.name}
                subheader={Book.author}
            />
            <CardContent sx={{display: 'flex', alignItems: 'center' , justifyContent: 'space-between', }}>
                <TextField
                    id="quantity"
                    label="Quanity"
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(event)=> updateItemQuantity(item.id , event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{pl: 10}}>
                    <Typography variant='body2'> {"Unit price: " + item.price}</Typography>
                    <Typography variant='body2'> {"Total price: " + item.price * item.quantity}</Typography>
                </Box>
            </CardContent>
            <CardActions>
                <IconButton aria-label="Remove item" size="small">
                    Remove
                </IconButton>
            </CardActions>
        </Card>
    )
}