import BookCardSmall from "../components/book_card_small";
// import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'book', headerName: 'Book', width: 130 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 90,
    },
    {
        field: 'unit_price',
        headerName: 'Unit Price',
        type: 'number',
        width: 90,
    },
    {
      field: 'total_price',
      headerName: 'Total Price',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      type: 'number',
      width: 160,
      valueGetter: (params) =>
        `${params.row.unit_price * params.row.quantity} `,
    },
  ];

export default function BuyPage(props){
    const Book = {
        bookId: 1,
        image: "https://covers.zlibcdn2.com/covers299/books/11/c1/d2/11c1d24ddd14c46f714572faf7cebe6b.jpg",
        name: "The art ",
        author: "Knuth",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate purus quis metus gravida faucibus. Donec sit amet risus dapibus, scelerisque ligula sed, sodales nibh. Aenean tristique rutrum eros, ac molestie libero tempus at. In hac habitasse platea dictumst. Vivamus diam justo, ultricies nec tortor vel, efficitur tincidunt dui. Donec eget iaculis lorem",
        price: "199",
    };

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
            unit_price: 50,
        }
    ]

    return (
        <BookCardSmall data={rows[0]}/>
        // <DataGrid
        // rows={rows}
        // columns={columns}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        // />
    )
};