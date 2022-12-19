import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import CompaniesTable from "./CompaniesTable";
import {getCheckedCompanies, getCompanies, getIsCheckedAllCompanies} from "../../redux/reducers/selectors";
import {
    addCompany,
    checkIsCheckedAllCompanies,
    delCompany,
    resetIsCheckedAllEmployees,
    toggleIsCheckedAllCompanies,
    toggleIsCheckedCompany
} from "../../redux/reducers/mainReducer";

const
    mapStateToProps = (state: StateType) => {
        return {
            isCheckedAllCompanies: getIsCheckedAllCompanies(state),
            companies: getCompanies(state),
            checkedCompanies: getCheckedCompanies(state)
        };
    },
    mapDispatchToProps = {
        toggleIsCheckedAllCompanies,
        toggleIsCheckedCompany,
        checkIsCheckedAllCompanies,
        addCompany,
        delCompany,
        resetIsCheckedAllEmployees
    };

const CompaniesTableContainer = connect(mapStateToProps, mapDispatchToProps)(CompaniesTable);

export default CompaniesTableContainer;
