import React from "react";

type TestProps = Record<string, never>;
type TestState = Record<string, never>;

class Test extends React.Component<TestProps, TestState> {
    render() {
        return (
            <h1>This is test</h1>
        );
    }
}

export default Test;