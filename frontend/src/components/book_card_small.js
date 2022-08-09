import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function BookCardSmall(props) {
    const Book = props.data.book;
    const data = props.data;

    const [quantity, setQuantity] = useState(data.quantity);
    

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
                    value={quantity}
                    onChange={(event)=> setQuantity(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{pl: 10}}>
                    <Typography variant='body2'> {"Unit price: " + data.unit_price}</Typography>
                    <Typography variant='body2'> {"Total price: " + data.unit_price * data.quantity}</Typography>
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