import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Birre from "../src/pages/Birre";
import Home from "../src/pages/Home";
import Ricette from "../src/pages/Ricette";
import Spesa from "../src/pages/Spesa";

describe("Birre component", () => {
  test("should render correctly", () => {
    const { container } = render(<Birre />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Home component", () => {
  test("should render correctly", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("Ricette component", () => {
  test("should render correctly", () => {
    const { container } = render(<Ricette />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("handleView shows modal with correct content", () => {
    const { getAllByText } = render(<Ricette />);

    const viewButtons = getAllByText("Visualizza");
    fireEvent.click(viewButtons[0]);

    expect(viewButtons[0]).toBeInTheDocument();
  });

  test("handleEdit shows modal with correct content", () => {
    const { getAllByText } = render(<Ricette />);

    const viewButtons = getAllByText("Modifica");
    fireEvent.click(viewButtons[0]);

    expect(viewButtons[0]).toBeInTheDocument();
  });

  test("handleDelete shows modal with correct content", () => {
    const { getAllByText } = render(<Ricette />);

    const viewButtons = getAllByText("Rimuovi");
    fireEvent.click(viewButtons[0]);

    expect(viewButtons[0]).toBeInTheDocument();
  });
});

describe("Spesa component", () => {
  test("should render correctly", () => {
    const { container } = render(<Spesa />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
