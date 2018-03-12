import React, {Component} from 'react';

import Counter from './Counter';

class ControlPanel extends Component {
    render() {

        console.log("enter ControlPanel render");

        return (
            <div>
                <Counter caption="First"/>
                <Counter caption="Second" initialValue={10}/>
                <Counter caption="Third" initialValue={20}/>
                <button onClick={() => this.forceUpdate()}>
                    Click me to re-render!
                </button>
            </div>
        )
    }
}

export default ControlPanel;