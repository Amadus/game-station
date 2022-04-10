import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import Comment from "./Comment";
import "./CommentSection.css";

export default function CommentSection({ gameData, seller }) {
  const commentArea = useRef(null);
  const gameId = useParams().gameId;
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [commentText, setCommentText] = useState("");
  const [commentsData, setCommentsData] = useState([]);

  let currentUserId = user.sub.substring(user.sub.indexOf("|") + 1);
  if (currentUserId.length > 24) {
    currentUserId = currentUserId.substring(0, 24);
  } else {
    currentUserId = currentUserId.padEnd(24, "0");
  }
  
  useEffect(() => {
    async function getCommentsData() {
      const data = await fetch(
        `http://localhost:3030/comment/getcommentsbypostid/${gameId}`
      );
      const comments = await data.json();
      setCommentsData(comments);
    }
    getCommentsData();
  }, [commentsData.length]);

  const toLogIn = () => {
    loginWithRedirect({ screen_hint: "sign_up" });
  };

  const postComment = async () => {
    if (commentText === "") {
      alert("Please write a comment!");
    } else {
      const post = {};
      post.user = currentUserId;
      post.post = gameData._id;
      post.content = commentText;

      const data = await fetch("http://localhost:3030/comment/createcomment", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(post),
      });
      const newPost = await data.json();
      setCommentsData(...commentsData, newPost);
      commentArea.current.value = "";
    }
  };

  return (
    <Stack spacing={2}>
      {commentsData.length
        ? commentsData.map((comment) => (
            <Comment
              comment={comment}
              me={user ? currentUserId : ""}
              seller={seller._id}
            />
          ))
        : ""}
      {isAuthenticated ? (
        <>
          <TextField
            fullWidth
            id="commentArea"
            inputRef={commentArea}
            label="Comments"
            multiline
            rows={3}
            placeholder="Want to ask someting? Write your comments."
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            fullwidth
            variant="contained"
            size="large"
            id="submit-button"
            onClick={postComment}
          >
            Make A Comment
          </Button>
        </>
      ) : (
        <Button
          fullwidth
          variant="contained"
          color="success"
          size="large"
          id="submit-button"
          onClick={toLogIn}
        >
          Become A Member to Comment
        </Button>
      )}
    </Stack>
  );
}
