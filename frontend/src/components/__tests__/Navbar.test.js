import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Navbar";
import { MemoryRouter } from "react-router-dom";

jest.mock("@auth0/auth0-react");

describe("Top Navigation Bar tests", () => {
  test("if items in the navigation bar exist when user is not logged in", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Navbar avatar="avatar" setAvatar={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/game station/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/games/i)).toBeInTheDocument();
    expect(screen.getByText(/sell/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/avatar/i)).toBeNull();
  });

  test("if items in the navigation bar exist when user is logged in", () => {
    const user = {
      sub: "000000000000000000000000",
      name: "adc@test.edu",
    };
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: user,
      logout: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Navbar avatar="avatar" setAvatar={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText(/game station/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/games/i)).toBeInTheDocument();
    expect(screen.getByText(/sell/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).toBeNull();
    expect(screen.getByAltText(/avatar/i)).toBeInTheDocument();
  });
});
