import React from 'react';

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
export default function Composition() {
    return <div>
        <Welcome name={"nananana"}/>
        <Welcome name={"bbbbbbbb"}/>
        <Welcome name={"cfdfccccccc"}/>
        <Welcome name={"dddddddd"}/>
    </div>;
}
