import {resetIsCheckedAllEmployees} from "../redux/reducers/mainReducer";

export type EmployeeType = {
    id: number,
    isChecked: boolean,
    surname: string,
    name: string,
    position: string
};
export type CompanyType = {
    id: number,
    isChecked: boolean,
    companyName: string,
    address: string,
    employees: Array<EmployeeType> | []
};
export type CompaniesType = Array<CompanyType>;
export type InitialStateType = {
    isCheckedAllEmployees: boolean,
    isCheckedAllCompanies: boolean,
    companies: CompaniesType
};
export type PropsCompaniesTableType = {
    isCheckedAllCompanies: boolean,
    companies: CompaniesType,
    checkedCompanies: CompaniesType,
    toggleIsCheckedAllCompanies: () => void,
    toggleIsCheckedCompany: (companyId: number) => void,
    checkIsCheckedAllCompanies: () => void,
    addCompany: (companyName: string, companyAddress: string) => void,
    delCompany: (checkedCompanies: CompaniesType) => void,
    resetIsCheckedAllEmployees: (companyId: number) => void
};
export type PropsEmployeesTableType = {
    // isCheckedAllEmployees: boolean,
    // companies: CompaniesType,
    checkedCompanies: CompaniesType,
    checkedEmployees: Array<EmployeeType>,
    toggleIsCheckedAllEmployees: (checkedCompanies: CompaniesType, isCheckedAllEmployees: boolean) => void,
    toggleIsCheckedEmployee: (employeeId: number) => void
    addEmployee: (employeeSurnameValue: string, employeeNameValue: string, employeePositionValue: string, checkedCompanies: CompaniesType) => void
    delEmployee: (checkedEmployees: Array<EmployeeType>, selectedEmployeesId: Array<number>) => void
};
export type ActionType = {
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
