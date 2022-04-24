import { render, screen } from "@testing-library/react";
import App from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";

jest.mock("@auth0/auth0-react");

describe("Top Navigation Bar tests", () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    });
  });

  test("test if items in the navigation bar exist when user is not logged in", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/game station/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/games/i)).toBeInTheDocument();
    expect(screen.getByText(/sell/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
