import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';

import ProfileOverviewTab from '../components/profile/profileOverviewTab';
import EditProfile from '../components/profile/editProfile';
import Dashboard from './index';
import Customers from './customers';
import Products from './products';
import Account from './account';
import Settings from './settings';
import NotFound from './404';
import FollowerFollowPage from './follower';

// role_user = overview, edit profile, payments, complain and support, follower
// role admin = overview, edit profile, payments, follower, complain and support, Dashboard, customers, products
// role author = overview, edit profile, payments, complain and support, follower, myBooks, analytics
// role delivery = overview, edit profile, payments, complain and support, follower, deliveries, analytics

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 , width: '80%'}}>
            <Typography component='span'>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}
  

export default function UserProfilePage(){
    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
    return(
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
            <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTabChange}
            aria-label="Profile tab view"
            sx={{ borderRight: 1, borderColor: 'divider', width: '20%' }}
            >
              <Tab label="Overview" {...a11yProps(0)} />
              <Tab label="Edit profile" {...a11yProps(1)} />
              <Tab label="Follow" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
              <Tab label="Item Five" {...a11yProps(4)} />
              <Tab label="Item Six" {...a11yProps(5)} />
              <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <Container sx={{width: '80%'}}>
              <TabPanel value={tabValue} index={0}>
                <ProfileOverviewTab tabchange={setTabValue}/>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <EditProfile/>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <FollowerFollowPage/>
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                Complains and Support
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <Customers/>
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <Products/>
              </TabPanel>
              <TabPanel value={tabValue} index={6}>
                <NotFound/>
              </TabPanel>
            </Container>
            
      </Box>
    );
}

