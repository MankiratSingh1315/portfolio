import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
    isIntroPlayed: boolean;
    setIntroPlayed: (played: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isIntroPlayed, setIntroPlayed] = useState(false);

    return (
        <AppContext.Provider value={{ isIntroPlayed, setIntroPlayed }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};