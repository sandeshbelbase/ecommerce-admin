import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductList from "../context/ProductContext";
import { deleteDocument, deleteStoragereference } from "../helpers/firebase";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Searchbar from "../common/Searchbar";
import Spinner from "../common/Spinner";
import { getAllProduct } from "../helpers/firebase";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  p: 3,
};

const editButton = {
  backgroundColor: "#57c357",
  "&:hover": {
    backgroundColor: "#0ea10e",
  },
};

const deleteButton = {
  backgroundColor: "#dd5f5f",
  "&:hover": {
    backgroundColor: "#f54343",
  },
};

export function Product() {
  const navigate = useNavigate();
  const { allProduct, setAllProduct } = useContext(ProductList);

  const [allCopiedProducts, setAllCopiesProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteData, setDeleteData] = useState();
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  function onAddClick() {
    navigate("/product/add");
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteModel = (item) => {
    handleOpen();
    setDeleteData(item);
  };

  useEffect(() => {
    const storeProduct = (p) => {
      setAllProduct(p);
      setAllCopiesProducts(p);
      setLoading(false);
    };
    let isActive = true;
    setLoading(true);
    if (isActive) {
      getAllProduct(storeProduct);
    }
    return () => {
      isActive = false;
    };
  }, []);

  function setSearch(value) {
    const newData = allCopiedProducts.filter((item) => {
      return item?.name?.toLowerCase()?.includes(value?.toLowerCase());
    });
    setAllProduct(newData);
  }

  const handleEditProduct = (id) => {
    navigate(`/product/edit/${id}`);
  };

  const notifyDelete = () => toast.success("Product deleted sucessfully!!");

  console.log(allProduct);
  const handleDelete = async () => {
    setDeleteButtonLoading(true);
    await deleteStoragereference(deleteData?.imageUrls?.path);
    await deleteDocument(deleteData?.id, "products");
    handleClose();
    setDeleteButtonLoading(false);
    notifyDelete();
  };

  const handleOnCancelDelete = () => {
    setDeleteData(undefined);
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "end",
          margiLeft: "0px",
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            position: "sticky",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          Products
        </Typography>

        <Button
          sx={{ width: "fit-Content" }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          type="submit"
          onClick={() => onAddClick()}
        >
          Add Product
        </Button>
      </Box>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        allProduct && (
          <Paper
            elevation={2}
            sx={{
              padding: "20px",
              margin: "10px 0 0",
              height: "75vh",
              overflow: "scroll",
            }}
          >
            <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
              <Grid item sm={12} display="flex" justifyContent="center">
                <Searchbar setSearch={setSearch} />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              sx={{
                marginTop: "10px",
                padding: "5px 0",
                height: "90%",
                overflow: "scroll",
              }}
            >
              {allProduct.map((item) => (
                <Grid item sm={4} key={item.id}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      background: "#f8f8f8",
                      padding: "10px",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={item?.imageUrls[0]?.url}
                        alt={item.id}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "5px 3px !important",
                        }}
                      >
                        <div>
                          <Typography
                            gutterBottom
                            sx={{ fontWeight: "bold", fontSize: "18px" }}
                            component="div"
                          >
                            {item.name}
                          </Typography>
                        </div>
                        <div>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span
                              style={{
                                marginRight: "10px",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            >
                              Price:
                            </span>
                            <Typography
                              variant="body2"
                              sx={
                                item.discount !== 0
                                  ? { textDecoration: "line-through" }
                                  : undefined
                              }
                            >
                              Aud{item.price}
                            </Typography>
                          </div>

                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {item.discount !== null && item.discount !== 0 && (
                              <span
                                style={{
                                  marginRight: "10px",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                }}
                              >
                                New Price:
                              </span>
                            )}

                            {item.discount !== null && item.discount !== 0 ? (
                              <Typography variant="h6">
                                {item.price -
                                  (item.discount / 100) * item.price}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            <Typography
                              sx={{
                                backgroundColor: `${
                                  item.available ? "#398b1d" : "#f36565"
                                }`,
                                textAlign: "center",
                                color: "white",
                                borderRadius: "5px",
                              }}
                            >
                              {item.available ? "Available" : "Comming soon"}
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </CardActionArea>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={editButton}
                        onClick={() => handleEditProduct(item.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={deleteButton}
                        onClick={(c) => handleDeleteModel(item)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
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
          </Paper>
        )
      )}
    </>
  );
}
