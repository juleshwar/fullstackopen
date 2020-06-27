import React from 'react';

export const Notification = ({ config }) => {
    const { type, message } = config;
    if (!message) return null;
    return (
        <p className={`notification ${type}`}>{message}</p>
    )
}