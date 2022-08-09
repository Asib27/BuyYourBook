import { Box } from "@mui/material";
import { useEffect } from "react";
import { useCart } from "react-use-cart";
import BookCardSmall from "../components/book_card_small";

export default function BuyPage(props){
    const { setItems, items } = useCart();

    const rows = [
        {
            id: 1, 
            book: {
                bookId: 1,
                image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
                name: "The art ",
                author: "Knuth",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem",
                price: "199",
            }, 
            quantity: 2, 
            price: 50,
        },
        {
            id: 2, 
            book: {
                bookId: 2,
                image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
                name: "The art ",
                author: "Knuth",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem",
                price: "199",
            }, 
            quantity: 3, 
            price: 100,
        }
    ];

    useEffect(() => {
      setItems(rows);
    }, [])
    

    return (
        <Box>
            {
                items.map((item)=>{
                    return (<BookCardSmall itemId={item.id}/>);
                })
            }
        </Box>
        // <DataGrid
        // rows={rows}
        // columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        // />
    )
};