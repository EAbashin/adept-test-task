// @ts-ignore
import s from '../Tables.module.css';
import React, {useEffect, useState} from 'react';
import {PropsEmployeesTableType} from "../Types";
import Preloader from "../Preloader/Preloader";

const EmployeesTable = (props: PropsEmployeesTableType) => {
        const
            [isCheckedAllEmployees, setIsCheckedAllEmployees] = useState(false),
            [employeeSurnameValue, setEmployeeSurnameValue] = useState(''),
            [employeeNameValue, setEmployeeNameValue] = useState(''),
            [employeePositionValue, setEmployeePositionValue] = useState(''),
            [page, setPage] = useState(1),
            [isLoading, setIsLoading] = useState(false),
            [selectedEmployeesId, setSelectedEmployeesId] = useState<Array<number>>([]);

        const onChangeSelectionAllEmployee = () => {
            setIsCheckedAllEmployees(!isCheckedAllEmployees);
            props.toggleIsCheckedAllEmployees(props.checkedCompanies, !isCheckedAllEmployees);
        };

        const onChangeSelectionEmployee = (employeeId: number) => {
            props.toggleIsCheckedEmployee(employeeId);
        };

        useEffect(() => {
            const checkIsCheckedAllEmployees = () => {
                const isCondition = props.checkedEmployees.every(employee => employee.isChecked);
                if (isCondition) {
                    setIsCheckedAllEmployees(true)
                } else {
                    setIsCheckedAllEmployees(false)
                }
            };
            const selectedEmployeesId = props.checkedEmployees.reduce((idArray, employee) => {
                return employee.isChecked ? [...idArray, employee.id] : idArray
            }, []);
            checkIsCheckedAllEmployees();
            setSelectedEmployeesId(selectedEmployeesId);
        }, [props.checkedEmployees]);
        useEffect(() => {
            setPage(1);
        }, [props.checkedEmployees.length]);
        const submitAddEmployeeForm = (event: React.FormEvent) => {
            props.addEmployee(employeeSurnameValue, employeeNameValue, employeePositionValue, props.checkedCompanies);
            setEmployeeSurnameValue('');
            setEmployeeNameValue('');
            setEmployeePositionValue('');
            event.preventDefault();
        };

        function onScrollList(event: any) {
            const scrollBottom = event.target.scrollTop +
                event.target.offsetHeight >= event.target.scrollHeight;

            if (scrollBottom && props.checkedEmployees.length > shortCheckedEmployees.length) {
                shortCheckedEmployees = props.checkedEmployees.slice(0, page * 20);
                setIsLoading(true);
                setTimeout(() => {
                    setPage(page + 1);
                    setIsLoading(false);
                }, 500);
            }
        }

        let shortCheckedEmployees = props.checkedEmployees.slice(0, page * 20);

        const employeesList = shortCheckedEmployees.map(employee => {
                return (
                    <tr className={`${employee.isChecked ? s.selected : ''}`} key={`${employee.id.toString(2)}${employee.surname}`}>
                        <td className={`${s.cell} ${s.cell_small}`}><input type="checkbox" checked={employee.isChecked}
                                                                           onChange={() => onChangeSelectionEmployee(employee.id)}
                        /></td>
                        <td className={`${s.cell} ${s.cell_big}`}>{employee.surname}</td>
                        <td className={`${s.cell} ${s.cell_big}`}>{employee.name}</td>
                        <td className={`${s.cell} ${s.cell_big}`}>{employee.position}</td>
                    </tr>
                )
            }
        );

        return (
            <div>
                <div>
                    <table className={s.table}>
                        <thead>
                        <tr>
                            <th className={`${s.cell} ${s.cell_small}`}><input title={'Выделить всё'} type="checkbox"
                                                                               checked={isCheckedAllEmployees}
                                                                               onChange={onChangeSelectionAllEmployee}
                            /></th>
                            <th className={`${s.cell} ${s.cell_big}`}>Фамилия</th>
                            <th className={`${s.cell} ${s.cell_big}`}>Имя</th>
                            <th className={`${s.cell} ${s.cell_big}`}>Должность</th>
                        </tr>
                        </thead>
                    </table>
                    <div onScroll={event => onScrollList(event)} className={s.wrapper_body}>
                        <table className={s.table}>
                            <tbody>
                            {isLoading && <Preloader/>}
                            {employeesList}
                            </tbody>
                        </table>
                    </div>
                    <div className={s.form_wrapper}>
                        <form onSubmit={submitAddEmployeeForm} className={s.form}>
                            <input value={employeeSurnameValue}
                                   onChange={event => setEmployeeSurnameValue(event.target.value)}
                                   name={'employeeSurname'} type="text"
                                   placeholder={'Фамилия'}/>
                            <input value={employeeNameValue}
                                   onChange={event => setEmployeeNameValue(event.target.value)}
                                   name={'employeeName'}
                                   type="text" placeholder={'Имя'}/>
                            <input value={employeePositionValue}
                                   onChange={event => setEmployeePositionValue(event.target.value)}
                                   name={'employeePosition'}
                                   type="text" placeholder={'Должность'}/>
                            <button className={s.btn_add_company}
                                    disabled={props.checkedCompanies.length !== 1 || employeeSurnameValue.length < 1 || employeeNameValue.length < 1 || employeePositionValue.length < 1}>
                                +
                            </button>
                        </form>
                        <button className={s.btn_del_company}
                                disabled={selectedEmployeesId.length < 1}
                                onClick={() => {
                                    props.delEmployee(props.checkedEmployees, selectedEmployeesId)
                                }}>
                            -
                        </button>
                    </div>
                </div>
            </div>
        )
    }
;

export default EmployeesTable;