import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

import LoadingIcons from 'react-loading-icons'

import QnaDetails from "../components/QnaDetails"

const Saved = () => {
    const [qnas, setQnas] = useState()
    const { user } = useAuthContext()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [isQna, setIsQna] = useState(true)


    useEffect(() => {
        const fetchSavedQnas = async () => {
            if (!user) {
                setError('You must be logged in')
                setLoading(false)
                return
            }
            try {
                const response = await fetch('/api/saved/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                if (response.ok) {
                    const saved = await response.json();
                    setQnas(saved)

                } else {
                    setError('Failed to fetch saved questions');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchSavedQnas()
    }, [user]);

    useEffect(() => {
        if (qnas?.length === 0) {
            setIsQna(false)
        }
    }, [qnas])

    const handleRemoveQna = (qnaId) => {
        setQnas(prevQnas => prevQnas.filter(qna => qna._id !== qnaId));
    };

    if (loading) {
        return <div className="profile">Loading <LoadingIcons.BallTriangle style={{ marginLeft: '-15px' }} height={'18px'} fill="var(--batch)" stroke='var(--batch)' /></div>;
    }

    return (
        <div className="home">
            <h2>Your saved posts:</h2>
            <div>
                {isQna ? qnas?.map(qna => (
                    <QnaDetails qna={qna} key={qna._id} onRemove={handleRemoveQna} />
                )) : (
                    <p>yo no problimo is saved here yet</p>
                )}
            </div>
        </div>
    )
}

export default Saved