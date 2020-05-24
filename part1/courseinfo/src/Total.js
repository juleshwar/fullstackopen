import React from 'react';
export const Total = (props) => {
    return (
        <p>
            Number of exercises {props.parts
                .map((part) => part.exercises)
                .reduce((exercise, total) => exercise + total)}
        </p>
    );
};