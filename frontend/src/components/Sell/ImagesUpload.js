import React, { useState, useEffect } from "react";
import { IconButton, Input, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function ImagesUpload({ picture_urls, setPicture_urls }) {
  const [showImage2, setShowImage2] = useState(false);

  const uploadImage = async (e, index) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gamestationca");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/gamestationca/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    let urls = getUrlsCopy();
    urls[index] = file.secure_url;
    setPicture_urls(urls);
    console.log("Upload successfully");
    console.log(urls);
  };

  const addAnImage = () => {
    if (!showImage2) {
      setShowImage2(true);
    }
  };

  const deleteAnImage = (index) => {
    if (index === 2) {
      let urls = getUrlsCopy();
      urls.splice(1, 2);
      console.log(urls);
      setPicture_urls(urls);
      setShowImage2(false);
    }
  };

  const getUrlsCopy = () => {
    let urls = [];
    for (let url of picture_urls) {
      urls.push(url);
    }
    return urls;
  };

  return (
    <>
      <label htmlFor="icon-button-file0" id="image-box-0">
        <Input
          accept="image/*"
          id="icon-button-file0"
          type="file"
          onChange={(e) => uploadImage(e, 0)}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          id="icon-button-0"
        >
          {!picture_urls[0] ? (
            <PhotoCamera id="image-icon-1" />
          ) : (
            <img src={picture_urls[0]} alt="image-0" className="images" />
          )}
        </IconButton>
      </label>
      {showImage2 && (
        <>
          <label htmlFor="icon-button-file1" id="image-box-1">
            <Input
              accept="image/*"
              id="icon-button-file1"
              type="file"
              onChange={(e) => uploadImage(e, 1)}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              id="icon-button-1"
            >
              {!picture_urls[1] ? (
                <PhotoCamera id="image-icon-1" />
              ) : (
                <img src={picture_urls[1]} alt="image-1" className="images" />
              )}
            </IconButton>
          </label>
          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={() => {
              deleteAnImage(2);
            }}
            color="error"
            fullWidth
          >
            Delete One
          </Button>
        </>
      )}
      <Button
        variant="outlined"
        startIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={addAnImage}
        fullWidth
      >
        Add another
      </Button>
    </>
  );
}
