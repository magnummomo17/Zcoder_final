import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Accordion } from './Accordion'
import { useQnaContext } from '../hooks/useQnaContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCommentsContext } from '../hooks/useCommentsContext'
import { FaTrash } from "react-icons/fa"
import LoadingIcons from 'react-loading-icons'

import { useCallback, useEffect, useRef, useState } from "react"
import { TiArrowUpThick } from "react-icons/ti"
import { Link } from 'react-router-dom'

const Comment = ({ comment, index, user, username, textareaRefs }) => {
    useEffect(() => {
        adjustTextareaHeight(textareaRefs.current[index]);
    }, [comment, index, textareaRefs]);

    const adjustTextareaHeight = useCallback((el) => {
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
        }
    }, []);

    return (
        <textarea
            ref={(el) => (textareaRefs.current[index] = el)}
            defaultValue={comment}
            style={{ textAlign: username === user?.username ? 'right' : 'left', backgroundColor: 'inherit', padding: 'none',
                padding: '0px'
             }}
            className="post-text"
            disabled
        />
    );
};

const QnaDetails = ({ qna, onRemove }) => {
    const { dispatch: disp } = useCommentsContext()
    const { dispatch } = useQnaContext()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const { user } = useAuthContext()
    const [clicked, setClicked] = useState(true)
    const [isUser, setIsUser] = useState(true)
    const [showComments, setShowComments] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(true)
    const [commLoading, setCommLoading] = useState(true)
    const YOU = 'me'
    const questionRef = useRef(null)
    const answerRef = useRef(null)
    const textareaRefs = useRef([])

    useEffect(() => {
        if (questionRef.current) {
            questionRef.current.style.height = 'auto';
            questionRef.current.style.height = `${questionRef.current.scrollHeight + 20}px`;
        }
        if (answerRef.current) {
            answerRef.current.style.height = 'auto';
            answerRef.current.style.height = `${answerRef.current.scrollHeight + 20}px`;
        }
    }, [qna]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments/${qna._id}`)
                const json = await response.json()
                if (response.ok) {
                    disp({ type: 'SET_COMMENTS', payload: json })
                    setComments(json)
                }
            } finally {
                setCommLoading(false)
            }
        }

        if (showComments) {
            fetchComments()
        }
    }, [disp, showComments, qna._id])

    useEffect(() => {
        const checkSavedStatus = async () => {
            if (!user) {
                setButtonLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/saved/${qna._id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const json = await response.json();
                    setIsSaved(json.saved);
                } else {
                    console.error('Failed to fetch saved status:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching saved status:', error);
            } finally {
                setButtonLoading(false);
            }
        };

        if (qna.ispublic) {
            checkSavedStatus();
        }
    }, [qna._id, user]);

    useEffect(() => {
        textareaRefs.current = textareaRefs.current.slice(0, comments.length);
    }, [comments.length]);

    const handleClickAdd = async (event) => {
        event.preventDefault()
        if (!user) {
            setIsUser(false)
            return
        }
        const response = await fetch(`/api/comments/${qna._id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok) {
            setComment('')
            disp({ type: 'CREATE_COMMENTS', payload: json })
            setComments((prevComments) => [...prevComments, json])
        }

        setClicked(!clicked)
    }

    const handleClick = async () => {
        if (!user) return
        const response = await fetch(`/api/qna/${qna._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_QNA', payload: json })
        }
    }

    const handleClickSave = async () => {
        if (!user) return;
        setButtonLoading(true);
        const response = await fetch(`/api/saved`, {
            method: 'POST',
            body: JSON.stringify({ qnaid: qna._id }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (!response.ok) {
            console.error('Failed to save the question:', json.error);
        } else {
            setIsSaved(true); // Mark the question as saved
        }
        setButtonLoading(false)
    };

    const handleClickUnsave = async () => {
        if (!user) return;
        setButtonLoading(true);
        try {
            const response = await fetch(`/api/saved`, {
                method: 'DELETE',
                body: JSON.stringify({ qnaid: qna._id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (response.ok) {
                setIsSaved(false); // Mark the question as unsaved
                onRemove(qna._id)
            } else {
                console.error('Failed to unsave the question:', response.statusText);
            }
        } catch (error) {
            console.error('Error unsaving the question:', error);
        } finally {
            setButtonLoading(false);
        }
    };

    return (
        <div className='problem'>
            {qna.ispublic ? (
                <div>
                    <p style={{ float: 'right' }}>{formatDistanceToNow(new Date(qna.createdAt), { addSuffix: true })}</p>
                    <p>question asked by: <u><Link className='user-link' to={`/profile/${qna.username}`}>{qna.username}</Link></u></p>
                    <hr />
                    <p style={{ fontSize: '23px' }}>Title: <b><u>{qna.title}</u></b></p>
                    <p><i>Question:</i></p>
                    <textarea ref={questionRef} className='post-text' defaultValue={qna.question} disabled />
                    {qna.answer && (
                        <>
                            <p><i>Query:</i></p>
                            <textarea ref={answerRef} className='post-text' defaultValue={qna.answer} disabled />
                        </>
                    )}
                    <div className="comment-section">
                        <hr />
                        <button className='view-comments' onClick={() => setShowComments(!showComments)}>
                            {showComments ? <>hide all comments</> : <>show all comments</>}
                        </button>
                        {!buttonLoading ? (
                            !isSaved ? (
                                <button className='view-comments' onClick={handleClickSave}>save question</button>
                            ) : (
                                <button className='view-comments' onClick={handleClickUnsave}>unsave question</button>
                            )
                        ) : (
                            <button className='view-comments' disabled>
                                Loading <LoadingIcons.ThreeDots style={{ marginLeft: '-50px', marginRight: '-50px' }} height={'5px'} speed={.5} fill='black' stroke='black' />
                            </button>
                        )}
                        {showComments && !commLoading && (
                            <div>
                                {comments.length ? comments.map((c, i) => (
                                    <div className={c.username === user?.username ? 'same-user-comment' : 'other-user-comment'} key={i}>
                                        <p><u><Link className='user-link' to={`/profile/${c.username}`}>{c.username === user?.username ? YOU : c.username}:</Link></u></p>
                                        <Comment
                                            comment={c.comment}
                                            index={i}
                                            user={user}
                                            username={c.username}
                                            textareaRefs={textareaRefs}
                                        />
                                    </div>
                                )) : (
                                    <p style={{ fontSize: '13px' }}>this looks a lil empty here.</p>
                                )}
                                <hr />
                            </div>
                        )}
                        {showComments && commLoading && (
                            <div>Loading <LoadingIcons.BallTriangle style={{ marginLeft: '-15px' }} height={'18px'} fill="var(--batch)" stroke='var(--batch)' /></div>
                        )
                        }
                        <div >
                            <form onSubmit={handleClickAdd} className='add-comment'>
                                <input
                                    type="text"
                                    value={comment}
                                    placeholder='add a comment...'
                                    rows="2"
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button ><TiArrowUpThick size={25} /></button>
                            </form>
                            {
                                !isUser && (
                                    <p style={{ fontSize: '13px' }}>you need to login first</p>
                                )
                            }
                        </div>
                    </div>

                </div>
            ) : (<p></p>)
            }

            {
                !qna.ispublic ? (
                    <div>
                        <button className='delete-icon' onClick={handleClick}><FaTrash style={{ color: '#181a18' }} /></button>
                        <p style={{ fontSize: '23px' }}><b><u>{qna.title}</u></b> \ rating: {qna.rating ? qna.rating : 'n/a'}</p>
                        <Accordion title="Question:">
                            {qna.question}
                        </Accordion>
                        <Accordion title="Answer:">
                            {qna.answer}
                        </Accordion>
                        <p style={{ float: 'right' }}>{formatDistanceToNow(new Date(qna.createdAt), { addSuffix: true })}</p>
                    </div>
                ) : (<p></p>)
            }


        </div >
    )
}

export default QnaDetails



