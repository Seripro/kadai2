import { App } from "../App";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

const mockGetAllRecords = jest.fn();
const mockInsertRecord = jest.fn();

jest.mock("../utils/supabaseFunctions", () => ({
  getAllRecords: () => mockGetAllRecords(),
  insertRecord: (record) => mockInsertRecord(record),
  deleteRecord: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

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

describe("学習記録アプリ", () => {
  it("フォームを送信すると、記録の数が1つ増えること", async () => {
    let records = [{ id: 1, title: "初期データ", time: "1" }];

    mockGetAllRecords.mockImplementation(async () => ({
      data: records,
      error: null,
    }));

    mockInsertRecord.mockImplementation(async (record) => {
      records = [...records, { id: 2, ...record }];
    });

    // 1. レンダリング
    render(<App />);

    // 初期表示の読み込み完了を待つ（以下でgetを使えるようにするため）
    await screen.findByText("初期データ 1時間");

    // 2. 登録前のリストアイテムの数を取得
    // App.jsでは各記録に「削除」ボタンが1つあるため、その件数を記録数として扱う
    const initialCount = screen.queryAllByRole("button", {
      name: "削除",
    }).length;

    // 3. ユーザー操作（フォーム入力）
    // App.jsの入力欄はlabel要素ではなくinputが2つ並ぶ構造
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: { value: "Reactのテスト" },
    });
    fireEvent.change(inputs[1], {
      target: { value: "2" },
    });

    // 4. 登録ボタンをクリック
    fireEvent.click(screen.getByRole("button", { name: /登録/i }));

    // 5. 検証：リストアイテムが1つ増えているか
    await waitFor(() => {
      const finalCount = screen.queryAllByRole("button", {
        name: "削除",
      }).length;
      expect(finalCount).toBe(initialCount + 1);
    });

    // 6. 追加の検証：入力した内容が画面にあるか
    expect(screen.getByText("Reactのテスト 2時間")).toBeInTheDocument();
    // toHaveBeenCalledWith：関数がこの引数で呼ばれたかどうかを確認
    expect(mockInsertRecord).toHaveBeenCalledWith({
      title: "Reactのテスト",
      time: "2",
    });
  });
});
