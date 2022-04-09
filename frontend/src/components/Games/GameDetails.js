import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function GameDetails() {
  const gameId = useParams().gameId;

  useEffect(() => {
    console.log(gameId);
  }, []);

  return <div>GameDetails</div>;
}
