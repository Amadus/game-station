import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home/Home";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:3030/post/all", (req, res, ctx) => {
    return res(
      ctx.json([
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
        },
        {
          _id: "625f9d29598f6ae08bd9a0eb",
          title: "Pokémon Legends Arceus, Switch",
          price: 70,
          picture_urls: [
            "https://res.cloudinary.com/gamestationca/image/upload/v1650433173/games/image_ifsd5m.jpg",
            "https://res.cloudinary.com/gamestationca/image/upload/v1650433209/games/image_tukpxy.jpg",
            "https://res.cloudinary.com/gamestationca/image/upload/v1650433240/games/image_cb9kfy.jpg",
          ],
          post_date: "2022-04-20T05:42:01.243Z",
          condition: "Used",
          platform: "Nintendo Switch",
          city: "Richmond",
          postal_code: "V7C 0A4",
          description: "Great new game, a very innovative Pokémon game.",
          status: "Selling",
          seller: {
            _id: "624a6586be9b3f0070b96110",
            user_name: "lucas@test.com",
            __v: 0,
            avatar_url:
              "https://res.cloudinary.com/drextjznd/image/upload/v1649832808/games/02F95EAB-B293-4510-A8EE-BBEFFA3D1BE5-20783-00000CDC42C7AAAA_z6ojni.jpg",
          },
          __v: 0,
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("@auth0/auth0-react");

describe("Home page tests", () => {
  test("if there are sections", () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.queryByText(/you viewed/i)).toBeNull();
    expect(screen.getByText(/today's picks/i)).toBeInTheDocument();
    expect(screen.getByText(/xbox/i)).toBeInTheDocument();
    expect(screen.getByText(/playstation/i)).toBeInTheDocument();
    expect(screen.getByText(/switch/i)).toBeInTheDocument();
  });

  test("if there are game cards", async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const cards = await screen.findAllByText(/No man's sky/i);
    expect(cards.length).toBe(2);
    const anotherCards = screen.getAllByText(/Pokémon Legends Arceus, Switch/i);
    expect(anotherCards.length).toBe(2);
    expect(screen.queryByText(/the evil within/)).toBeNull();
  });
});
