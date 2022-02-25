export default function TableRow(props) {
    function renderFromProps() {
        return Object.keys(props.data).map((propKey) => props.data[propKey]);
    }

    return (
        <tr>
            {renderFromProps().map((cell, i) => {
                return <td key={'' + props.cellNumber + i}>{cell}</td>;
            })}
        </tr>
    );
}
