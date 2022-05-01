import { render, screen } from "@testing-library/react";
import Auth0ProviderWithHistory from "../Auth0ProviderWithHistory";
import { MemoryRouter } from "react-router-dom";


Object.defineProperty(global.self, 'crypto', {
    value: {
        getRandomValues: arr => crypto.randomBytes(arr.length)
    }
})
global.crypto.subtle = {}

describe("Auth0ProviderWithHistory tests", () => {
    test("if Auth0ProviderWithHistory works", () => {
        render(
            <MemoryRouter>
                <Auth0ProviderWithHistory />
            </MemoryRouter>
        );
    });
});