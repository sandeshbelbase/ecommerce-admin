import { Box, Button, Modal, Typography, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteBanner,
  deleteStoragereference,
  getBanners,
} from "../helpers/firebase";
import { style } from "./../product/Product";
import CircularProgress from "@mui/material/CircularProgress";
import BannerCard from "./banner_card";
import { ToastContainer, toast } from "react-toastify";

export default function Banners() {
  const [banners, setBanners] = useState();
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getBanners().then((banners) => setBanners(banners));
  }, []);
  const handleDeleteModel = (item) => {
    handleOpen();
    setDeleteData(item);
  };

  const notifyDelete = () => toast.success("Banner deleted sucessfully!!");

  function handleOnCancelDelete() {
    setDeleteData(undefined);
    handleClose();
  }
  const handleDelete = async () => {
    setDeleteButtonLoading(true);
    setBanners(banners.filter((banner) => banner.id !== deleteData?.id));
    await deleteStoragereference(deleteData?.imageUrl?.path);
    await deleteBanner(deleteData?.id);
    setDeleteButtonLoading(false);
    handleClose();
    notifyDelete();
  };

  return (
    <>
      <Box>
        <Box display={"flex"} justifyContent="space-between" margin={2}>
          <h1>Banners</h1>
          <Link to="/banners/add">
            <Button
              sx={{ width: "fit-Content" }}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Add Banner
            </Button>
          </Link>
        </Box>
        {!banners && <CircularProgress color="primary" />}
        <Box maxWidth={1000}>
          {banners &&
            banners?.map((banner, index) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                index={index}
                deleteBanner={() => handleDeleteModel(banner)}
              />
            ))}
        </Box>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper elevation={2}>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are you sure you want to delete?
                </Typography>
                <Button
                  variant="contained"
                  // className={classes.modalDelete}
                  onClick={() => handleDelete()}
                  sx={{
                    bgcolor: "#ff000094 !important",
                    marginRight: "10px",

                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  {deleteButtonLoading ? (
                    <CircularProgress size={25} sx={{ color: "white" }} />
                  ) : (
                    "Yes"
                  )}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleOnCancelDelete()}
                  sx={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    fontSize: "12px",
                  }}
                >
                  NO
                </Button>
              </Box>
            </Paper>
          </Modal>
        </div>
      </Box>
    </>
  );
}
