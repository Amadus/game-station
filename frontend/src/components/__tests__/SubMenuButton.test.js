import { render, screen } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import SubMenuButton from "../Login/SubMenuButton";

const server = setupServer(
  rest.get(
    `${process.env.REACT_APP_BACKEND_SERVER_ORIGIN_DEV}/user/624bc3ca7536e200694acc49`,
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
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("@auth0/auth0-react");

describe("SubMenuButton tests", () => {
  test("if sub-menu displays correctly", async () => {
    useAuth0.mockReturnValue({
      user: {
        sub: "auth0|624bc3ca7536e200694acc49",
      },
    });
    render(
      <SubMenuButton
        avatar={
          "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png"
        }
        setAvatar={jest.fn()}
      />
    );
    expect(screen.getByRole("img").getAttribute("src")).toBe(
      "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png"
    );
  });
});
