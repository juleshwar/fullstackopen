import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ buttonText, handleClick }) => {
    return <button onClick={handleClick}>{buttonText}</button>;
};
const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return [
        <h1>Give Feedback</h1>,
        <div>
            <Button buttonText="Good" handleClick={() => setGood(good + 1)} />
            <Button
                buttonText="Neutral"
                handleClick={() => setNeutral(neutral + 1)}
            />
            <Button buttonText="Bad" handleClick={() => setBad(bad + 1)} />
        </div>,
        <h1>Statistics</h1>,
        <div>
            <div>Good: {good}</div>
            <div>Neutral: {neutral}</div>
            <div>Bad: {bad}</div>
        </div>,
    ];
};

ReactDOM.render(<App />, document.getElementById('root'));
