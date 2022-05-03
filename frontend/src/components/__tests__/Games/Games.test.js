import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import Games from "../../Games/Games"

const server = setupServer(
    rest.post(
        `${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/post/getpostsbyfilters`,
        (req, res, ctx) => {
            return res(
                ctx.json([{
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
                },])
            );
        }
    ),
    rest.post(
        `${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/post/all`,
        (req, res, ctx) => {
            return res(
                ctx.json([{
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
                },])
            );
        }
    )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Game tests", () => {
    test("if game displays correctly", async () => {

        render(
            <MemoryRouter>
                <Games />
            </MemoryRouter>
        );

        expect(screen.getAllByText(/More Filters/i).length).toBe(1);
        expect(screen.getAllByText(/Price From/i).length).toBe(2);
        expect(screen.getAllByText(/Condition/i).length).toBe(2);
        expect(screen.getAllByText(/Platform/i).length).toBe(2);
        expect(screen.getAllByText(/City/i).length).toBe(2);
        expect(screen.getAllByText(/Price To/i).length).toBe(2);
        const cards = await screen.findAllByText(/No man's sky/i);
        expect(cards.length).toBe(1);
    });
});