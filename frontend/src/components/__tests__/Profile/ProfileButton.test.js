import { render, screen } from "@testing-library/react";
import MenuItem from '@mui/material/MenuItem';
import ProfileButton from "../../Profile/ProfileButton";
import { MemoryRouter } from "react-router-dom";

describe("ProfileButton tests", () => {
    test("if ProfileButton works", () => {
        render(
            <MemoryRouter>
                <ProfileButton />
            </MemoryRouter>

        );
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});