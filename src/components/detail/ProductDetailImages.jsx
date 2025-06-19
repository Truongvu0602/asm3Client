import React, { useEffect, useState } from "react";

import classes from './ProductDetailImages.module.css'

export default function ProductDetailImages({images}) {

  const [showingImg, setShowingImg] = useState(null);

  useEffect(() => {
    setShowingImg(images[0]);
  }, [images])

  const changeShowcase = (img) => {
    setShowingImg(img);
  };

  return (
    <div className={classes.detailImage_wrapper}>
      <div className={classes.detailImage_listWrapper}>
        <ul className={classes.detailImage_list}>
          {images.map((img, i) => (
            <img
              key={i}
              className={`${classes.detailImage_item} ${
                showingImg === img ? classes.active : undefined
              }`}
              alt="product img"
              src={img}
              onClick={() => {
                changeShowcase(img);
              }}
            />
          ))}
        </ul>
      </div>
      <div className={classes.detailImage_showcase}>
        <img
          className={classes.detailImage_showcaseImg}
          alt="Showcase img"
          src={showingImg || images.img1}
        />
      </div>
    </div>
  );
}
