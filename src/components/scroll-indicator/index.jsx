import {useEffect, useState} from "react";


const ScrollIndicator = ({url}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    async function fetchData(getUrl) {
        try {
            setLoading(true);
            const response = await fetch(getUrl);
            const data = await response.json();
            if (data && data.products && data.products.length > 0) {
                setData(data.products);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message);
        }
    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    // console.log(data, loading);

    return (
        <>
            <h1>Custom Scroll Indicator</h1>
            <div className="data-container">
                {data && data.length > 0
                    ? data.map((dataItem, index) => <p key={index}>{dataItem.title}</p>)
                    : null}
            </div>
        </>
    );
}

export default ScrollIndicator;