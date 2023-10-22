import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MButton from '../src/components/MButton';
import { act } from "react-test-renderer";

describe("MButton and its own", () => {
  test("render and click a nothing doing button", async () => {
    await act(() => render(<MButton text="Bottone"/>));
    await act(() => fireEvent.click(screen.getByText("Bottone")));
  })

  test("render and click a nothing doing centered button", async () => {
    await act(() => render(<MButton center text="Bottone"/>));
    await act(() => fireEvent.click(screen.getByText("Bottone")));
  })

  test("render and click with and within class/id indicator", async () => {
    await act(() => render(<MButton id="theID"/>));
    await act(() => render(<MButton id="theID" className="theClass"/>));
    await act(() => render(<MButton className="theClss"/>));
  })

  test("centered and uncentered button and onClick", async () => {
    await act(() => render(<MButton center/>));
    await act(() => render(<MButton/>));
    await act(() => render(<MButton onClick={() => {}}/>));
  })
})
