import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQnaContext } from '../hooks/useQnaContext'
import { useAuthContext } from '../hooks/useAuthContext'

import QnaDetails from '../components/QnaDetails'
import LoadingIcons from 'react-loading-icons'

const Problem = () => {
    const { qnas, dispatch } = useQnaContext()
    const { user } = useAuthContext()

    const [isQna, setIsQna] = useState(true)
    const [ratingSort, setRatingSort] = useState(false)
    const [timeSort, setTimeSort] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQnas = async () => {
            try {
                const response = await fetch('/api/qna/problemset', {
                    headers: { 'Authorization': `Bearer ${user.token}` },
                })
                const json = await response.json()
                if (response.ok) {
                    dispatch({ type: 'SET_QNAS', payload: json })
                }
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchQnas()
        }
    }, [dispatch, user])


    useEffect(() => {
        if (qnas?.length === 0) {
            setIsQna(false)
        }
    }, [qnas, user])


    useEffect(() => {
        if (ratingSort) {
            qnas?.sort(function (a, b) {
                return b.rating - a.rating
            })
        }
        else if (timeSort) {
            qnas?.sort(function (a, b) {
                const numa = a.createdAt.replace(/\D/g, '');
                const numb = b.createdAt.replace(/\D/g, '');
                return numa - numb
            })
        }
        else {
            qnas?.sort(function (a, b) {
                const numa = a.createdAt.replace(/\D/g, '');
                const numb = b.createdAt.replace(/\D/g, '');
                return numb - numa
            })
        }

        dispatch({ type: 'SET_QNAS', payload: qnas })
    }, [qnas, ratingSort, timeSort])

    if (loading) {
        return <div className="profile">Loading <LoadingIcons.BallTriangle style={{marginLeft: '-15px'}} height={'18px'}  fill="var(--batch)" stroke='var(--batch)'/></div>;
    }

    return (
        <div className="problems">
            <Link to="/problem/new" style={{ textDecoration: 'none', color: 'inherit' }}> <button className='addd'>add a problem</button></Link>
            <div style={{ position: 'relative' }}>
                <div style={{ float: 'right' }}>
                    <input type="checkbox" checked={timeSort} onChange={() => {
                        setTimeSort(!timeSort)
                        {
                            !timeSort && setRatingSort(false)
                        }
                    }} />
                    <label style={{ marginRight: '10px' }}>time earliest</label>
                    <input type="checkbox" checked={ratingSort} onChange={() => {
                        setRatingSort(!ratingSort)
                        {
                            !ratingSort && setTimeSort(false)
                        }
                    }} />
                    <label>rating highest</label>
                </div>
                <h4>these are my problems:</h4>
            </div>
            <div>
                {
                    isQna ? qnas?.map(qna => (
                        <QnaDetails qna={qna} key={qna._id} />
                    )) : (
                        <p>yo no problimo is added here yet.</p>
                    )
                }
            </div>
        </div>
    )
}


export default Problem