import React, { useState } from 'react';

export default function ControlledComponent() {
    const [name, setName] = useState('');
    const [flavor, setFlavor] = useState('');
    const [essay, setEssay] = useState(
        'please write an essay about your favorite '
    );

    function handleChange(event) {
        const name = event.target.name;
        if(name==='name')
            setName(event.target.value);
        if(name==='flavor')
            setFlavor(event.target.value);
        if(name==='essay')
            setEssay(event.target.value);
    }
    // function handleFlavorChange(event) {
    //     setFlavor(event.target.value);
    // }

    // function handleEssayChange(event) {
    //     setEssay(event.target.value);
    // }

    function handleSubmit(event) {
        alert(`name: ${name}\nessay: ${essay}\nflavor: ${flavor}`);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input name="name" type="text" value={name} onChange={handleChange} />
            </label>
            <br />
            <br />
            <label>
                Essay:
                <textarea name="essay" value={essay} onChange={handleChange} />
            </label>
            <br /><br />
            <label>
                Flavor:
                <select name="flavor" value="{flavor}" onChange={handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}
