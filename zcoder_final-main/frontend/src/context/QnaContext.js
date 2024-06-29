import { createContext, useReducer } from "react"

export const QnaContext = createContext()

export const qnaReducer = (state, action) => {
    switch (action.type) {
        case 'SET_QNAS':
            return {
                qnas: action.payload
            }
        case 'CREATE_QNA':
            return {
                qnas: [action.payload, ...state.qnas]
            }
        case 'DELETE_QNA':
            return {
                qnas: state.qnas.filter((q) =>
                    q._id !== action.payload._id
                )
            }
        default:
            return state
    }
}

export const QnaContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(qnaReducer, {
        qnas: null
    })


    return (
        <QnaContext.Provider value={{ ...state, dispatch }}>
            {children}
        </QnaContext.Provider>
    )
}