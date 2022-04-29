import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import App from "../../App";

jest.mock("@auth0/auth0-react");

describe("App.js tests", () => {
  test("if loading works", () => {
    useAuth0.mockReturnValue({
      isLoading: true,
    });

    render(<App />);
    expect(screen.getByAltText("Loading")).toBeInTheDocument();
  });
});
