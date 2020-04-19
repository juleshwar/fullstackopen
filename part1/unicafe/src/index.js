import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);
const Statistics = ({ values }) => {
    const { good, bad, neutral } = values;
    const total = good + neutral + bad;
    const statisticsDiv = !total ? (
        <div>No stats available</div>
    ) : (
        <table>
            <tbody>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
                <Statistic text="Total" value={total} />
                <RatingAverage text="Average" values={{ good, neutral, bad }} />
                <PositiveRatingPercentage
                    text="Positive Percentage"
                    good={good}
                    total={total}
                />
            </tbody>
        </table>
    );
    return (
        <>
            <h1>Statistics</h1>
            {statisticsDiv}
        </>
    );
};

const Button = ({ buttonText, handleClick }) => (
    <button onClick={handleClick}>{buttonText}</button>
);
const RatingAverage = ({ text, values }) => {
    const { good, neutral, bad } = values;
    const total = good + neutral + bad;
    return (
        <tr>
            <td>{text}</td>
            <td>{!total ? '-' : (good - bad) / total}</td>
        </tr>
    );
};
const PositiveRatingPercentage = ({ text, good, total }) => (
    <tr>
        <td>{text}</td>
        <td>{!total ? '-' : `${(good * 100) / total} %`}</td>
    </tr>
);
const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <>
            <h1 key="h1">Give Feedback</h1>
            <div key="div">
                <Button
                    buttonText="Good"
                    handleClick={() => setGood(good + 1)}
                />
                <Button
                    buttonText="Neutral"
                    handleClick={() => setNeutral(neutral + 1)}
                />
                <Button buttonText="Bad" handleClick={() => setBad(bad + 1)} />
            </div>
            <Statistics key="Statistics" values={{ good, bad, neutral }} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
