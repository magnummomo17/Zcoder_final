import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useQnaContext } from "../hooks/useQnaContext"
import { useAuthContext } from "../hooks/useAuthContext"

const NewProb = () => {
    const { dispatch } = useQnaContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [rating, setRating] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [ispublic, setIsPublic] = useState(false)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const qna = { title, rating, question, answer, ispublic }

        const response = await fetch('/api/qna/problemset', {
            method: 'POST',
            body: JSON.stringify(qna),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setRating('')
            setQuestion('')
            setAnswer('')
            setIsPublic(false)
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_QNA', payload: json })
            navigate('/problem')
        }


    }

    return (
        <div className="add-prob">
            <form onSubmit={handleSubmit}>
                <h3>add a problem</h3>

                <label>Title*:</label>
                <br />
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
                <br />
                <br />

                <label>Rating:</label>
                <br />
                <input
                    type="number"
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                />
                <br />
                <br />

                <label>Question*:</label>
                <br />
                <textarea
                    name="question"
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                    className={emptyFields.includes('question') ? 'error' : ''}
                />
                <br />
                <br />

                <label>Answer/Query:</label>
                <br />
                <textarea
                    name="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <br />
                <br />

                <input
                    type="checkbox"
                    value={ispublic}
                    checked={ispublic}
                    onChange={() => { setIsPublic(!ispublic) }}
                />
                <label style={{ fontSize: '16px'}}>set this question as public</label>
                <br />
                <br />

                <button>add problem</button>
                <br />
                {error && <div className="error">{error}</div>}
            </form>
            <p>* means required.</p>
        </div>
    )
}

export default NewProb