import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';

import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {  TextField as FormicTextField }  from 'formik-mui' ;

import * as Yup from 'yup';

export const ProductListToolbar = (props) => {
  const [openedModal, setOpenedModal] = useState(false);
  const handleModalClose = ()=> setOpenedModal(false);

  const BookForm = ()=>{
    return (
      <Formik
            initialValues={{isbn: '', name: '', edition: '', language: '',
                            genre: '', quantity_available: '', author: '', publications: ''
                          }}
            validationSchema={Yup.object({
              
            })}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
            }}
          >
            <Form>
              <Field 
                component={FormicTextField}
                margin="normal"
                required
                fullWidth
                id="isbn"
                label="ISBN"
                name="isbn"
                autoFocus  
              />
              <ErrorMessage name='isbn'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
              />
              <ErrorMessage name='name'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                required
                fullWidth
                id="author"
                label="Author"
                name="author"
              />
              <ErrorMessage name='author'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                required
                fullWidth
                id="publications"
                label="Publications"
                name="publications"
              />
              <ErrorMessage name='publications'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                fullWidth
                id="edition"
                label="Edition"
                name="edition"
              />
              <ErrorMessage name='edition'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                fullWidth
                required
                id="language"
                label="language"
                name="language"
              />
              <ErrorMessage name='language'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                fullWidth
                required
                id="language"
                label="language"
                name="language"
              />
              <ErrorMessage name='language'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                fullWidth
                required
                id="genre"
                label="Genre"
                name="genre"
              />
              <ErrorMessage name='genre'/>

              <Field 
                component={FormicTextField}
                margin="normal"
                fullWidth
                required
                id="quantity_available"
                label="Quantity Available"
                name="quantity_available"
              />
              <ErrorMessage name='quantity_available'/>
      
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>

            </Form>
          </Formik>
    );
  }

  const ProductAddDialog = (props) =>{
    return (
      <Dialog 
        open={props.openedModal} 
        onClose={props.handleModalClose}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>Add product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add product info here
                    </DialogContentText>
                    
                    <BookForm/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleModalClose} fullWidth>Cancel</Button>
                </DialogActions>
      </Dialog>
    )
  }


  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Products
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
            >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={(event) => {setOpenedModal(true);}}
          >
            Add products
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <ProductAddDialog openedModal={openedModal} handleModalClose={handleModalClose}/>
    </Box>
  )
};
