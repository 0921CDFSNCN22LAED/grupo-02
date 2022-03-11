import React, { useEffect, useState } from 'react';
import TableData from './TableData';
import TableHeaders from './TableHeaders';
import './table.css';

function Table(props) {
    const [data, setData] = useState('');
    const [dataKeys, setDataKeys] = useState([]);
    const [headers, setHeaders] = useState(props.initArray);

    const currHeaders = dataKeys.filter((dataKey) => {
        if (headers.includes(dataKey)) return dataKey;
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(props.url);
                let data = await response.json();
                data = data.data;
                const dataKeys = Object.keys(data[0]).filter((key) => {
                    return key;
                });

                data = data.map((product) => {
                    for (let property of Object.keys(product)) {
                        if (!headers.includes(property)) {
                            delete product[property];
                        }
                    }
                    return product;
                });
                setData(data);
                setDataKeys(dataKeys);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchData();
    }, [headers, props.url]);
    useEffect(() => () => {}, []);
    return (
        <div className="row">
            <TableHeaders
                key="table-header"
                dataKeys={dataKeys}
                headers={headers}
                setHeaders={setHeaders}
            />
            <TableData key="table-data" headers={currHeaders} data={data} />
        </div>
    );
}

export default Table;
