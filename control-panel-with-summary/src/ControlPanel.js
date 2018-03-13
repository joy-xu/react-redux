import React, {Component} from 'react';

import Counter from './Counter';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.onCounterUpdate = this.onCounterUpdate.bind(this);

        this.initValues = [0, 10, 20];
        const initSum = this.initValues.reduce((a, b) => a + b, 0);

        this.state = {
            sum: initSum
        }
    }

    onCounterUpdate(newValue, previousValue) {
        const valueChange = newValue - previousValue;

        this.setState({
            sum: this.state.sum + valueChange
        });
    }

    render() {

        console.log("enter ControlPanel render");

        return (
            <div>
                <Counter caption="First" onUpdate={this.onCounterUpdate}/>
                <Counter caption="Second" onUpdate={this.onCounterUpdate} initialValue={this.initValues[1]}/>
                <Counter caption="Third" onUpdate={this.onCounterUpdate} initialValue={this.initValues[2]}/>
                <div>Total count: {this.state.sum}</div>
            </div>
        )
    }
}

export default ControlPanel;