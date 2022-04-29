import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Login/LogoutButton";

jest.mock("@auth0/auth0-react");

describe("LogoutButton tests", () => {
  test("if the button shows correct", () => {
    useAuth0.mockReturnValue({
      logout: jest.fn(),
    });

    render(<LogoutButton />);
    expect(screen.getByRole("menuitem").innerHTML.slice(0, 6)).toBe("Logout");
  });
});
