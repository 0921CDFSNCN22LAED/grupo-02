import React, { useEffect, useState } from 'react';
import TableData from './TableData';
import TableHeaders from './TableHeaders';

function Table(props) {
    const [data, setData] = useState('');
    const [dataKeys, setDataKeys] = useState('');
    const [headers, setHeaders] = useState(props.initArray);

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
    }, [dataKeys]);
    useEffect(() => () => {}, []);
    return (
        <React.Fragment>
            <TableHeaders
                dataKeys={dataKeys}
                headers={headers}
                setHeaders={setHeaders}
            />
            <TableData headers={headers} data={data} />
        </React.Fragment>
    );
}

export default Table;
