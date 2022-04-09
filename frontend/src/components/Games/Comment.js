import React from "react";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

export default function Comment({ comment, me, seller }) {
  const user = comment.user;
  const [label, setLabel] = useState("");
  const [isMe, setIsMe] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (user._id === seller) {
      setIsSeller(true);
      setIsMe(false);
    } else if (user._id === me) {
      setIsMe(true);
    }
  }, [me, seller]);

  return (
    <div>
      <Avatar
        src={user.avatar_url}
        sx={{ width: 35, height: 35 }}
        id="sender-avatar"
      />
      <p className="sender-name">
        {user.user_name} {isMe && <span className="me-label">Me</span>}{" "}
        {isSeller && <span className="seller-label">Seller</span>}
      </p>
      <p className="comment-text">{comment.content}</p>
    </div>
  );
}
