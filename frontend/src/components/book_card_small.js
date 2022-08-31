import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCart } from "react-use-cart";
import kConst from "../const";
import CartService from "../services/cart.service";

export default function BookCardSmall({item, update}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const [display, setDisplay] = useState(true);

    const updateItemQuantity = async()=>{
        await CartService.updateQuantity(item.isbn, quantity);
        update();
    }

    const removeItem = async()=>{
        await CartService.removeFromCart(item.isbn);
        update();
        setDisplay(false);
    }
    
    return (
        <Card sx={{ display: display?'flex': 'none', alignItems: 'stretch', justifyContent: 'space-between'}}>
            <CardHeader
                avatar={
                    <Avatar src={item.link??kConst.placeholder_image}/>
                }

                title={item.name}
                subheader={item.author_name}
            />
            <CardContent sx={{display: 'flex', alignItems: 'center' , justifyContent: 'space-between', }}>
                <TextField
                    id="quantity"
                    label="Quanity"
                    type="number"
                    size="small"
                    value={quantity}
                    onChange={(event)=> setQuantity(event.target.value)}
                    onBlur={()=> updateItemQuantity()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{pl: 10}}>
                    <Typography variant='body2'> {"Unit price: " + item.price}</Typography>
                    <Typography variant='body2'> {"Total price: " + item.price * quantity}</Typography>
                </Box>
            </CardContent>
            <CardActions>
                <IconButton aria-label="Remove item" size="small" onClick={() => removeItem(item.id)}>
                    Remove
                </IconButton>
            </CardActions>
        </Card>
    )
}