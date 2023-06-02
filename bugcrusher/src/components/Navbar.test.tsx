import Navbar from "./Navbar";
import React from "react";
import { render } from "@testing-library/react";

describe("Navbar", () => {
    it("renders", () => {
        const { getByText } = render(<Navbar/>);
        expect(getByText("Navbar")).toBeInTheDocument();
    });
});