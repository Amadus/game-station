import { render, screen } from "@testing-library/react";
import Auth0ProviderWithHistory from "../Auth0ProviderWithHistory";
import { MemoryRouter } from "react-router-dom";

describe("Auth0ProviderWithHistory tests", () => {
    test("if Auth0ProviderWithHistory works", () => {
        render(
            <MemoryRouter>
                <Auth0ProviderWithHistory />
            </MemoryRouter>
        );
        expect(screen.getByText(/auth0provider/i)).toBeInTheDocument();
    });
});