import { createContext, useState, useContext } from "react";


const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

function ThemeProvider ( {children} ) {
    const [darkMode, setDarkMode] = useState(true)

    const toggleMode = () => {
        setDarkMode(prevMode => !prevMode)
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleMode }}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeProvider