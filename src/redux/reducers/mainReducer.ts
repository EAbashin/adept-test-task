import {CompaniesType, CompanyType, EmployeeType, InitialStateType} from "../../components/Types";
import {initialState} from "./initialState";

const
    TOGGLE_IS_CHECKED_ALL_COMPANIES = 'main/TOGGLE_IS_CHECKED_ALL_COMPANIES',
    TOGGLE_IS_CHECKED_COMPANY = 'main/TOGGLE_IS_CHECKED_COMPANY',
    CHECK_IS_CHECKED_ALL_COMPANIES = 'main/CHECK_IS_CHECKED_ALL_COMPANIES',
    ADD_COMPANY = 'main/ADD_COMPANY',
    DEL_COMPANY = 'main/DEL_COMPANY';

const
    RESET_IS_CHECKED_ALL_EMPLOYEES = 'main/RESET_IS_CHECKED_ALL_EMPLOYEES',
    TOGGLE_IS_CHECKED_ALL_EMPLOYEES = 'main/TOGGLE_IS_CHECKED_ALL_EMPLOYEES',
    TOGGLE_IS_CHECKED_EMPLOYEE = 'main/TOGGLE_IS_CHECKED_EMPLOYEE',
    ADD_EMPLOYEE = 'main/ADD_EMPLOYEE',
    DEL_EMPLOYEE = 'main/DEL_EMPLOYEE';

type ActionType = {
    type: string,
    companyId: number,
    employeeId: number,
    companyName: string,
    companyAddress: string,
    checkedCompanies: CompaniesType,
    isCheckedAllEmployees: boolean,
    employeeSurnameValue: string,
    employeeNameValue: string,
    employeePositionValue: string,
    selectedEmployeesId: Array<number>
};

const mainReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case TOGGLE_IS_CHECKED_ALL_COMPANIES: {
            return {
                ...state,
                isCheckedAllCompanies: !state.isCheckedAllCompanies,
                companies: state.companies.map(company => {
                    return {...company, isChecked: !state.isCheckedAllCompanies};
                })
            };
        }
        case TOGGLE_IS_CHECKED_COMPANY: {
            return {
                ...state,
                companies: state.companies.map(company => {
                    if (company.id === action.companyId) {
                        return {...company, isChecked: !company.isChecked};
                    } else {
                        return {...company};
                    }
                })
            };
        }
        case CHECK_IS_CHECKED_ALL_COMPANIES: {
            const isFalseCondition = state.companies.some(item => !item.isChecked);
            if (isFalseCondition) {
                return {
                    ...state,
                    isCheckedAllCompanies: false
                };
            } else {
                return {
                    ...state,
                    isCheckedAllCompanies: true
                };
            }
        }
        case ADD_COMPANY: {
            let lastCompanyId = 1;
            if (state.companies.length !== 0) {
                lastCompanyId = Math.max(...state.companies.reduce((companiesId, company) => [...companiesId, company.id], []));
            }
            const newCompany: CompanyType = {
                id: lastCompanyId + 1,
                isChecked: false,
                companyName: action.companyName,
                address: action.companyAddress,
                employees: []
            };
            return {
                ...state,
                companies: [...state.companies, newCompany]
            };
        }
        case DEL_COMPANY: {
            const
                allCompanies = state.companies,
                onlyCheckedCompanies = action.checkedCompanies,
                finishCompaniesList =
                    allCompanies.filter(company => !onlyCheckedCompanies.find(checkedCompany => (company.id === checkedCompany.id)));
            return {
                ...state,
                companies: finishCompaniesList
            };
        }
        case RESET_IS_CHECKED_ALL_EMPLOYEES: {
            return {
                ...state,
                companies: state.companies.map(company => {
                    if (company.id === action.companyId && !company.isChecked) {
                        const employees = company.employees.map(employee => {
                            return {...employee, isChecked: false};
                        });
                        return {...company, employees: employees}
                    } else {
                        return company;
                    }
                })
            }
        }

        case TOGGLE_IS_CHECKED_ALL_EMPLOYEES: {
            const checkedCompaniesId = action.checkedCompanies.reduce((companiesId, company) => [...companiesId, company.id], [])
            return {
                ...state,
                companies: state.companies.map(company => {
                    if (checkedCompaniesId.includes(company.id)) {
                        const employees = company.employees.map(employee => {
                            return {...employee, isChecked: action.isCheckedAllEmployees}
                        })
                        return {...company, employees: employees};
                    } else return company;
                })
            }
        }
        case TOGGLE_IS_CHECKED_EMPLOYEE: {
            return {
                ...state,
                companies: state.companies.map(company => {
                    return {
                        ...company,
                        employees: company.employees.map(employee => {
                            if (employee.id === action.employeeId) {
                                return {...employee, isChecked: !employee.isChecked};
                            } else {
                                return employee;
                            }
                        })
                    }
                })
            };
        }
        case ADD_EMPLOYEE: {
            let lastEmployeesId = 1;
            if (state.companies.length !== 0) {
                const employeesId = (state.companies.map(company => company.employees).map(employees => employees.map(employee => employee.id)));
                lastEmployeesId = Math.max(...employeesId.map(arr => Math.max(...arr)));
            }
            const newEmployee: EmployeeType = {
                id: lastEmployeesId + 1,
                isChecked: false,
                surname: action.employeeSurnameValue,
                name: action.employeeNameValue,
                position: action.employeePositionValue,
            };
            const checkedCompanyId = action.checkedCompanies[0].id;

            return {
                ...state,
                companies: state.companies.map(company => {
                    if (company.id === checkedCompanyId) {
                        return {
                            ...company,
                            employees: [...company.employees, newEmployee]
                        }
                    } else {
                        return company;
                    }
                })
            };
        }
        case DEL_EMPLOYEE: {
            return {
                ...state,
                companies: state.companies.map(company => {
                    return {
                        ...company,
                        employees: [
                            ...company.employees.filter(employee => !action.selectedEmployeesId.includes(employee.id))]
                    }
                })
            };
        }
        default: {
            return state;
        }
    }
};

export const
    toggleIsCheckedAllCompanies = () => ({type: TOGGLE_IS_CHECKED_ALL_COMPANIES}),
    toggleIsCheckedCompany = (companyId: number) => ({type: TOGGLE_IS_CHECKED_COMPANY, companyId}),
    checkIsCheckedAllCompanies = () => ({type: CHECK_IS_CHECKED_ALL_COMPANIES}),
    addCompany = (companyName: string, companyAddress: string) => ({type: ADD_COMPANY, companyName, companyAddress}),
    delCompany = (checkedCompanies: CompaniesType) => ({type: DEL_COMPANY, checkedCompanies}),
    resetIsCheckedAllEmployees = (companyId: number) => ({type: RESET_IS_CHECKED_ALL_EMPLOYEES, companyId});
export const
    toggleIsCheckedAllEmployees = (checkedCompanies: CompaniesType, isCheckedAllEmployees: boolean) => ({
        type: TOGGLE_IS_CHECKED_ALL_EMPLOYEES,
        checkedCompanies,
        isCheckedAllEmployees
    }),
    toggleIsCheckedEmployee = (employeeId: number) => ({type: TOGGLE_IS_CHECKED_EMPLOYEE, employeeId}),
    addEmployee = (employeeSurnameValue: string, employeeNameValue: string, employeePositionValue: string, checkedCompanies: CompaniesType) => ({
        type: ADD_EMPLOYEE,
        employeeSurnameValue,
        employeeNameValue,
        employeePositionValue,
        checkedCompanies
    }),
    delEmployee = (checkedEmployees: Array<EmployeeType>, selectedEmployeesId: Array<number>) => ({
        type: DEL_EMPLOYEE,
        selectedEmployeesId
    });

export default mainReducer;
