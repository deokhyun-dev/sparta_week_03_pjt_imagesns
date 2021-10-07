import React from "react";
import { Grid, Image, Text, Button } from "../elements";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const Post = props => {
  return (
    <>
      <Grid>
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.user_info.user_profile} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Button
              width="auto"
              padding="10px"
              size="10px"
              margin="0px 5px 0px 0px"
            >
              수정
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Text>{props.contents}</Text>
      </Grid>
      <Grid>
        <Image shape="rectangle" src={props.image_url} margin="10px" />
      </Grid>

      <Grid is_flex>
        <Text margin="0px 5px 0px 0px" bold>
          좋아요 {props.like_cnt}개
        </Text>
        <Favorite onClick={() => {}} />
        <FavoriteBorder onClick={() => {}} />
      </Grid>
    </>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "다니엘",
    user_profile:
      "https://www.007.com/wp-content/uploads/2020/05/B25_11846_RC.jpg",
  },
  image_url: "https://www.007.com/wp-content/uploads/2020/05/B25_11846_RC.jpg",
  contents: "노타임투다이",
  like_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;
