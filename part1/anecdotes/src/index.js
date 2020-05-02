import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ANECDOTES_TEXT = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const anecdotes = ANECDOTES_TEXT.map((anecdoteText, index) => {
    return { text: anecdoteText, votes: 0, id: index };
});

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [anecdotes, setAnecdotes] = useState(props.anecdotes);
    const selectedAnecdote = anecdotes[selected];
    const anecdotesWithMostVotes = getAnecdotesWithMostVotes(anecdotes);
    return (
        <>
            <h1>Anecdote of the day</h1>
            <AnecdoteDisplay anecdote={selectedAnecdote} />
            <button
                onClick={() => {
                    ++selectedAnecdote.votes;
                    setAnecdotes(Object.assign([], anecdotes));
                }}
            >
                Vote
            </button>
            <NextButton onNext={setSelected} totalCount={anecdotes.length} text="Next Anecdote" />
            <br />
            <TopAnecdotesHandler title="Anecdote(s) with most votes" anecdotes={anecdotesWithMostVotes} />
        </>
    );
};

const AnecdoteDisplay = ({ anecdote }) => {
    return (
        <>
            <div>{anecdote.text}</div>
            <div>has {anecdote.votes} vote(s)</div>
        </>
    );
};

const TopAnecdotesHandler = ({ anecdotes, text: title }) => {
    const anecdoteTemplates = anecdotes.map((anecdote) => <div key={anecdote.id}>{anecdote.text}</div>);
    if (anecdotes.length) {
        return (
            <>
                <h1>{title}</h1>
                {anecdoteTemplates}
                <div>has {anecdotes[0].votes} vote(s)</div>
            </>
        );
    } else {
        return (
            <>
                <h1>{title}</h1>
                <div>No anecdotes available...</div>
            </>
        );
    }
};

const NextButton = ({ text, onNext, totalCount }) => {
    return <button onClick={() => onNext(randomNumberGenerator(totalCount))}>{text}</button>;
};

//#region Util functions
function randomNumberGenerator(maxCount) {
    return Math.floor(Math.random() * maxCount);
}

function getAnecdotesWithMostVotes(anecdotes) {
    let anecsHavingMostVotes = [anecdotes[0]];
    for (let i = 1; i < anecdotes.length; i++) {
        const eachAnec = anecdotes[i];
        if (eachAnec.votes > anecsHavingMostVotes[0].votes) {
            anecsHavingMostVotes = [eachAnec];
        } else if (eachAnec.votes === anecsHavingMostVotes[0].votes) {
            anecsHavingMostVotes.push(eachAnec);
        }
    }
    if (anecsHavingMostVotes[0].votes === 0) {
        return [];
    }
    return anecsHavingMostVotes;
}
//#endregion Util functions

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
