import { useState } from 'react';

export default function TableRow(props) {
    function renderFromProps() {
        return Object.keys(props).map((propKey) => props[propKey]);
    }

    return (
        <tr>
            {renderFromProps().map((cell, i) => {
                return <td key={'' + props.cellNumber + i}>{cell}</td>;
            })}
        </tr>
    );
}
