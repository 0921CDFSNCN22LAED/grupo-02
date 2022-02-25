import React, { useEffect, useState } from 'react';
import TableData from './TableData';
import TableHeaders from './TableHeaders';

function Table(props) {
    const wantedHeaders = ['id', 'title', 'price'];
    const [data, setData] = useState('');
    const [dataKeys, setDataKeys] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(props.url);
                let data = await response.json();
                data = data.data;
                const dataKeys = Object.keys(data[0]).filter((key) => {
                    return key;
                    wantedHeaders.includes(key);
                });

                data = data.map((product) => {
                    for (let property of Object.keys(product)) {
                        if (!dataKeys.includes(property)) {
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
    }, []);

    return (
        <React.Fragment>
            <TableHeaders dataKeys={dataKeys} />
            <TableData dataKeys={dataKeys} data={data} />
        </React.Fragment>
    );
}

export default Table;
