import { render, screen } from "@testing-library/react";
import LoginButton from "../../Login/LoginButton"

describe("LoginButton tests", () => {
    test("if LoginButton works", () => {
        render(<LoginButton />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });
});