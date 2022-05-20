import React, { useRef } from 'react';

export default function UncontrolledComponent() {
    const fileInputRef = useRef(null);
    function handleSubmit(event) {
        event.preventDefault();
        alert(`Selected files : ${fileInputRef.current.files[0].name}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Upload files:
                <input type="file" ref={fileInputRef} />
            </label>
            <button type="submit">제출</button>
        </form>
    );
}
