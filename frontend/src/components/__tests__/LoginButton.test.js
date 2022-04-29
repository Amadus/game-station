import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Login/LoginButton";

jest.mock("@auth0/auth0-react");

describe("LoginButton tests", () => {
  test("if the button shows correct", () => {
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
    });

    render(<LoginButton />);
    expect(screen.getByRole("button").innerHTML).toBe("Login");
  });
});
