import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Paper, Rating, Stack } from '@mui/material';

const VOTE_TYPE = {
  UP: 1,
  DOWN: -1,
  NONE: 0
};
Object.freeze(VOTE_TYPE);

const theme = createTheme({
    components: {
        MuiCardHeader: {
          styleOverrides: {
            title: {
              fontSize: '1rem',
              textAlign: 'left'
            },
            subheader: {
              fontSize: '1rem',
              textAlign: 'left'
            },
          },
        },

        MuiCardContent: {
          styleOverrides: {
            root: {
              textAlign: 'left'
            }
          }
        }
      },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const CardheadSubheader = (props) =>{
  return (
    <Stack direction='row' spacing={2}>
      <Typography variant="button" display="block">{props.date}</Typography>
      <Rating name="user-rating" defaultValue={(props.rating)} precision={0.5} readOnly />
    </Stack>
  );
}

export default function CommentCard(props) {
  
  const rating = 3; // API
  const commentDate = "September 14, 2016"; // API
  const commentAuthor = "Lores Ipsum"
  const [expanded, setExpanded] = React.useState(false);
  const [totalVote, setTotalVote] = React.useState(152); // API
  //saves 1 for upvote, 0 for no vote, -1 for downvote
  const [voteStatus, setVoteStatus] = React.useState(0); // API

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const votePressed = (voteType) =>{
    if(voteType === VOTE_TYPE.UP){
      if(voteStatus === VOTE_TYPE.UP){
        setTotalVote(totalVote - 1);
        setVoteStatus(VOTE_TYPE.NONE);
      }
      else if(voteStatus === VOTE_TYPE.DOWN){
        setTotalVote(totalVote + 2);
        setVoteStatus(VOTE_TYPE.UP);
      }
      else if(voteStatus === VOTE_TYPE.NONE){
        setTotalVote(totalVote + 1);
        setVoteStatus(VOTE_TYPE.UP);
      }
    }
    
    if(voteType === VOTE_TYPE.DOWN){
      if(voteStatus === VOTE_TYPE.UP){
        setTotalVote(totalVote - 2);
        setVoteStatus(VOTE_TYPE.DOWN);
      }
      else if(voteStatus === VOTE_TYPE.DOWN){
        setTotalVote(totalVote + 1);
        setVoteStatus(VOTE_TYPE.NONE);
      }
      else if(voteStatus === VOTE_TYPE.NONE){
        setTotalVote(totalVote - 1);
        setVoteStatus(VOTE_TYPE.DOWN);
      }
    }
  }

  if(props && props.flag && props.flag === false) return (<div></div>);
  return (
    <ThemeProvider theme={theme}>
        <Card sx={{ maxWidth: 1000 }}>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {commentAuthor.charAt(0)}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={commentAuthor}
            subheader={<CardheadSubheader 
                date={commentDate}
                rating={rating}
              />}
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton 
              aria-label="up vote" 
              onClick={(e) => votePressed(VOTE_TYPE.UP)}
            >
              {voteStatus === VOTE_TYPE.UP ? 
                <ThumbUpIcon/> :
                <ThumbUpOffAltIcon/>
              }
            </IconButton>

            <Typography variant="button" display="block">
              {totalVote}
            </Typography>

            <IconButton 
              aria-label="down vote" 
              onClick={(e) => votePressed(VOTE_TYPE.DOWN)}
            >
              {voteStatus === VOTE_TYPE.DOWN ? 
                <ThumbDownIcon/> :
                <ThumbDownOffAltIcon/>
              }
            </IconButton>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
            <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CommentCard flag={true}/>
        </Collapse>
        </Card>
    </ThemeProvider>
  );
}
