import { Avatar, Box, Card, CardActions, CardHeader, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ProfileBottomContent from "./profileExtended";
import UserService from "../../services/user.service";

const ProfileOverview = (props) =>{
    const profile = props.profile;
    const userInfo = UserService.getUserAvatar();
    
    return (
    <Card sx={{display: 'flex', justifyContent: 'space-between' , p : 1, m: 1}}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500], height: '80px', width: '80px' }} aria-label="author"
                        variant='rounded' alt={userInfo.username} src={userInfo.image} 
                    />
                }
                
                title={
                    <Typography variant='h5'>
                        {userInfo.username}
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

export default function ProfileOverviewTab(props){
    const profile= {
        name: 'Lores Ipsum',
        tag: 'Novice',
        follower: '20k',
        follows: '10k'
    }

    return (
        <Box>
            <ProfileOverview profile={profile}/>
            <ProfileBottomContent tabchange={props.tabchange}/>
        </Box>
    )
}