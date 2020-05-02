import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [anecdotes, setAnecdotes] = useState(props.anecdotes);
    const selectedAnecdote = anecdotes[selected];
    return (
        <>
            <div>{selectedAnecdote.text}</div>
            <div>has {selectedAnecdote.votes} vote(s)</div>
            <button
                onClick={() => {
                    ++selectedAnecdote.votes;
                    setAnecdotes(Object.assign([], anecdotes));
                }}
            >
                Vote
            </button>
            <NextButton onNext={setSelected} totalCount={anecdotes.length} text="Next Anecdote" />
        </>
    );
};

const NextButton = ({ text, onNext, totalCount }) => {
    return <button onClick={() => onNext(randomNumberGenerator(totalCount))}>{text}</button>;
};

function randomNumberGenerator(maxCount) {
    return Math.floor(Math.random() * maxCount);
}

const ANECDOTES_TEXT = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const anecdotes = ANECDOTES_TEXT.map((anecdoteText) => {
    return { text: anecdoteText, votes: 0 };
});

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
