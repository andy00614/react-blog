import React from "react";
import { render, cleanup } from "@testing-library/react";
// import Nav from "./nav";
import Layout from "../components/Layout";

afterEach(cleanup);

describe("first", () => {
  it("runs", () => {
    const { getByText } = render(<Layout />);
    expect(getByText("hahah")).toBeInTheDocument();
  });
});
