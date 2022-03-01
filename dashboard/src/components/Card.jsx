import { useEffect } from 'react';
import { useState } from 'react';
import './card.css';

export default function Card(props) {
    const [title, setTitle] = useState('');
    const [count, setCount] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(props.url);
            const data = await response.json();
            setTitle(data.title);
            setCount(data.count);
        };
        fetchData();
    }, []);

    return (
        <article className="col-12 col-md-6 mb-3">
            <div className="container-c">
                <h2>
                    Total de {title}: {count}
                </h2>
            </div>
        </article>
    );
}
