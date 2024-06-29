import { useEffect, useState } from "react"

import QnaDetails from "../components/QnaDetails"
import LoadingIcons from "react-loading-icons";

const Home = () => {
    const [qnas, setQnas] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await fetch('/api/qna/public')
                const json = await response.json()
                if (response.ok) {
                    setQnas(json)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchQueries()
    }, [])

    if (loading) {
        return <div className="profile">Loading <LoadingIcons.BallTriangle style={{ marginLeft: '-15px' }} height={'18px'} fill="var(--batch)" stroke='var(--batch)'/></div>;
    }

    return (
        <div className="home">
            <div>
                {qnas ? qnas?.map((qna, i) => (
                    <QnaDetails qna={qna} key={i} />
                )) : (
                    <p>yo no problimo is added here yet</p>
                )}
            </div>
        </div>
    )
}

export default Home