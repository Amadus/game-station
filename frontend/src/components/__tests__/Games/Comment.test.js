import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Comment from "../../Games/Comment"

describe("CommentSection tests", () => {
    test("if Comment section displays correctly", async () => {

        render(
            <MemoryRouter>
                <Comment
                    comment={{
                        user: {
                            _id: "624bc3ca7536e200694acc49",
                            user_name: "muziyulin111@icloud.com",
                            avatar_url:
                                "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png",
                            __v: 0,
                        }
                    }}

                    me={{
                        _id: "624bc3ca7536e200694acc49",
                        user_name: "muziyulin111@icloud.com",
                        avatar_url:
                            "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png",
                        __v: 0,
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.getByText('muziyulin111@icloud.com')).toBeInTheDocument();
        expect(screen.getByRole("img").getAttribute("src")).toBe(
            "https://s.gravatar.com/avatar/9faf89d953190cd36a4a692c5c0c1efc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmu.png"
        );

    });
});