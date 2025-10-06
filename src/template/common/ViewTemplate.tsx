import React from "react";
import NavigateBar from "../../pages/navigate_bar/NavigateBar";
import templateCss from "./ViewTemplate.module.css";

type ViewTemplateProps = {
    body: any
}

class ViewTemplate extends React.Component<ViewTemplateProps, any> {
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