import React from 'react';
export const Total = ({ parts }) => {
    return (
        <p>
            Total of {parts.reduce((part, next) => {
                return ({ exercises: part.exercises + next.exercises });
            }).exercises} exercises
        </p>
    );
};