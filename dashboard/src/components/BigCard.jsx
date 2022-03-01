import { useEffect } from 'react';
import { useState } from 'react';

export default function Card(props) {
    const [title, setTitle] = useState('cargando');
    const [info, setInfo] = useState(['cargando']);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(props.url);
            const data = await response.json();
            setTitle(data.title);
            setInfo([
                { 'creada el': data.createdAt },
                { materia: data.subject.name },
                { año: data.grades.name },
                {
                    maestro:
                        data.teacher.firstName + ' ' + data.teacher.lastName,
                },
            ]);
        };
        fetchData();
    }, []);

    return (
        <article className="col-12 col-md-6 mb-3">
            <div className="container-c">
                <h2>Última clase creada:</h2>
                <div>
                    {info.map((item, i) => {
                        return (
                            <h4 key={i}>
                                {Object.keys(item)}: {Object.values(item)}{' '}
                            </h4>
                        );
                    })}
                </div>
            </div>
        </article>
    );
}
