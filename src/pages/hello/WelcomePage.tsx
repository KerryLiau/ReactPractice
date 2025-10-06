import React from "react";
import data from "../../static/Data.json"

type WelcomePageProps = Record<string, never>;
type WelcomePageState = Record<string, never>;

class WelcomePage extends React.Component<WelcomePageProps, WelcomePageState> {
    render() {
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