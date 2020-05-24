import React from 'react';
export const Total = ({ parts }) => {
    return (
        <b>
            Total of {parts.reduce((part, next) => {
                return ({ exercises: part.exercises + next.exercises });
            }).exercises} exercises
        </b>
    );
};