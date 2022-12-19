// @ts-ignore
import s from './app.module.css';
import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import CompaniesTableContainer from "./components/CompaniesTable/CompaniesTableContainer";
import EmployeesTableContainer from "./components/EmployeesTable/EmployeesTableContainer";

function App() {
    return (
        <Provider store={store}>
            <div className={s.wrapper}>
                <CompaniesTableContainer/>
                <EmployeesTableContainer/>
            </div>
        </Provider>
    );
}

export default App;
