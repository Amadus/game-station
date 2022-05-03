import { render, screen } from "@testing-library/react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import ProtectedRoute from "../ProtectedRoute";

jest.mock("@auth0/auth0-react");

describe("ProtectedRoute tests", () => {
  test("if ProtectedRoute works when passed a component", () => {
    function MockHeader() {
      return <h2>mock header</h2>;
    }

    withAuthenticationRequired.mockReturnValue(MockHeader);
    render(<ProtectedRoute protectedComponent={MockHeader} />);
    expect(screen.getByText(/mock header/i)).toBeInTheDocument();
  });
});
