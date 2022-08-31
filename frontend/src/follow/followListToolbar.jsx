import {
    Box,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography
  } from '@mui/material';
  import { Search as SearchIcon } from '../icons/search';
  
  export const FollowListToolbar = ({type, searchKey, setSearch}) => {
    
    return (
      <Box>
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
            {type}
          </Typography>
          {/* <Box sx={{ m: 1 }}>
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
            >
              Add Customers
            </Button>
          </Box> */}
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  value = {searchKey}
                  onChange = {event=>setSearch(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder={"Search " + type}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
  )
  };
  