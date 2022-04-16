import React, { useState, useEffect } from "react";
import { IconButton, Input, Container } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function ImagesUpload({ picture_urls, setPicture_urls }) {
  const uploadImage = async (e) => {
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
    let urls = [];
    urls.push(file.secure_url);
    setPicture_urls(urls);
  };

  return (
    <>
      <label htmlFor="icon-button-file1" id="image-box-1">
        <Input
          accept="image/*"
          id="icon-button-file1"
          type="file"
          onChange={uploadImage}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          id="icon-button-1"
        >
          {!picture_urls[0] ? (
            <PhotoCamera id="image-icon-1" />
          ) : (
            <img src={picture_urls[0]} alt="image-1" id="image-1" />
          )}
        </IconButton>
      </label>
    </>
  );
}
