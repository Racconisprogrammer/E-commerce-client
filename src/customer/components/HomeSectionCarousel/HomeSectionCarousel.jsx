import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import AliceCarousel from "react-alice-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";

const HomeSectionCarousel = ({data, sectionName}) => {
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const renderNextButton = ({ isDisabled }) => {
    return (
      <Button
        variant="contained"
        className="z-50 bg-white"
        sx={{
          position: "absolute",
          top: "8rem",
          right: "0rem",
          transform: "translateX(-50%) rotate(90deg)",
          bgcolor: "white",
        }}
        aria-label="next"
      >
        <KeyboardArrowLeftIcon
          sx={{ transform: "rotate(90deg)", color: "black" }}
        />
      </Button>
    );
  };

  const renderPrevButton = ({ isDisabled }) => {
    return <Button
    variant="contained"
    className="z-50 bg-white"
    sx={{
      position: "absolute",
      top: "8rem",
      left: "0rem",
      transform: "translateX(50%) rotate(-90deg)",
      bgcolor: "white",
    }}
    aria-label="next"
  >
    <KeyboardArrowLeftIcon
      sx={{ transform: "rotate(90deg)", color: "black" }}
    />
  </Button>
  };

  const items = data
    .slice(0, 10)
    .map((item) => <HomeSectionCard product={item} />);

  return (
    <div className="border">
        <h2 className="text-2xl font-extrabold text-gray-800 py-5">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          responsive={responsive}
          items={items}
          disableDotsControls
          renderPrevButton={renderPrevButton}
          renderNextButton={renderNextButton}
        />

      </div>
    </div>
  );
};

export default HomeSectionCarousel;
