import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <div>
            <Part
                part={props.contentArray[0].part}
                exercise={props.contentArray[0].exercise}
            />
            <Part
                part={props.contentArray[1].part}
                exercise={props.contentArray[1].exercise}
            />
            <Part
                part={props.contentArray[2].part}
                exercise={props.contentArray[2].exercise}
            />
        </div>
    );
};
const Total = (props) => {
    return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
    const course = 'Half Stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10,
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    };
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    };

    return (
        <div>
            <Header course={course} />
            <Content
                contentArray={[
                    { part: part1.name, exercise: part1.exercises },
                    { part: part2.name, exercise: part2.exercises },
                    { part: part3.name, exercise: part3.exercises },
                ]}
            />
            <Total
                totalExercises={
                    part1.exercises + part2.exercises + part3.exercises
                }
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
