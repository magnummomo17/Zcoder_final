import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import { CODE_SNIPPETS } from '../components/constants';
import CodeOutput from '../components/CodeOutput';

const Playground = () => {
    const editorRef = useRef()
    const [value, setValue] = useState('')
    const [language, setLanguage] = useState('javascript')

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }

    const onSelect = (language) => {
        setLanguage(language)
        setValue(CODE_SNIPPETS[language])
    }


    return (
        <div className='playground'>
            <CodeOutput editorRef={editorRef} language={language}/>
            <div className='editor'>
                <LanguageSelector language={language} onSelect={onSelect} key={language} />
                <Editor
                    height='75vh'   
                    theme='hc-light'
                    language={language}
                    defaultValue={CODE_SNIPPETS[language]}
                    options={{
                        minimap: {
                            enabled: false,
                        }
                    }}
                    onMount={onMount}
                    value={value}
                    onChange={(e) => setValue(e)}
                />
            </div>
        </div>
    )
}

export default Playground