import TableRow from './TableRow';

export default function TableData(props) {
    return (
        <div className="px-4">
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        {props.dataKeys ? (
                            props.dataKeys.map((dataKey, i) => {
                                return (
                                    <th scope="col" key={dataKey + i}>
                                        {dataKey}
                                    </th>
                                );
                            })
                        ) : (
                            <th>cargando</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {props.data ? (
                        props.data.map((data, i) => {
                            return (
                                <TableRow {...data} cellNumber={i} key={i} />
                            );
                        })
                    ) : (
                        <tr>
                            <td>cargando</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
