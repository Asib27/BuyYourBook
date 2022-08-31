import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Avatar, FormControlLabel, IconButton, Skeleton, Stack, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import UserService from '../../services/user.service';


const PlatformSetting = ()=>{
  return (
    <Card>
      <CardHeader
        action={
        <IconButton aria-label="settings">
            <EditIcon/>
        </IconButton>
        }
        title={<Typography variant='h5' align='left'>Platform Settings</Typography>}
      />

      <CardContent>
        <Stack spacing='3' >
          <Box display='flex' flexDirection='column' sx={{}}>
            <Typography variant='h6' sx={{ }} align='left'>Account</Typography>
            <FormControlLabel control={<Switch defaultChecked />} 
              label={<Typography variant='body1' sx={{ }} align='left'>Email me when someone follows me</Typography>} />
            <FormControlLabel control={<Switch defaultChecked />} 
              label={<Typography variant='body1' sx={{ }} align='left'>Email me when someone answers on my post</Typography>} />
            <FormControlLabel control={<Switch defaultChecked />} 
              label={<Typography variant='body1' sx={{ }} align='left'>Email me when someone mentions me</Typography>} />
          </Box>

          <Box display='flex' flexDirection='column' sx={{pt: 2}}>
            <Typography variant='h6' align='left'>Application</Typography>
            <FormControlLabel control={<Switch defaultChecked />} 
              label={<Typography variant='body1' sx={{ }} align='left'>Subscribe to newsletter</Typography>} />
            <FormControlLabel control={<Switch defaultChecked />} 
              label={<Typography variant='body1' sx={{ }} align='left'>Get name of top books monthly</Typography>} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

const ProfileInfo = (props)=>{
  const profile = props.profile;
  return (
    <Card>
      <CardHeader
        action={
        <IconButton aria-label="settings" onClick={() => props.tabchange(1)}>
            <EditIcon/>
        </IconButton>
        }
        title={<
          Typography variant='h5' 
          sx={{ }} 
          align='left'>
            Profile Information
        </Typography>}
      />
      <CardContent>
        <Typography align='left' variant='body1' sx={{mb : 2}}>{profile.description}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Box sx={{fontWeight: 'bold'}}>
            Fullname: 
          </Box>
          <Typography variant='body1'> {" " + profile.fullname}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Box sx={{fontWeight: 'bold'}}>
            Mobile: 
          </Box>
          <Typography variant='body1'> {" " + profile.mobile}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Box sx={{fontWeight: 'bold'}}>
            Email: 
          </Box>
          <Typography variant='body1'> {" " + profile.email}</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Box sx={{fontWeight: 'bold'}}>
            Location: 
          </Box>
          <Typography variant='body1'> {"  " + profile.address}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

const SmallChatPreview = (props)=>{
  const message = props.message;
  return (
    <Card sx={{display: 'flex', justifyContent: 'space-between' , p : 0, m: 0}}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="author"
              variant='rounded'
          >
              {message.sender.charAt(0)}
          </Avatar>
          }
        title={<Typography align='left'>{message.sender}</Typography>}
        subheader={message.msg}
      />
      <CardActions>
        <IconButton aria-label="Reply" size='small'>
          Reply
        </IconButton>
      </CardActions>
    </Card>
  )
}

const Conversations = (props)=>{
  const messages = [
    {
      sender : 'sender1',
      msg: 'hi how are you'
    },
    {
      sender : 'sender2',
      msg: 'hey man, whats up'
    }
  ]

  return (
    <Card>
      <CardHeader title="Conversation"/>
      <CardContent>
        <SmallChatPreview message={messages[0]}/>
        <SmallChatPreview message={messages[1]}/>
      </CardContent>
    </Card>
  )
}

function ProfileBottomContent(props) {
  const [profile, setProfile] = React.useState(undefined);
  React.useEffect(() => {
    const fetchData = async()=>{
      const data = await UserService.getCurrentUserFullInfo();
      setProfile({
        description: data.description,
        fullname: (!data.first_name && data.middle_name && data.last_name) ? 'N/A' 
        : (data.first_name??'') + ' ' + (data.middle_name??'') + ' '+ (data.last_name??''),
        email: data.email,
        mobile: data.phone_no??"",
        address: `${data.location.street}, ${data.location.district}, ${data.location.country}`
      })
    }
    fetchData();
  }, [])

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems='centre'>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            <PlatformSetting/>
          </Grid>     

          <Grid
            item
            xs={12}
            sm={12}
            md={8}
          >
            {
              profile?(
                <ProfileInfo profile={profile} tabchange={props.tabchange}/>
              ):(
                <Skeleton sx={{m : 2}} variant="rectangular" height={400}/>
              )
            }
            
          </Grid>

          {/* <Grid
            item
            xs={12}
            sm={12}
            md={4}
          >
            <Conversations/>
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default ProfileBottomContent;