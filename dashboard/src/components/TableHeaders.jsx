export default function TableHeaders(props) {
    function addHeader(dataKey) {
        if (props.headers.includes(dataKey)) {
            let newDataKeys = props.headers.filter(
                (header) => header !== dataKey
            );
            props.setHeaders(newDataKeys);
        } else {
            props.setHeaders([...props.headers, dataKey]);
        }
    }

    return (
        <div>
            <h2 className="tableTitle m-3">
                Seleccioná los campos que quieras visualizar
            </h2>
            {props.dataKeys ? (
                props.dataKeys.map((dataKey, i) => {
                    return (
                        <button
                            className={`btn m-1 btn-${
                                props.headers.includes(dataKey)
                                    ? 'danger'
                                    : 'secondary'
                            }`}
                            key={'button' + dataKey + i}
                            onClick={() => addHeader(dataKey)}
                        >
                            {dataKey}
                        </button>
                    );
                })
            ) : (
                <div>cargando</div>
            )}
        </div>
    );
}
