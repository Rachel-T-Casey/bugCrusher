import React from "react";
import validateAuthentication from "../authentication/util/validateAuthentication";
import { Navigate } from "react-router-dom";
import DashboardMenu  from "../navigation/DashboardMenu";
import Feed from "../views/Feed";
import Logout from "../authentication/Logout";
import "../../styles/Dashboard.scss";

export default class Dashboard extends React.Component {
    constructor(props : any) {
        super(props);

    }
    componentDidMount(): void {
        validateAuthentication().then(res => {
            if(res === false) {
                <Navigate to = "/login"/>;
            }
            else {
                console.log("User is authenticated");
            }
        })
    }
    render() {
        return (
            <div className = "Dashboard">
                <DashboardMenu/>
                <Feed/>
                <Logout/>
            </div>
        )
    }
}