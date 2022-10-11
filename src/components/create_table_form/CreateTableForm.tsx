import React, { FC, useRef } from 'react';
import { IFormProps } from "./types";
import "./CreateTableForm.css"

export const CreateTableForm: FC<IFormProps> = ({setColumnCount, setRowsCount, rows, columns}) => {
    const rowsInput = useRef<HTMLInputElement | null>(null)
    const coulmnInput = useRef<HTMLInputElement | null>(null)
    return (
        <div className="form-wrapper">
            <label htmlFor="rows-count">Rows Count</label>
            <input name='rows-count' type='number' ref={rowsInput} defaultValue={rows}/>
            <label htmlFor="coulmn-count">Columns Count</label>
            <input name='column-count' type='number' ref={coulmnInput} defaultValue={columns}/>
            <button type="submit" onClick={() => {
                setRowsCount(Number(rowsInput.current?.value ?? 0))
                setColumnCount(Number(coulmnInput.current?.value ?? 0))
            }}>Create table</button>
        </div>
    );
};