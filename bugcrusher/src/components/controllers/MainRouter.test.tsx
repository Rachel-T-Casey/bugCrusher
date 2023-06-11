import MainRouter from "./MainRouter";
import React from "react";
import { render } from "@testing-library/react";

describe("MainRouter", () => {
    it("Renders", () => {
        const { getByText } = render(<MainRouter/>);
        expect(getByText("MainRouter")).toBeInTheDocument();
    });
});