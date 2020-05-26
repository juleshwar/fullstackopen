import React from 'react';
export const Total = ({ parts }) => {
    return (
        <b>
            Total of {parts.reduce((acc, { exercises }) => {
                return (acc + exercises);
            }, 0)} exercises
        </b>
    );
};