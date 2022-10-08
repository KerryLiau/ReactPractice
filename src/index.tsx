import React, {ReactNode} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavigateBar from "./pages/navigate_bar/NavigateBar";
import PageInfos from "./static/PageInfoList";
import ViewTemplate from "./template/common/ViewTemplate";
import "./index.css"

// the router document: https://www.w3schools.com/react/react_router.asp
class App extends React.Component<any, any> {
    render(): ReactNode {
        return (
            <BrowserRouter>
                <Routes>
                    {this.createRouteList()}
                    <Route path={"navigate"} element={<NavigateBar/>}/>
                </Routes>
            </BrowserRouter>
        );
    }

    private createRouteList(): ReactNode[] {
        let ret = [];
        for (let i in PageInfos) {
            let route = PageInfos[i];
            ret.push(<Route key={i} path={route.Url} element={<ViewTemplate body = {route.Element}/>}/>);
        }
        return ret;
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
