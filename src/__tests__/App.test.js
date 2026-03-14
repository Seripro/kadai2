import { App } from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Title Test", () => {
  it("タイトルが学習記録一覧であること", async () => {
    // testId(title)を指定して取得
    render(<App />);
    const title = await screen.findByTestId("title", undefined, {
      timeout: 5000,
    });
    expect(title).toHaveTextContent("学習記録一覧");
  });
});
