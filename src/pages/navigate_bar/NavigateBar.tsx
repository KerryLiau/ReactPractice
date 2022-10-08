import React, {ReactElement} from "react";
import "./NavigateBar.module.css"
import PageInfos from "../../static/PageInfoList"
import NavCss from "./NavigateBar.module.css"

class NavigateBar extends React.Component<any, any> {
    render() {
        return (
            <div className={NavCss.navigate}>
                <ul className={NavCss.navList}>{this.createList()}</ul>
            </div>
        );
    }

    private createList(): ReactElement[] {
        let ret = [];
        for (let i in PageInfos) {
            let linkInfo = PageInfos[i];
            ret.push(
                <li key={i} className={NavCss.navListItem}>
                    <a className={NavCss.urlInfo} href={linkInfo.Url}>{linkInfo.Name}</a>
                </li>
            );
        }
        return ret;
    }
}

export default NavigateBar;