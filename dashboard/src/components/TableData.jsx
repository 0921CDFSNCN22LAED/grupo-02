import TableRow from './TableRow';

export default function TableData(props) {
    return (
        <div className="px-4">
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        {props.headers ? (
                            props.headers.map((header, i) => {
                                return (
                                    <th scope="col" key={header + i}>
                                        {header}
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
                                <TableRow data={data} cellNumber={i} key={i} />
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
