import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home/Home";

jest.mock("@auth0/auth0-react");

describe("Home page tests", () => {
  test("if there are sections", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText(/you viewed/i)).toBeNull();
    expect(screen.getByText(/today's picks/i)).toBeInTheDocument();
    expect(screen.getByText(/xbox/i)).toBeInTheDocument();
    expect(screen.getByText(/playstation/i)).toBeInTheDocument();
    expect(screen.getByText(/switch/i)).toBeInTheDocument();
  });

  test("if there are 2 cards named the evil within 2", async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const cards = await screen.findAllByText(/The evil within 2/i);
    expect(cards.length).toBe(2);
  });
});
