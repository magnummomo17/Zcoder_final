import { useState } from "react";
import { executeCode } from "./codeEditorAPI";
import LoadingIcons from "react-loading-icons";


const CodeOutput = ({ editorRef, language }) => {
    const [output, setOutput] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue()
        if (!sourceCode) return;

        try {
            setIsLoading(true)
            const { run: result } = await executeCode(language, sourceCode)
            setOutput(result.output.split("\n"))
            result.stderr ? setIsError(true) : setIsError(false)
        } catch (error) {
            setOutput(error.message || 'an error occured')
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="code-output">
            <div style={{marginBottom: '26px'}}>
                <button style={{ float: 'right' , borderRadius: '20px', backgroundColor: '#05a95c', color: 'white', cursor: 'pointer', fontSize: '20px', paddingLeft: '10px', paddingRight: '10px'}} disabled={isLoading} onClick={runCode}>RUN</button>
                <p style={{fontSize: '20px'}}>Run your code:</p>
            </div>

            <div className={isError ? "output error" : "output"} >
                {!isLoading && output && output.map((l, i) => <p className="lines-of-code" key={i}>{l}</p>)}
                {isLoading && output && <p className="lines-of-code">Loading <LoadingIcons.ThreeDots style={{marginLeft: '-40px'}} height={'7px'} fill='var(--batch)'/></p>}
                {!output && <p className="lines-of-code">Click "RUN" to see the output of your code</p>}
            </div>
        </div>
    )
}

export default CodeOutput