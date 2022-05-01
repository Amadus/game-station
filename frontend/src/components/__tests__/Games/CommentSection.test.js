import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CommentSection from "../../Games/CommentSection";

describe("CommentSection tests", () => {
    test("if Comment section displays correctly", async () => {

        render(
            <MemoryRouter>
                <CommentSection
                    gameData={{}}
                    seller={{}}
                />
            </MemoryRouter>
        );
        expect(screen.getByText('Become A Member to Comment')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();

    });
});