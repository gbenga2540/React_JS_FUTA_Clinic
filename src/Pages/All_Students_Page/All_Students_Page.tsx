import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import './All_Students_Page.scss';
import { useTable } from 'react-table';
import { table_headers } from '../../Data/Table_Headers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { ClipLoader } from 'react-spinners';

const AllStudentsPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const columns = useMemo(() => [...table_headers], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            data: students,
            // @ts-ignore
            columns: columns,
        });

    useEffect(() => {
        const get_all_students = () => {
            setIsLoading(true);
            const toast_id = toast.loading('Please wait...');
            try {
                const user_info = localStorage.getItem(
                    process.env.REACT_APP_USER_INFO as string,
                );
                if (
                    user_info === undefined ||
                    user_info === null ||
                    user_info === 'undefined' ||
                    user_info === 'null'
                ) {
                    setIsLoading(false);
                    toast.update(toast_id, {
                        render: `User Token is missing! Please sign in!`,
                        type: 'error',
                        isLoading: false,
                        autoClose: 2000,
                    });
                    navigate('/login');
                } else {
                    const token = JSON.parse(user_info || '{}')?.token;
                    if (token) {
                        try {
                            Axios.get(
                                `${process.env.REACT_APP_REST_API}/students`,
                                {
                                    headers: {
                                        'x-access-token': token,
                                    },
                                },
                            )
                                .catch(err => {
                                    setIsLoading(false);
                                    if (err) {
                                        toast.update(toast_id, {
                                            render: err,
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    }
                                })
                                .then(res => {
                                    if (res?.data?.status === 'success') {
                                        const students_data =
                                            res?.data?.response;
                                        let new_data = [];
                                        for (
                                            let i = 0;
                                            i < students_data.length;
                                            i++
                                        ) {
                                            let p_data = {};
                                            p_data = {
                                                ...students_data[i],
                                                matric_no: `${students_data[
                                                    i
                                                ]?.matric_no
                                                    ?.slice(0, 3)
                                                    ?.toUpperCase()}${students_data[
                                                    i
                                                ]?.matric_no?.slice(3)}`,
                                            };
                                            new_data.push(p_data);
                                        }
                                        setStudents(new_data);
                                        setIsLoading(false);
                                        toast.update(toast_id, {
                                            render: "Student's Data Loaded!",
                                            type: 'success',
                                            isLoading: false,
                                            autoClose: 1000,
                                        });
                                    } else if (res?.data?.status === 'error') {
                                        setIsLoading(false);
                                        toast.update(toast_id, {
                                            render: res?.data?.code,
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    } else {
                                        setIsLoading(false);
                                        toast.update(toast_id, {
                                            render: "Error loading Student's Data!",
                                            type: 'error',
                                            isLoading: false,
                                            autoClose: 2000,
                                        });
                                    }
                                });
                        } catch (error) {
                            setIsLoading(false);
                            toast.update(toast_id, {
                                render: "Error loading Student's Data!",
                                type: 'error',
                                isLoading: false,
                                autoClose: 2000,
                            });
                        }
                    } else {
                        setIsLoading(false);
                        toast.update(toast_id, {
                            render: `User Token is missing! Please sign in!`,
                            type: 'error',
                            isLoading: false,
                            autoClose: 2000,
                        });
                        navigate('/login');
                    }
                }
            } catch (err) {
                setIsLoading(false);
                toast.update(toast_id, {
                    render: `User Token is missing! Please sign in!`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 2000,
                });
                navigate('/login');
            }
        };
        get_all_students();
    }, []);

    return (
        <>
            {isLoading && (
                <div className="asp_loading">
                    <ClipLoader
                        color={'white'}
                        loading={true}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            )}
            <div className="asp_dim"></div>
            <div className="asp_main">
                <h1 className="a_m_h">Students Record</h1>
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
                                        navigate(
                                            `/students/${row?.original?._id}`,
                                        )
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
        </>
    );
};

export default AllStudentsPage;
