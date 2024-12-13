import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import socketClient from "socket.io-client";


export default function MarkdownEditor() {

    const socket = socketClient("http://localhost:1080/");
    const [markdownInput, setMarkdownInput] = useState('');
    const [input, setInput] = useState("");


    useEffect(() => {
        // Handle incoming message from server
        socket.on('message', (message) => {
            console.log(`Received message: ${message}`);
            //   setInput(message);
            setMarkdownInput(message)
        });
    },[socket]);

    function debounce(func, delay) {
        let timerId;
        return function(...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }


    
    const handleSearch = debounce((value) => {
        console.log('Performing search for:', value);
                socket.emit('message', value)
    }, 800); // Debounce delay of 500ms

    const handleChange = (event) => {
        setInput(event.target.value);
        handleSearch(event.target.value); // This will be debounced
    };


    console.log("input",input)
        return (
        <div className="App">
            <div className="wrapper">
                <div className="heading">
                    MARKDOWN
                </div>
                <textarea
                    autoFocus
                    className="textarea"
                    // value={markdownInput}
                    onChange={handleChange}
                />
            </div>
            <div className="wrapper preview">
                <div className="heading">
                    PREVIEW
                </div>
                <ReactMarkdown children={markdownInput} components={{
                    code: MarkComponent,
                }} />
            </div>
        </div>
    );
}

const MarkComponent = ({ value }) => {
    return (
        { value }
    );
}