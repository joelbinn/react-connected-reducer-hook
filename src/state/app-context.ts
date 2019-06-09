import {createContext, Dispatch, ReducerAction} from "react"
import {AppState, INIT_STATE} from "./app-state"
import {appReducer} from "./app-reducer"

export interface AppContextType {
    dispatch: Dispatch<ReducerAction<typeof appReducer>>
    state: AppState
}

export const AppContext = createContext<AppContextType>({dispatch: () => undefined, state: INIT_STATE})
