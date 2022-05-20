import React, { Component } from 'react';

export default class ClassComponent extends Component {
    constructor(props) {
        super(props);
        console.log('constructor');
        this.state = { date: new Date() };
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        console.log('didMount');
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        console.log('willUnmount');
        clearInterval(this.timerID);
    }

    componentDidUpdate() {
        console.log('update');
    }

    tick() {
        //console.log('tick');
        this.setState({ date: new Date() });
    }

    handleClick = () => {
        alert(this.state.date);
    };
    render() {
        console.log('render');
        return (
            <div>
                <h1 onClick={this.handleClick}>Hello, World</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}
