import React, { useState } from "react";
import "./Sell.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Sell() {
  const { user } = useAuth0();
  const seller = user.sub.substring(user.sub.indexOf("|") + 1).padEnd(24, "0");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  // const [picture_urls, setPicture_urls] = useState([]);
  const [condition, setCondition] = useState("");
  const [platform, setPlatform] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [description, setDescription] = useState("");

  const picture_urls = [];

  const conditionChange = () => {
    setCondition(document.getElementById("condition").value);
  };

  const platformChange = () => {
    setPlatform(document.getElementById("platform").value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      // picture_urls === [] ||
      condition === "" ||
      platform === "" ||
      postal_code === ""
    ) {
      alert("Please complete the form!");
    } else {
      const post = {};
      post.title = title;
      post.price = price;
      post.picture_urls = picture_urls;
      post.condition = condition;
      post.platform = platform;
      post.postal_code = postal_code;
      post.description = description;
      post.status = "Selling";
      post.seller = seller;

      fetch("http://localhost:3030/post/createpost", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(post),
      })
        .then((res) => res.text())
        .then((text) => console.log(text))
        .then(alert("You have succuessfully submit your request!"))
        .then(navigate("/"));
    }
  };

  return (
    <div className="log-container">
      <div className="suf-box-log">
        <section className="suf-subscription">
          <div className="input-areas">
            <form>
              <input
                className="suf-input-first"
                id="title"
                type="text"
                placeholder="Title"
                onBlur={() => {
                  setTitle(document.getElementById("title").value);
                }}
              />
            </form>
            <form>
              <input
                className="suf-input-first"
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                onBlur={() => {
                  setPrice(document.getElementById("price").value);
                }}
              />
            </form>
            <form>
              <select
                className="suf-input-first"
                id="condition"
                onChange={conditionChange}
              >
                <option value="">Select condition</option>
                <option value="Used">Used</option>
                <option value="New">New</option>
              </select>
            </form>
            <form>
              <select
                className="suf-input-first"
                id="platform"
                onChange={platformChange}
              >
                <option value="">Select platform</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="Xbox Series X|S">Xbox Series X|S</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
              </select>
            </form>
            <form>
              <input
                className="suf-input-first"
                id="postcal_code"
                type="text"
                placeholder="Postal Code"
                onBlur={() => {
                  setPostal_code(document.querySelector("#postcal_code").value);
                }}
              />
            </form>
            <form>
              <input
                className="suf-input-first"
                id="description"
                type="text"
                placeholder="Description"
                onBlur={() => {
                  setDescription(document.querySelector("#description").value);
                }}
              />
            </form>
            <form>
              <button className="suf-submit" onClick={clickSubmit}>
                Create Post
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
