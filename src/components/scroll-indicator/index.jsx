import {useEffect, useState} from "react";
import "./scroll.css";

const ScrollIndicator = ({url}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [scrollPercentage, setScrollPercentage] = useState(0);

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

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        const scrollPercentage = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * 100);
        setScrollPercentage(scrollPercentage);
        if (scrolledToBottom) {
            console.log('Scrolled to bottom');
        }

    }

    useEffect(() => {
        fetchData(url);
    }, [url]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', () => {});
    }, []);

    console.log(data, scrollPercentage);

    if (errorMessage) {
        return <div>Error! {errorMessage}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="top-container">
                <h1>Custom Scroll Indicator</h1>
                <div className={"scroll-progress-tracking-container"}>
                    <div
                        className="current-progress-bar"
                        style={{width: `${scrollPercentage}%`}}
                    ></div>
                </div>
            </div>
            <div className="data-container">
                {data && data.length > 0
                    ? data.map((dataItem, index) => <p key={index}>{dataItem.title}</p>)
                    : null}
            </div>
        </>
    );
}

export default ScrollIndicator;