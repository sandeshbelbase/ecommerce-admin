import UploadIcon from "@mui/icons-material/Upload";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomCheckbox from "../common/customCheckbox/CustomCheckbox";
import { CustomInput } from "../common/customInput/CustomInput";
import { CustomTextarea } from "../common/customTextarea/CustomTextarea";
import { getAllProduct, getImageUrl } from "../helpers/firebase";

import { yupResolver } from "@hookform/resolvers/yup";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useAddEditProduct } from "../../api/ApiCall";
import Spinner from "../common/Spinner";
import { CustomHiddenInput } from "../common/customInput/CustomHiddenInput";

const saveButton = {
  backgroundColor: "#57c357",
  marginRight: "20px",
  "&:hover": {
    backgroundColor: "#0ea10e",
  },
};

const cancelButton = {
  backgroundColor: "#dd5f5f",
  paddingLeft: "5px",
  paddingRight: "5px",
  "&:hover": {
    backgroundColor: "#f54343",
  },
};

export default function AddProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [addEditLoading, setAddEditLoading] = useState(false);
  const defaultProduct = {
    id: "",
    name: "",
    description: "",
    available: true,
    productCode: "",
    discount: 0,
    price: 0,
    updatedAt: null,
    productCode: "",
    quantity: 1,
    imageUrls: [],
    image: [],
  };

  const updated = () => toast.success("Product updated sucessfully!!");
  const failed = () => toast.success("Failed to process");
  const notifyAdd = () => toast.success("Product added successfully!");

  const upload = useRef(null);

  const uploadImage = () => {
    upload.current.click();
  };

  const schema = yup
    .object({
      name: yup.string().required("Product name is required."),
      description: yup.string().required("Description is required"),
      image: yup.mixed().required("Image is required"),
      price: yup
        .number()
        .typeError("Price is required")
        .min(1, "Price amount must be greater than 0.")
        .required(),
      quantity: yup
        .number()
        .typeError("Quantity must be positive")
        .min(1, "Quantity amount must be greater than 0."),
    })
    .required();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultProduct });

  const { mutateAsync: addEditProduct, isLoading } = useAddEditProduct();

  const image = watch("image");
  const imageUrls = watch("imageUrls");
  useEffect(() => {
    if (productId) {
      const product = (prod) => {
        const oneProduct = prod.find((p) => p.id === productId);
        setProduct(oneProduct);
        setLoading(false);
      };
      let isActive = true;
      setLoading(true);
      if (isActive) {
        getAllProduct(product);
      }
      return () => {
        isActive = false;
      };
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      setValue("id", product?.id);
      setValue("name", product?.name);
      setValue("description", product?.description);
      setValue("price", product?.price);
      setValue("discount", product?.discount);
      setValue("available", product?.available);
      setValue("quantity", product?.quantity);
      setValue("imageUrls", product?.imageUrls);
      setValue("productCode", product?.productCode);
      setValue("image", []);
    }
  }, [product]);

  function navigateToProductPage() {
    navigate("/product");
  }
  const onSubmit = async (values) => {
    setAddEditLoading(true);
    defaultProduct.id = values?.id;
    defaultProduct.name = values.name;
    defaultProduct.description = values.description;
    defaultProduct.price = values.price;
    defaultProduct.discount =
      typeof values.discount === NaN || !values.discount
        ? 0
        : Number(values.discount);
    defaultProduct.quantity = Number(values.quantity); //ToDo : Need to add quantity in number form.
    defaultProduct.available = values.isAvailable;
    defaultProduct.imageUrls = values.imageUrls ? [...values.imageUrls] : [];
    if (image) {
      let imageUrls = {};

      // if (editData?.imageUrls) {
      //   for(const imgUrl of editData?.imageUrls){
      //     await deleteStoragereference(imgUrl.path);
      //   }
      // }

      for (const img of values.image) {
        imageUrls = await getImageUrl(img, "products-image");
        defaultProduct.imageUrls.push(imageUrls);
      }
    } else {
      defaultProduct.imageUrls = product?.imageUrls;
    }
    try {
      const update = typeof productId === "string" && productId ? true : false;
      await addEditProduct({ ...defaultProduct, update });
      if (productId) {
        updated();
      } else {
        notifyAdd();
      }
      navigateToProductPage();
      reset();
      setAddEditLoading(false);
    } catch (error) {
      setAddEditLoading(false);
      failed();
      reset();
    }
  };

  if (loading) {
    return <Spinner />;
  }
  const deleteSingleImage = (id, remove) => {
    if (remove === "firebaseDelete") {
      const filterImage = imageUrls?.filter((img) => img.url !== id);
      setValue("imageUrls", filterImage);
    } else {
      const newImage = image?.filter((item) => {
        return item?.lastModified !== id;
      });
      setValue("image", newImage);
    }
  };

  const handleImage = (e) => {
    const tempImages = image ?? [];
    tempImages.push(...e.target.files);
    setValue("image", tempImages);
  };

  return (
    <>
      <Paper elevation={2} sx={{ padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item sm={3} sx={{ paddingTop: "8px !important" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <label
                    style={{
                      color: "#828282",
                      fontSize: "14px",
                      paddingBottom: "4px",
                    }}
                  >
                    Upload Product Image
                  </label>
                </div>
                <div
                  onClick={uploadImage}
                  style={{
                    height: "179px",
                    width: "100%",
                    background: "#f4f9ff",
                    border: "1px solid #e4e4e4",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <UploadIcon />
                    Upload
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {image &&
                    image.map((item, index) => (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignSelf: "end",
                          margin: "22px 10px 0px 0px",
                          position: "relative",
                        }}
                        key={index}
                      >
                        <CancelIcon
                          onClick={() =>
                            deleteSingleImage(item?.lastModified, "localDelete")
                          }
                          sx={{
                            position: "absolute",
                            top: "-23px",
                            cursor: "pointer",
                            color: "#d97b7b",
                            right: "0",
                            "&:hover": {
                              color: "red",
                              transition: "1s",
                            },
                          }}
                        />
                        <img
                          src={URL?.createObjectURL(item)}
                          alt=""
                          height="175px"
                          width="175px"
                        />
                      </div>
                    ))}

                  {imageUrls &&
                    imageUrls.map((item) => (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignSelf: "end",
                          margin: "22px 10px 0px 0px",
                          position: "relative",
                        }}
                        key={item.url}
                      >
                        <CancelIcon
                          onClick={() =>
                            deleteSingleImage(item.url, "firebaseDelete")
                          }
                          sx={{
                            position: "absolute",
                            top: "-23px",
                            cursor: "pointer",
                            color: "#d97b7b",
                            right: "0",
                            "&:hover": {
                              color: "red",
                              transition: "1s",
                            },
                          }}
                        />
                        <img
                          src={item.url}
                          alt=""
                          height="175px"
                          width="175px"
                        />
                      </div>
                    ))}
                </div>
                <CustomHiddenInput
                  // style={{ display: "none" }}
                  className="uploadImage"
                  type="file"
                  accept="image/*"
                  control={control}
                  name="image"
                  ref={upload}
                  isMultiple
                  onChange={handleImage}
                />
              </div>
              <Typography sx={{ color: "red !important", fontSize: "12px" }}>
                {errors?.icon?.message}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <CustomInput label="Product Name" control={control} name="name" />
              <Typography sx={{ color: "red !important", fontSize: "12px" }}>
                {errors?.name?.message}
              </Typography>
            </Grid>
            <Grid item sm={12} sx={{ paddingTop: "30px !important" }}>
              <CustomTextarea
                label="Description"
                control={control}
                name="description"
                rows={7}
              />
              <Typography sx={{ color: "red !important", fontSize: "12px" }}>
                {errors?.description?.message}
              </Typography>
            </Grid>

            <Grid item sm={4}>
              <CustomInput
                type="number"
                label="Price(Rs)"
                control={control}
                name="price"
              />
              <Typography sx={{ color: "red !important", fontSize: "12px" }}>
                {errors?.price?.message}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <CustomInput
                type="number"
                label="Quantity"
                control={control}
                name="quantity"
              />
              <Typography sx={{ color: "red !important", fontSize: "12px" }}>
                {errors?.quantity?.message}
              </Typography>
            </Grid>

            <Grid item sm={4}>
              <CustomInput
                type="number"
                label="Discount (%)"
                control={control}
                name="discount"
                defaultValue={0}
              />
              <Typography sx={{ color: "red !important", fontSize: "12px" }}>
                {errors?.discount?.message}
              </Typography>
            </Grid>

            <Grid item sm={12}>
              <CustomCheckbox
                defaultValue={true}
                label="Is Available?"
                control={control}
                name="isAvailable"
              />
            </Grid>

            <Grid item sm={12}>
              <Box
                marginTop={2.5}
                marginLeft={0}
                display="flex"
                sx={{ margiLeft: "0px", marginTop: "0px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  sx={saveButton}
                  disabled={isLoading || addEditLoading}
                >
                  {isLoading || addEditLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : productId ? (
                    "Edit"
                  ) : (
                    "Add"
                  )}
                </Button>
                <Button
                  sx={cancelButton}
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  onClick={() => {
                    reset();
                    navigate("/product");
                  }}
                >
                  CANCEL
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
