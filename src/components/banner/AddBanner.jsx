import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";

import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

import {
  getImageUrl,
  addBanner,
  getBannerById,
  deleteStoragereference,
} from "../helpers/firebase";

let bannerData = {
  bannerType: "",
  imageUrl: {},
  createdAt: "",
  updatedAt: null,
};

export default function AddBanner() {
  const [file, setFile] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [banner, setBanner] = React.useState(bannerData);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBannerById(id).then((banner) => {
        setBanner(banner);
        setSelectedImage(banner.imageUrl.url);
      });
    }
  }, [id]);

  const handleChange = (event) => {
    setBanner({ ...banner, bannerType: event.target.value });
  };

  const handleFile = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setFile(file);
  };
  async function submit() {
    if (!banner.bannerType) {
      return;
    }
    setLoading(true);
    if (file) {
      if (id) {
        await deleteStoragereference(banner?.imageUrl.path);
      } else {
        banner.imageUrl = await getImageUrl(file);
        console.log({ banner });
      }
    }
    await addBanner(banner, id);
    setLoading(false);
    navigate("/banners");
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <h1>Add Banner</h1>
        <FormControl sx={{ m: 1 }} required>
          <InputLabel htmlFor="my-input">Banner For</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={banner?.bannerType}
            label="Banner Type"
            onChange={handleChange}
          >
            <MenuItem value={"HomeTop"}>Home Top</MenuItem>
            <MenuItem value={"HomeMiddle"}>Home Middle</MenuItem>
            <MenuItem value={"HomeBottom"}>Home bottom</MenuItem>
            <MenuItem value={"Category"}>Category</MenuItem>
            <MenuItem value={"Package"}>Package</MenuItem>
            <MenuItem value={"Product"}>Product</MenuItem>
          </Select>

          {selectedImage && (
            <img
              src={selectedImage}
              alt={"Banner"}
              style={{ marginTop: "14px", marginBottom: "14px" }}
              loading="lazy"
              width={"100%"}
              boxFit="cover"
              height={300}
            />
          )}
          <Button
            variant="contained"
            component="label"
            onChange={(e) => handleFile(e.target.files[0])}
          >
            {selectedImage ? "Change Banner" : "Upload Banner"}
            <input hidden accept="image/*" multiple type="file" />
            {loading && <CircularProgress size={24} />}
          </Button>
          {!loading && (
            <Button
              loading
              variant="outlined"
              style={{ marginTop: "14px" }}
              endIcon={<SendIcon />}
              onClick={submit}
            >
              {id ? "Update" : "Submit"}
            </Button>
          )}
        </FormControl>
      </Box>
    </>
  );
}
