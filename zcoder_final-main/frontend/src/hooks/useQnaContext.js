import { useContext } from "react";
import { QnaContext } from "../context/QnaContext";

export const useQnaContext = () => {
    const context = useContext(QnaContext)

    if(!context){
        throw Error('useQnaContext must be used inside an QnaContextProvider')
    }

    return context
}