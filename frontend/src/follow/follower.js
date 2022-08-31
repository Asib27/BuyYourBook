// import Head from 'next/head';
import { Box, Container, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import UserService from '../services/user.service';
import { FollowListToolbar } from './followListToolbar';

const FollowersFollowsHelper = ({type}) => {
  const [customers, setCustomers] = useState(undefined);
  const [searchKey, setSearchKey] = useState('');
  const [toShow, setToShow] = useState(undefined);
  
  useEffect(() => {
    const fetchData = async()=>{
        let data = '';
        if(type === 'Follower')
            data = await UserService.getFollowers();
        else
            data = await UserService.getFollowing();
        setCustomers(data);
        setToShow(data);
    }
    fetchData();
  }, [])

  useEffect(()=>{
    if(!customers) return ;
    const data = customers.filter(c=>{
      const name = c.first_name + ' ' + c.middle_name + ' '+ c.last_name;
      return name.toLowerCase().includes(searchKey.toLowerCase());
    });
    setToShow(data);
  }, [searchKey, customers])
  
  return (
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <FollowListToolbar type={type} searchKey={searchKey}  setSearch={setSearchKey}/>
        <Box sx={{ mt: 3 }}>
        {
          toShow? (
            <CustomerListResults customers={toShow} />      
          ):(
            <Skeleton sx={{m : 2}} variant="rectangular" height={400}/>
          )
        }
        </Box>
      </Container>
    </Box>
  </>
  )
};

export default FollowersFollowsHelper;
