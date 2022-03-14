import Card from './Card';
import BigCard from './BigCard';

export default function Info() {
    const countUrl = [
        'https://mundo-sapien.herokuapp.com/api/products/count',
        'https://mundo-sapien.herokuapp.com/api/users/count',
        'https://mundo-sapien.herokuapp.com/api/teachers/count',
    ];

    return (
        <section className="row mb-3">
            {countUrl.map((url) => {
                return <Card key={url} url={url} />;
            })}
            <BigCard
                key="last-product-info"
                url="https://mundo-sapien.herokuapp.com/api/products/lastCreated"
            />
        </section>
    );
}
