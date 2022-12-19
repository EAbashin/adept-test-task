import {createSelector} from "reselect";
import {StateType} from "../redux-store";

export const
    getIsCheckedAllCompanies = (state: StateType) => {
        return state.main.isCheckedAllCompanies;
    },
    getCompanies = (state: StateType) => {
        return state.main.companies;
    };

export const
    getCheckedCompanies = createSelector(getCompanies, (companies) => {
        return companies.filter(company => company.isChecked === true);
    }),
    getCheckedEmployees = createSelector(getCheckedCompanies, (checkedCompanies) => {
        return checkedCompanies.reduce((checkedEmployees, company) => [...checkedEmployees, ...company.employees], []);
    });
