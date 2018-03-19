import React, {Component} from 'react';

import PropTypes from 'prop-types';

class SummaryContainer extends Component {

    constructor(props, context) {
        super(props, context);

        this.onUpdate = this.onUpdate.bind(this);

        this.state = this.getOwnState();
    }

    getOwnState() {
        const state = this.context.store.getState();

        let sum = 0;
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                sum += state[key];
            }
        }

        return {
            sum: sum
        };
    }

    componentDidMount() {
        this.context.store.subscribe(this.onUpdate);
    }

    componentWillUnmount() {
        this.context.store.unsubscribe(this.onUpdate);
    }

    onUpdate() {
        this.setState(this.getOwnState());
    }

    render() {
        return <Summary sum={this.state.sum}/>
    }
}

SummaryContainer.contextTypes = {
    store: PropTypes.object
};


class Summary extends Component {

    render() {

        const {sum} = this.props;

        return (
            <div>Total Count: {sum}</div>
        );
    }
}

export default SummaryContainer;