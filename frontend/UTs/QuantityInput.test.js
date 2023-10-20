import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-test-renderer";
import QuantityInput from "../src/components/QuantityInput";
import { render, screen, fireEvent } from "@testing-library/react";

const deploy = () => (<QuantityInput label="QuantityInput" onChange={() => {}}/>);

describe("QuantityInput tests", () => {
  test("inputs is empty string", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.change(screen.getByLabelText("QuantityInput"), {target:{value:""}}))
  })
  
  test("inputs is an invalid string", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.change(screen.getByLabelText("QuantityInput"), {target:{value:"ciao"}}))
    await act(() => fireEvent.change(screen.getByLabelText("QuantityInput"), {target:{value:"-9"}}))
  })
  
  test("inputs is a valid string", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.change(screen.getByLabelText("QuantityInput"), {target:{value:"66"}}))
  })
  
  test("inputs is a perfectable valid string, and there it comes the blur", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.blur(screen.getByLabelText("QuantityInput"), {target:{value:"6."}}))
    await act(() => fireEvent.blur(screen.getByLabelText("QuantityInput"), {target:{value:""}}))
  })
  
  test("inputs is a invalid valid string, and there it comes the blur", async () => {
    await act(() => render(deploy()));
    await act(() => fireEvent.blur(screen.getByLabelText("QuantityInput"), {target:{value:"-6."}}))
    await act(() => fireEvent.blur(screen.getByLabelText("QuantityInput"), {target:{value:"ciao"}}))
  })
})
