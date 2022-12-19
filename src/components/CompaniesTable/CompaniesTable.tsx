// @ts-ignore
import s from '../Tables.module.css';
import React, {useEffect, useState} from 'react';
import {PropsCompaniesTableType} from "../Types";

const CompaniesTable = (props: PropsCompaniesTableType) => {
    const
        [companyNameValue, setCompanyNameValue] = useState(''),
        [companyAddressValue, setCompanyAddressValue] = useState('');

    const
        onChangeSelectionCompany = (companyId: number): void => {
            props.toggleIsCheckedCompany(companyId);
            props.resetIsCheckedAllEmployees(companyId);
        },
        submitAddCompanyForm = (event: React.FormEvent) => {
            props.addCompany(companyNameValue, companyAddressValue);
            setCompanyNameValue('');
            setCompanyAddressValue('');
            event.preventDefault();
        };

    const companiesList = props.companies.map(company => {
            return (
                <tr className={`${company.isChecked ? s.selected : ''}`} key={`${company.id}${company.companyName}`}>
                    <td className={`${s.cell} ${s.cell_small}`}><input type="checkbox" checked={company.isChecked}
                                                                       onChange={() => onChangeSelectionCompany(company.id)}/></td>
                    <td className={`${s.cell} ${s.cell_big}`}>{company.companyName}</td>
                    <td className={`${s.cell} ${s.cell_big}`}>{company.employees.length}</td>
                    <td className={`${s.cell} ${s.cell_big}`}>{company.address}</td>
                </tr>
            )
        }
    );

    useEffect(() => {
        props.checkIsCheckedAllCompanies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checkedCompanies]);

    return (
        <div>
            <table className={s.table}>
                <thead>
                <tr>
                    <th className={`${s.cell} ${s.cell_small}`}><input title={'Выделить всё'} type="checkbox"
                                                                       checked={props.isCheckedAllCompanies}
                                                                       onChange={() => props.toggleIsCheckedAllCompanies()}/></th>
                    <th className={`${s.cell} ${s.cell_big}`}>Название компании</th>
                    <th className={`${s.cell} ${s.cell_big}`}>Кол-во сотрудников</th>
                    <th className={`${s.cell} ${s.cell_big}`}>Адрес</th>
                </tr>
                </thead>
            </table>
            <div className={`${s.wrapper_body} ${s.wrapper_body_first}`}>
                <table className={s.table}>
                    <tbody>
                    {companiesList}
                    </tbody>
                </table>
            </div>
            <br/>
            <ul>
                <li>+ Для добавления компании/сотрудника введите не менее 1 символа<br/>в предложенных полях</li>
                <br/>
                <li>- Для удаления компании/сотрудника выберете одну или более компанию/сотрудника</li>
                <br/>
                <li>+ Для добавления сотрудника выберете одну компанию<br/>в которую его следует добавить</li>
            </ul>
            <br/>
            <div className={s.form_wrapper}>
                <form onSubmit={submitAddCompanyForm} className={s.form}>
                    <input value={companyNameValue} onChange={event => setCompanyNameValue(event.target.value)} name={'companyName'} type="text"
                           placeholder={'Название компании'}/>
                    <input value={companyAddressValue} onChange={event => setCompanyAddressValue(event.target.value)} name={'companyAddress'}
                           type="text" placeholder={'Адрес компании'}/>
                    <button className={s.btn_add_company} type="submit"
                            disabled={companyNameValue.length < 1 || companyAddressValue.length < 1}>+
                    </button>
                </form>
                <button className={s.btn_del_company}
                        disabled={props.checkedCompanies.length < 1}
                        onClick={() => {
                            props.delCompany(props.checkedCompanies)
                        }}>-
                </button>
            </div>
        </div>
    )
};

export default CompaniesTable;