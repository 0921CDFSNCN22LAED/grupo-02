export default function TableHeaders(props) {
    return (
        <div>
            {props.dataKeys ? (
                props.dataKeys.map((dataKey, i) => {
                    return (
                        <button
                            className="btn btn-secondary m-1"
                            key={'button' + dataKey + i}
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
