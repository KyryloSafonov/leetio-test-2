import React, { FC } from 'react';
import './Table.css'
import { ITableProps } from "./types";

export const Table: FC<ITableProps> = ({rowsCount, columnsCount}) => {

    const rowsArray = Array(rowsCount).fill(null)
    const columnArray = Array(columnsCount).fill(null)
    const minsArray = Array(Math.round(rowsCount * columnsCount * 0.1))
    for (let i = 0; i < minsArray.length - 1; i++) {
        const rowIndex = Math.floor(Math.random() * rowsCount)
        const columnIndex = Math.floor(Math.random() * columnsCount)
        minsArray[i] = {rowIndex, columnIndex};
    }
    const uniqRowsIndex = [...new Set(minsArray.map(item => item.rowIndex))]
    const uniqColumnsIndex = [...new Set(minsArray.map(item => item.columnIndex))]
    const uniqArrayWithBombs = minsArray.map((item, index) => ({
        columnIndex: uniqColumnsIndex[index],
        rowIndex: uniqRowsIndex[index]
    }))
    return (
        <table id='table'>
            <tbody>
            {rowsArray.map((item, rowsIndex) => {
                return (
                    <tr key={`${rowsIndex}-row`}>
                        {columnArray.map((item, index) => {
                            return (
                                <td key={`${index}-column`} className={'hide-text'} id={`td-${index}${rowsIndex}`}
                                    onClick={(e) => {
                                        const td = e.target as HTMLTableDataCellElement
                                        if (td.outerText !== '💣') {
                                            let counter = 0
                                            for (let x = 0; x < 3; x++) {
                                                for (let y = 0; y < 3; y++) {
                                                    const searchColumn = index + y - 1
                                                    const searchRow = rowsIndex + x - 1
                                                    uniqArrayWithBombs.forEach((item) => {
                                                        if (item.rowIndex === searchRow && item.columnIndex === searchColumn)
                                                            counter++
                                                    })
                                                }
                                            }

                                            const tdEl = document.getElementById(`td-${index}${rowsIndex}`)
                                            if (tdEl !== null && tdEl.childNodes.length < 1) {
                                                tdEl.classList.remove('hide-text');
                                                tdEl.append(String(counter))
                                            }
                                        }
                                        if (td.outerText === '💣') {
                                            const tdEls = document.getElementsByTagName('td')
                                            if (tdEls.length)
                                                for (const tdEl of tdEls) {
                                                    tdEl.classList.remove('hide-text')
                                                    tdEl.classList.add('disabled')
                                                }
                                        }
                                        e.preventDefault();
                                    }}>{uniqArrayWithBombs.map(item => (
                                    item && item.rowIndex === rowsIndex && item.columnIndex === index ? '💣' : ''
                                ))}</td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    );
};