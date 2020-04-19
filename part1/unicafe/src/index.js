import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ values }) => {
    const { good, bad, neutral } = values;
    return [
        <h1>Statistics</h1>,
        <div>
            <div>Good: {good}</div>
            <div>Neutral: {neutral}</div>
            <div>Bad: {bad}</div>
            <div>Total: {good + neutral + bad}</div>
            <RatingAverage text="Average" values={{ good, neutral, bad }} />
            <PositiveRatingPercentage
                text="Positive Percentage"
                good={good}
                total={good + neutral + bad}
            />
        </div>,
    ];
};

const Button = ({ buttonText, handleClick }) => (
    <button onClick={handleClick}>{buttonText}</button>
);
const RatingAverage = ({ text, values }) => {
    const { good, neutral, bad } = values;
    const total = good + neutral + bad;
    return (
        <div>
            {text}: {!total ? '-' : good - bad / total}
        </div>
    );
};
const PositiveRatingPercentage = ({ text, good, total }) => (
    <div>
        {text}: {!total ? '-' : `${(good * 100) / total} %`}
    </div>
);
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
        <Statistics values={{ good, bad, neutral }} />,
    ];
};

ReactDOM.render(<App />, document.getElementById('root'));
