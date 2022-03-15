import Card from './Card';
import BigCard from './BigCard';

export default function Info() {
    const countUrl = [
        'http://localhost:3001/api/products/count',
        'http://localhost:3001/api/users/count',
        'http://localhost:3001/api/teachers/count',
    ];

    return (
        <section className="row mb-3">
            {countUrl.map((url) => {
                return <Card key={url} url={url} />;
            })}
            <BigCard
                key="last-product-info"
                url="http://localhost:3001/api/products/lastCreated"
            />
        </section>
    );
}
