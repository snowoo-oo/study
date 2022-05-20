import React from 'react';

export default function List() {
    // const numbers = [1, 2, 3, 4, 5];
    // return (
    //     <ul>
    //         {numbers.map((item) => (
    //             <li key={item.toString()}>{item}</li>
    //         ))}
    //     </ul>
    // );
    const todos = [
        { id: 1, text: 'First' },
        { id: 2, text: 'Second' },
        { id: 3, text: 'Third' },
        { id: 4, text: 'Fourth' },
        { id: 5, text: 'Fifith' },
    ];

    const Item = (props) => {
        return <li>{props.text}</li>;
    };

    const todoList = todos.map((todo) => <Item key={todo.id} {...todo} />);

    return <>{todoList}</>;
}
