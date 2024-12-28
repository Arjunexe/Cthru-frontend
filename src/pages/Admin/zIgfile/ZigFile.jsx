// import React from "react";


// function Message() {
//   return (
//     <div className="bg-slate-800 h-screen w-screen">
//       hi
//     </div>
//   )
// }

// export default Message;

import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,Grid2,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { FaCamera, FaCog, FaHeart, FaComment, FaUserPlus } from "react-icons/fa";
import ProfileField from "../../../components/profileLayouts/ProfileField";

const ProfileContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));



const UserInfo = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  marginBottom: theme.spacing(2),
}));

const Stat = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
}));

const GalleryGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const GalleryImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
}));



const InstagramProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [name, setName] = useState("Bruhhh");
  const [bio, setBio] = useState("Passionate photographer and traveler");
  const [website, setWebsite] = useState("www.johndoe.com");
  const [followersCount, setFollowersCount] = useState(1000);
  const [followingCount, setFollowingCount] = useState(500);
  const [postsCount, setPostsCount] = useState(100);

 

  return (
    <ProfileContainer maxWidth="md">
      <ProfileHeader>
        <ProfileField width="12" height="12" />
        
        <UserInfo>
          <Typography variant="h4" gutterBottom>
            {name}
          </Typography>
          <StatsContainer>
            <Stat variant="subtitle1">
              <strong>{postsCount}</strong> posts
            </Stat>
            <Stat variant="subtitle1">
              <strong>{followersCount}</strong> followers
            </Stat>
            <Stat variant="subtitle1">
              <strong>{followingCount}</strong> following
            </Stat>
          </StatsContainer>
          <Typography variant="body1" gutterBottom>
            {bio}
          </Typography>
          <Typography variant="body2" color="primary" component="a" href={website} target="_blank">
            {website}
          </Typography>
        </UserInfo>
      </ProfileHeader>

      

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Gallery
      </Typography>
      <GalleryGrid container spacing={2}  >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={4} sm={4} md={4} key={item}>
            <GalleryImage
              src={`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80`}
              alt={`Gallery image ${item}`}
            />
          </Grid>
        ))}
      </GalleryGrid>

      
    </ProfileContainer>
  );
};

export default InstagramProfile;