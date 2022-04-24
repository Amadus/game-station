import { render, screen } from "@testing-library/react";
import MapMarker from "../utils/MapMarker";

describe("MapMarker tests", () => {
  test("if MapMarker works", () => {
    render(<MapMarker lat={25} lng={25} name="My Marker" color="red" />);
    const marker = screen.getByTitle(/my marker/i);
    expect(marker).toBeInTheDocument();
  });
});
