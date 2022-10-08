import React, {ReactNode} from "react";
import "./NavigateBar.css"
import PageInfos from "../../static/PageInfoList"

class NavigateBar extends React.Component<any, any> {
    render() {
        return (
            <div className={"navigate"}>
                <ul>{this.createList()}</ul>
            </div>
        );
    }

    private createList(): ReactNode[] {
        let ret = [];
        for (let i in PageInfos) {
            let linkInfo = PageInfos[i];
            ret.push(<li key={i}><a href={linkInfo.Url}>{linkInfo.Name}</a></li>);
        }
        return ret;
    }
}

export default NavigateBar;