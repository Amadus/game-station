import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { rest } from "msw";
import { MemoryRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import SellerProfile from "../../Profile/SellerProfile";

const server = setupServer(
    rest.get(
        "http://localhost:3030/user/624bc3ca7536e200694acc49",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    _id: "624bc3ca7536e200694acc49",
                    user_name: "muziyulin111@icloud.com",
                    avatar_url:
                        "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png",
                    __v: 0,
                })
            );
        }
    ),
    rest.post(
        "http://localhost:3030/post/getpostsbyfilters",
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

jest.mock("@auth0/auth0-react");

describe("SellerProfile tests", () => {
    test("if SellerProfile displays correctly", async () => {
        useAuth0.mockReturnValue({
            user: {
                sub: "auth0|624bc3ca7536e200694acc49",
                nickname: "linGe",
                email: "123@gmail.com",
            },
        });
        render(
            <MemoryRouter>
                <SellerProfile />
            </MemoryRouter>
        );
        expect(await screen.findByText("img")).getAttribute("src").toBe(
            "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png"
        );
        expect(screen.getByText(/your items/i)).toBeInTheDocument();
        expect(screen.getByText(/linge/i)).toBeInTheDocument();
        expect(screen.getByText(/123@gmail.com/i)).toBeInTheDocument();
        const cards = await screen.findAllByText(/No man's sky/i);
        expect(cards.length).toBe(1);
    });
});
