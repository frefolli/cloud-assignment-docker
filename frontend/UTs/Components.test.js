import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import Modal from "../src/components/Modal";
import { act } from "react-test-renderer";
import MButton from "../src/components/MButton";

global.fetch = jest.fn().mockImplementation((url) =>
  Promise.resolve({
    json: () => {
      if (url === "/api/advice")
        return Promise.resolve(null);
        if (url === "/api/settings/color")
        return Promise.resolve({value:"default"});
        if (url === "/api/settings/background")
        return Promise.resolve({value:"default"});
         if (url === "/api/settings/nextRecipeID")
        return Promise.resolve({value:""});
        if (url === "/api/settings/nextRecipeQuantity")
        return Promise.resolve({value:""});
      return Promise.resolve({});
    },
  })
);

describe("Modal component", () => {
  test("should render correctly", async () => {
    let theContainer;
    await act(() => {
      const { container } = render(<Modal showModal={true} setShowModal={() => {}}/>);
      theContainer = container;
    });
    expect(theContainer.firstChild).toMatchSnapshot();
    await act(() => fireEvent.keyDown(screen.getByLabelText("Modal"), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    }));
  });
  
  test("should cancel correctly", async () => {
    let theContainer;
    await act(() => {
      const { container } = render(<Modal showModal={true} setShowModal={() => {}}/>);
      theContainer = container;
    });
    await act(() => fireEvent.click(screen.getByText("Cancel")));
  });

  test("create a MButton with custom class and id", async () => {
    await act(() => render(<MButton id="theID" className="theClassName"/>));
    await act(() => render(<MButton className="theClassName"/>));
    await act(() => render(<MButton id="theID"/>));
  });

  test("create a MButton with custom onClick and center", async () => {
    await act(() => render(<MButton />));
    await act(() => render(<MButton onClick={() => {}}/>));
    await act(() => render(<MButton center/>));
    await act(() => render(<MButton onClick={() => {}} center/>));
  });
});
