import React, { useState, useRef, useEffect } from 'react';

export const Accordion = ({ title, children }) => {
    const [isActive, setIsActive] = useState(false);
    const panelRef = useRef(null);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        if (panelRef.current) {
            panelRef.current.style.height = `${panelRef.current.scrollHeight + 20}px`;
        }
    }, [isActive]);

    
    return (
        <div>
            <button className={`accordion ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
                {title}
            </button>
            {
                isActive && <textarea
                    ref={panelRef}
                    className="panel"
                    style={{width: '100%', fontSize: '15px', resize: 'none', border: 'none', paddingTop: '10px'}}
                    defaultValue={children}
                    disabled
                />
            }
        </div>
    );
};
