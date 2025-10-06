import React from "react";
import NavigateBar from "../../pages/navigate_bar/NavigateBar";
import templateCss from "./ViewTemplate.module.css";

type ViewTemplateProps = {
    body: React.ComponentType<any>
}

type ViewTemplateState = Record<string, never>;

class ViewTemplate extends React.Component<ViewTemplateProps, ViewTemplateState> {
    render() {
        return (
            <div>
                <div className={templateCss.template_head}>
                    <NavigateBar/>
                </div>
                <div className={templateCss.template_body}>
                    <this.props.body/>
                </div>
            </div>
        );
    }
}

export default ViewTemplate;