import {useContext} from "react"
import { CommentsContext } from "../context/CommentsContext"

export const useCommentsContext = () => {
    const context = useContext(CommentsContext)

    if(!context)
        throw Error('useCommentsContext must be used inside an CommentsContextProvider')

    return context
}