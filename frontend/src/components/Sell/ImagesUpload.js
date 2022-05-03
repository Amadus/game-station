import React, { useState, useEffect } from "react";
import { IconButton, Input, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function ImagesUpload({ picture_urls, setPicture_urls }) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const [inputNum, setInputNum] = useState(1);
  const [neverUpload, setNeverUpload] = useState(true);

  useEffect(() => {
    if (neverUpload && picture_urls.length) {
      setInputNum(picture_urls.length);
    }

    if (picture_urls.length === inputNum && picture_urls.length < 3) {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }

    if (inputNum > 1) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  }, [picture_urls.length, inputNum]);

  const uploadImage = async (e, index) => {
    setNeverUpload(false);
    const files = e.target.files;
    if (!files.length) {
      return;
    }
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
  };

  const addAnImage = () => {
    setInputNum(inputNum + 1);
  };

  const deleteAnImage = () => {
    if (inputNum === picture_urls.length) {
      picture_urls.pop();
    }
    setInputNum(inputNum - 1);
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
            <PhotoCamera id="image-icon-0" />
          ) : (
            <img src={picture_urls[0]} alt="image-0" className="images" />
          )}
        </IconButton>
      </label>
      {inputNum >= 2 && (
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
      )}
      {inputNum >= 3 && (
        <label htmlFor="icon-button-file2" id="image-box-2">
          <Input
            accept="image/*"
            id="icon-button-file2"
            type="file"
            onChange={(e) => uploadImage(e, 2)}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            id="icon-button-2"
          >
            {!picture_urls[2] ? (
              <PhotoCamera id="image-icon-2" />
            ) : (
              <img src={picture_urls[2]} alt="image-2" className="images" />
            )}
          </IconButton>
        </label>
      )}
      {showDeleteButton && (
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faTrashCan} />}
          onClick={deleteAnImage}
          color="error"
          fullWidth
        >
          Delete One
        </Button>
      )}
      {showAddButton && (
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={addAnImage}
          fullWidth
        >
          Add another
        </Button>
      )}
    </>
  );
}
