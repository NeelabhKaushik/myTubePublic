import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Video, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetails = () => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  console.log(channelDetails, videos);
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetails(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "radial-gradient(circle, rgba(236,98,159,1) 0%, rgba(153,95,193,1) 44%, rgba(134,139,224,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetails} marginTop="-110px" />
      </Box>
      <Box display=" flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Video videos={videos}></Video>
      </Box>
    </Box>
  );
};

export default ChannelDetails;
