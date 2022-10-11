import React, { useLayoutEffect, useState } from 'react';
import './App.css';
import { Table } from "./components/table/Table";
import { CreateTableForm } from "./components/create_table_form/CreateTableForm";

function App() {
    const rowsCount = Number(localStorage.getItem('rowsCount'));
    const columnCount = Number(localStorage.getItem('columnCount'));
    const [rows, setRows] = useState<number>(rowsCount)
    const [columns, setColumns] = useState<number>(columnCount)

    useLayoutEffect(() => {
        if (rows !== 0 && columns !== 0) {
            localStorage.setItem('rowsCount', String(rows))
            localStorage.setItem('columnCount', String(columns))
        }
    }, [rows, columns])

    return (
        <div>
            {!rows && !columns && <CreateTableForm setColumnCount={setColumns} setRowsCount={setRows} rows={rows} columns={columns}/>}
            {!!rows && !!columns && (
                <>
                    <Table columnsCount={columns} rowsCount={rows}/>
                    <button onClick={() => {
                        localStorage.setItem('rowsCount', String(0))
                        localStorage.setItem('columnCount', String(0))
                        setRows(0)
                        setColumns(0)
                    }}>Delete table
                    </button>
                </>
                )}
        </div>
    );
}

export default App;
