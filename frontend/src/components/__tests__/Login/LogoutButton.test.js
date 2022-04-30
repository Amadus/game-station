import { render, screen } from "@testing-library/react";
import LogoutButton from "../../Login/LogoutButton";

describe("LogoutButton tests", () => {
    test("if LogoutButton works", () => {
        render(<LogoutButton />);
        const button = screen.getByText('Logout');
        expect(button).toBeInTheDocument();
    });
});