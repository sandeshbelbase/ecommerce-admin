import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Edit } from "@mui/icons-material";

const BannerCard = ({ banner, index, deleteBanner }) => {
  return (
    <Box margin={2} key={index}>
      <Box display="flex" justifyContent={"space-between"}>
        <h2>{banner.bannerType}</h2>
        <Box>
          <Link to={banner.id}>
            <IconButton aria-label="edit" size="medium">
              <Edit fontSize="inherit" />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={deleteBanner}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <img
        src={banner.imageUrl.url}
        alt={banner.name}
        height={300}
        width={1000}
      />
    </Box>
  );
};
export default BannerCard;
