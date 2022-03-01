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
        <div className="col-12 col-md-2">
            <h4 className="side-headers-title p-2 ">
                Seleccioná los campos que quieras visualizar
            </h4>
            {props.dataKeys ? (
                props.dataKeys.map((dataKey, i) => {
                    return (
                        <button
                            className={`btn m-1 btn-${
                                props.headers.includes(dataKey)
                                    ? 'danger'
                                    : 'secondary'
                            } w-100`}
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
