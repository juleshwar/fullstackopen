import React from 'react';
import { Part } from './Part';
export const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    );
};