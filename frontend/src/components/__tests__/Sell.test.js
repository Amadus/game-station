import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";
import Sell from "../Sell/Sell";

jest.mock("@auth0/auth0-react");

describe("Sell page tests", () => {
  test("if input fields exist", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Sell />
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Title/i).length).toBe(2);
    expect(screen.getAllByText(/Price/i).length).toBe(2);
    expect(screen.getAllByText(/Condition/i).length).toBe(2);
    expect(screen.getAllByText(/Platform/i).length).toBe(2);
    expect(screen.getAllByText(/City/i).length).toBe(2);
    expect(screen.getAllByText(/Postal Code/i).length).toBe(2);
    expect(screen.getAllByText(/Description/i).length).toBe(2);
    expect(screen.getByText(/Create Post/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Title" })).toBeEmpty();
    expect(screen.getByRole("textbox", { name: "Description" })).toBeEmpty();
    expect(screen.getByRole("combobox", { name: "City" })).toBeEmpty();
  });
});
