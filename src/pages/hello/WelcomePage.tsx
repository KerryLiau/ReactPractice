import React, {ReactElement} from "react";
import data from "../../static/Data.json"
class WelcomePage extends React.Component {
    render(): ReactElement {
        return (
            <div>
                <h1>{data.HelloPage}</h1>
                <button type={"button"} onClick={this.goToGamePage}>Go to play tictac</button>
            </div>
        );
    }

    goToGamePage(): void {
        let currLocation = window.location.href;
        console.log(data.HelloPage);
        window.location.href = currLocation + "tictac";
    }
}

export default WelcomePage;