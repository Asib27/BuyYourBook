import { Avatar, Box, Card, CardActions, CardHeader, CircularProgress, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ProfileBottomContent from "./profileExtended";
import UserService from "../../services/user.service";
import { useEffect, useState } from "react";

const ProfileOverview = (props) =>{
    // const profile = props.profile;
    const userInfo = UserService.getUserAvatar();
    const [follower, setFollower] = useState(undefined);
    const [followed, setFollowed] = useState();

    useEffect(() => {
        const fetchData = async()=>{
            const data = await UserService.getFollowers();
            setFollower(data.length);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async()=>{
            const data = await UserService.getFollowing();
            setFollowed(data.length);
        }
        fetchData();
    }, [])
    
    
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
            />

            <CardActions sx={{typography:'body1' ,display: 'flex', flexDirection: 'column',  justifyContent: 'center' }}>
                {
                    (follower !== undefined && followed !== undefined)?(
                        <>
                            <IconButton aria-label="Buy" size='small'>
                                {"Followers: " + follower}
                            </IconButton>
                            <IconButton aria-label="Buy" size='small'>
                                {"Follows: " + followed}
                            </IconButton>
                        </>
                    ):(
                        <CircularProgress />
                    )
                }
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