import React, { useCallback, useContext, useMemo } from 'react';
import { createContext,useState } from 'react';

const EffectsContext = createContext();

const useEffectsContext = () => useContext(EffectsContext);

const EffectsContextProvider = ({children}) => {

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const canOpenSidebar = useCallback(() => {
      setSidebarIsOpen(!sidebarIsOpen);
    },[sidebarIsOpen]);

    const contextValue = useMemo(() => ({
        sidebarIsOpen,
        setSidebarIsOpen,
        canOpenSidebar  
      }),
      [sidebarIsOpen,canOpenSidebar]
    );

    return (
        <EffectsContext.Provider value={contextValue}>
          {children}
        </EffectsContext.Provider>
    );
}

export { useEffectsContext,EffectsContextProvider };