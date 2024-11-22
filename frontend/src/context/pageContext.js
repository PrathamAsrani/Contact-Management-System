import React, { useState, useContext, createContext } from 'react'

const pageContext = createContext()

const PageProvider = ({ children }) => {
    const [pages, setPages] = useState(1);
    return (
        <>
            <pageContext.Provider value={[pages, setPages]}>
                {children}
            </pageContext.Provider>
        </>
    )
}

const usePageContext = () => useContext(pageContext);

export {usePageContext, PageProvider};