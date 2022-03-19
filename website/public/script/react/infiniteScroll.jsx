const domContainer = document.querySelector('#infiniteScroll');
ReactDOM.render(<ScrollComponent />, domContainer);
console.log('aca');
('use strict');
function ScrollComponent() {
    let [classesSel, setClassesSel] = React.useState('');
    let [loading, setLoading] = React.useState(false);
    let [page, setPage] = React.useState(0);
    let [prevY, setPrevY] = React.useState(0);
    const loadingRef = React.useRef('');

    function handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (prevY > y) {
            const lastPhoto = classesSel[classesSel.length - 1];
            const curPage = lastPhoto.albumId;
            getClasses(curPage);
            setPage(curPage);
        }
        setPrevY(y);
    }
    React.useEffect(async () => {
        console.log('useEffect');
        // async function getClasses(page) {
        //     setLoading(true);
        //     const response = await fetch(
        //         'http://localhost:3001/api/products/p'
        //     );
        //     const newClassesSel = await response.json();
        //     setClassesSel([...classesSel, ...newClassesSel]);
        //     setLoading(false);
        // }
        getClasses(page, setLoading, setClassesSel, classesSel);
        var options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };
        let observer = new IntersectionObserver(handleObserver, options);
        observer.observe(loadingRef.current);
    }, []);
    const loadingCSS = {
        height: '100px',
        margin: '30px',
    };
    const loadingTextCSS = { display: loading ? 'block' : 'none' };
    console.log('classesSel', classesSel);
    return (
        <div className="container">
            <div style={{ minHeight: '800px' }}>
                {/* {classesSel.map((classSel) => (
                    <div>CLASE</div>
                ))} */}
            </div>
            <div ref={loadingRef} style={loadingCSS}>
                <span style={loadingTextCSS}>Loading...</span>
            </div>
        </div>
    );
}
