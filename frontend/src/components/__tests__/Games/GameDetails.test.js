import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import GameDetails from "../../Games/GameDetails"

const server = setupServer(
    rest.post(
        `${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/history`,
        (req, res, ctx) => {
            return res(
                ctx.json([{
                },])
            );
        }
    ),
    rest.post(
        `${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/post/626490fdc798409b0860aadf`,
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
                <GameDetails />
            </MemoryRouter>
        );

        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Comments')).toBeInTheDocument();
        expect(screen.getByText('Seller Information')).toBeInTheDocument();
        expect(screen.getByText('There is no description for this game.')).toBeInTheDocument();
        expect(screen.getByText('Become A Member to Comment')).toBeInTheDocument();

    });
});