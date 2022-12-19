import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import EmployeesTable from "./EmployeesTable";
import {getCheckedCompanies, getCheckedEmployees} from "../../redux/reducers/selectors";
import {
    addEmployee,
    delEmployee,
    resetIsCheckedAllEmployees,
    toggleIsCheckedAllEmployees,
    toggleIsCheckedEmployee
} from "../../redux/reducers/mainReducer";

const
    mapStateToProps = (state: StateType) => {
        return {
            checkedCompanies: getCheckedCompanies(state),
            checkedEmployees: getCheckedEmployees(state)
        };
    },
    mapDispatchToProps = {
        resetIsCheckedAllEmployees,
        toggleIsCheckedAllEmployees,
        toggleIsCheckedEmployee,
        addEmployee,
        delEmployee
    };

const EmployeesTableContainer = connect(mapStateToProps, mapDispatchToProps)(EmployeesTable);

export default EmployeesTableContainer;
