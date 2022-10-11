import { Dispatch, SetStateAction } from "react";

export interface IFormProps {
    setRowsCount: Dispatch<SetStateAction<number>>
    setColumnCount: Dispatch<SetStateAction<number>>
    rows: number,
    columns: number;
}