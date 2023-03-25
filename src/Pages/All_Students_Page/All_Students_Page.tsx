import React, { FunctionComponent, useMemo } from 'react';
import './All_Students_Page.scss';
import TempData from '../../Temp/Health_Centre_Data.json';
import { useTable } from 'react-table';
import { table_headers } from '../../Data/Table_Headers';
import { useNavigate } from 'react-router-dom';

const AllStudentsPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const data = useMemo(() => TempData, []);
    const columns = useMemo(() => [...table_headers], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            data: data,
            // @ts-ignore
            columns: columns,
        });

    return (
        <div className="asp_main">
            <h1 className="a_m_h">Student Database</h1>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr
                                onClick={() =>
                                    navigate(`/students/${parseInt(row?.id)}`)
                                }
                                {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllStudentsPage;
