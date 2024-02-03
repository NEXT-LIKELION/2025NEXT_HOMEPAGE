import { useState, useEffect } from "react";
import LeftArrow from "public/images/activities/demoday/arrows/leftArrow.png";
import RightArrow from "public/images/activities/demoday/arrows/rightArrow.png";

import Tryanglez from "public/images/activities/demoday/demoteams/tryanglez.png";
import Petmorning from "public/images/activities/demoday/demoteams/Petmorning.png";
import Starchive from "public/images/activities/demoday/demoteams/starchive.png";
import Ingong from "public/images/activities/demoday/demoteams/ingong.png";
import Chocwallet from "public/images/activities/demoday/demoteams/chocwallet.png";
interface Image {
  name: string;
  src: string;
}

const ImageSlider: React.FC = () => {
  const images: Image[] = [
    { name: "tryanglez", src: Tryanglez },
    { name: "petmorning", src: Petmorning },
    { name: "ingong", src: Ingong },
    { name: "starchive", src: Starchive },
    { name: "chocwallet", src: Chocwallet },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("right");

  const onPrev = () => {
    setSlideDirection("right");
    setSlideIn(false);
  };

  const onNext = () => {
    setSlideDirection("left");
    setSlideIn(false);
  };

  useEffect(() => {
    if (!slideIn) {
      const timeoutId = setTimeout(() => {
        setSlideIn(true);
        setCurrentIndex(
          (currentIndex +
            (slideDirection === "right" ? -1 : 1) +
            images.length) %
            images.length
        );
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [slideIn]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3rem",
      }}
    >
      <img
        onClick={onPrev}
        src={LeftArrow.src}
        style={{
          width: "1.5rem",
          margin: "0 2rem 0 0",
          visibility: currentIndex === 0 ? "hidden" : "visible",
        }}
      />
      <div
        style={{
          height: "25rem",
          width: "40rem",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src.src}
            alt={image.name}
            style={{
              transition: "transform 0.5s ease-in-out",
              transform:
                index === currentIndex
                  ? "translateX(0)"
                  : index < currentIndex
                  ? `translateX(-100%)`
                  : `translateX(100%)`,
              position: "absolute",
              top: 0,
              left: 0,
              height: "25rem",
              width: "40rem",
            }}
          />
        ))}
      </div>
      <img
        onClick={onNext}
        src={RightArrow.src}
        style={{
          width: "1.5rem",
          margin: "0 0 0 2rem",
          isibility: currentIndex === images.length - 1 ? "hidden" : "visible",
        }}
      />
    </div>
  );
};

export default ImageSlider;
