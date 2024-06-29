import { LANGUAGE_VERSIONS } from "./constants"
const languages = Object.entries(LANGUAGE_VERSIONS)

const LanguageSelector = ({ language, onSelect }) => {
    
    return (
        <div style={{fontSize: '20px'}}>
            <br />
            <label for="languages">language: </label>
            <select id="languages" onChange={(e)=>{onSelect(e.target.value)}}>
                {
                     <option>{language} (selected)</option>
                }
                {
                    languages.map((l) => (
                        <option value={l[0]}>{l[0]}  ({l[1]})</option>
                    ))
                }
            </select>
            <br />
            <br />
        </div>
    )
}


export default LanguageSelector