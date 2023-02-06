import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState([]);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromAPI(`videos?id=${id}`).then((res) => setVideoDetail(res.items[0]));
    fetchFromAPI(`search?relatedToVideoId=${id}&type=video`).then((res) =>
      setVideos(res.items)
    );
  }, [id]);
  if (!videoDetail?.snippet) return "Loading...";
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", postion: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
              autoplay
            />
            <Typography variant="h5" color="#fff" p={2} fontWeight="bold">
              {videoDetail.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                <Typography
                  color="#fff"
                  variant={{ sm: "subtitle1", md: "h6" }}
                >
                  {videoDetail.snippet.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "14px", color: "gray", ml: "2px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.viewCount).toLocaleString()}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(videoDetail.statistics.likeCount).toLocaleString()}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Box
        px={2}
        py={{ md: 1, xs: 5 }}
        justifyContent="center"
        alignItems="center"
      >
        <Videos videos={videos} direction="column" />
      </Box>
    </Box>
  );
};
export default VideoDetail;
