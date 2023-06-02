import Login from "./Login";
import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

describe("Login", () => {
    it("renders", () => {
        const { getByText } = render(<Login/>);
        expect(getByText("Login")).toBeInTheDocument();
    });
});
