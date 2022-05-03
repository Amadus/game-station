import { render, screen } from "@testing-library/react";
import ImagesUpload from "../Sell/ImagesUpload";

describe("Image Upload tests", () => {
  test("if everything shows correct", () => {
    const picture_urls = [];
    picture_urls.push("This is a mock url.");
    const setPicture_urls = jest.fn();
    render(
      <ImagesUpload
        picture_urls={picture_urls}
        setPicture_urls={setPicture_urls}
      />
    );
    expect(screen.getByAltText("image-0").getAttribute("src")).toBe(
      "This is a mock url."
    );
  });
});
