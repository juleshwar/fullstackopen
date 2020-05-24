import React from 'react';
export const Total = (props) => {
    return (
        <p>
            Total of {props.parts
                .map((part) => part.exercises)
                .reduce((exercise, total) => exercise + total)} exercises 
        </p>
    );
};