import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import GameEdit from "../Sell/GameEdit";

const server = setupServer(
  rest.get("http://localhost:3030/post/1", (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "626490fdc798409b0860aadf",
        title: "Elden Ring, xbox ver",
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
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom");

describe("GameEdit page tests", () => {
  test("if edit game displays correctly", async () => {
    useParams.mockReturnValue({
      gameId: 1,
    });
    render(<GameEdit />);
    expect(await screen.findByText("New")).toBeInTheDocument();
    expect(screen.getByText("PlayStation 4")).toBeInTheDocument();
    expect(screen.getByText("totally new!")).toBeInTheDocument();
    expect(screen.getByText("Edit Post")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
