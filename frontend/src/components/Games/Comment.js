import React from "react";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export default function Comment({ comment, me, seller }) {
  const user = comment.user;
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
        sx={{ width: 40, height: 40 }}
        alt={user.user_name}
        id="sender-avatar"
      />
      <p className="sender-name">
        {user.user_name} {isMe && <span className="me-label">Me</span>}{" "}
        {isSeller && <span className="seller-label">Seller</span>}
      </p>
      <p className="comment-time">
        {`${DateTime.fromISO(comment.date).toRelative()}, 
        ${DateTime.fromISO(comment.date).toFormat("HH:mm")}`}
      </p>
      <p className="comment-text">{comment.content}</p>
    </div>
  );
}
