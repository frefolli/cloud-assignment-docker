import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { act } from "react-test-renderer";
import DedicatedTable from "../src/components/DedicatedTable";

const simpleColumns = [{title: "Boh", key: "boh"}]
const simpleRows = [...Array(11).keys()].map(i => {return {boh: i+"m", key: i+"k"}}).concat({boh: "0m", key: "kk"});
const deploy = () => render(<DedicatedTable rows={simpleRows} columns={simpleColumns}/>);

describe("DedicatedTable", () => {
    test("should use back and next arrow", async () => {
        await act(() => deploy());
        await act(() => fireEvent.click(screen.getByLabelText("Pagina Successiva")));
        await act(() => fireEvent.click(screen.getByLabelText("Pagina Precedente")));
    })
    
    test("should use rows per page", async () => {
        await act(() => deploy());
        await act(() => fireEvent.mouseDown(screen.getByLabelText("Righe per Pagina").firstChild));
        await act(() => fireEvent.click(screen.getByText("5")));
    })
    
    test("should use rows per page", async () => {
        await act(() => deploy());
        await act(() => fireEvent.click(screen.getByText("Boh")));
        await act(() => fireEvent.click(screen.getByText("Boh")));
    })
})