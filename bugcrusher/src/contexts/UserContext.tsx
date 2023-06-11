import React from 'react'

export const userContext = React.createContext({
    user: null,    
    setUser: (user: any) => {},
    loading: true
})