import { Avatar, Box, Card, CardActions, CardContent, CardHeader, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import * as React from 'react';
import ProfileBottomContent from '../components/profileExtended';

const ProfileOverview = (props) =>{
    const profile = props.profile;
    return (
    <Card sx={{display: 'flex', justifyContent: 'space-between' , p : 1, m: 1}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500], height: '80px', width: '80px' }} aria-label="author"
                    variant='rounded'
                >
                    {profile.name.charAt(0)}
                </Avatar>
                }
                
                title={
                    <Typography variant='h5'>
                        {profile.name}
                    </Typography>
                }
                subheader={
                    <Typography variant='body1' align='left'>
                        {profile.tag}
                    </Typography>
                }
            />

            <CardActions sx={{typography:'body1' ,display: 'flex', flexDirection: 'column',  justifyContent: 'center' }}>
                <IconButton aria-label="Buy" size='small'>
                    {"Followers: " + profile.follower}
                </IconButton>
                <IconButton aria-label="Buy" size='small'>
                    {"Follows: " + profile.follows}
                </IconButton>
            </CardActions>
        </Card>
    )
}

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
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
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
    const profile= {
        name: 'Lores Ipsum',
        tag: 'Novice',
        follower: '20k',
        follows: '10k'
    }

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
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <ProfileOverview profile={profile}/>
                <ProfileBottomContent/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
            Item Two
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
            Item Three
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
            Item Four
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
            Item Five
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
            Item Six
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
            Item Seven
            </TabPanel>
      </Box>
    );
}

