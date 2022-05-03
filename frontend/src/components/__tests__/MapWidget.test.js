import { render, screen } from "@testing-library/react";
import MapWidget from "../utils/MapWidget";

describe("MapWidget tests", () => {
  test("if MapWidget works", () => {
    render(<MapWidget postal_code="V7C 0A4" />);
    const marker = screen.getByTitle(/my marker/i);
    expect(marker).toBeInTheDocument();
  });
});
