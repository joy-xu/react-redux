import React, {Component} from 'react';

import {connect} from 'react-redux';


class Summary extends Component {

    render() {

        const {sum} = this.props;

        return (
            <div>Total Count: {sum}</div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    let sum = 0;
    for (const key in state) {
        if (state.hasOwnProperty(key)) {
            sum += state[key];
        }
    }

    return {
        sum: sum
    }
}

function mapDispatchToProps(dispatch, ownProps) {

}

let SummaryContainer = connect(mapStateToProps, mapDispatchToProps)(Summary);

export default SummaryContainer;