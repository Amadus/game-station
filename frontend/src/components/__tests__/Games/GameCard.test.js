import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import Games from "../../Games/Games";
import GameCard from "../../Games/GameCard";

describe("Game tests", () => {
    test("if game displays correctly", async () => {

        render(
            <MemoryRouter>
                <GameCard

                    infor={
                        {
                            _id: "626490fdc798409b0860aadf",
                            title: "No man's sky",
                            price: 20,
                            picture_urls: [
                                "https://res.cloudinary.com/gamestationca/image/upload/v1650757834/games/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE_372_e9vydd.png",
                            ],
                            post_date: "2022-04-23T23:51:25.606Z",
                            condition: "New",
                            platform: "PlayStation 4",
                            city: "Burnaby",
                            postal_code: "V5C4C8",
                            description: "totally new!",
                            status: "Selling",
                            seller: {
                                _id: "624a27de301c56006a914078",
                                user_name: "clem",
                                __v: 0,
                                avatar_url:
                                    "https://res.cloudinary.com/drextjznd/image/upload/v1650758001/games/QQ%E6%88%AA%E5%9B%BE20220115223419_uhwn3y.jpg",
                            },
                            __v: 0,
                        }
                    }

                />
            </MemoryRouter>
        );

        expect(screen.getAllByText(/Details/i).length).toBe(1);
        expect(screen.getAllByText(/Price:/i).length).toBe(1);
        expect(screen.getAllByText(/Postal code:/i).length).toBe(1);
        const cards = await screen.findAllByText(/No man's sky/i);
        expect(cards.length).toBe(1);
    });
});