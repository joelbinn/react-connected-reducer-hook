import React, {Dispatch, Reducer, ReducerAction, useState} from 'react'
import logo from './logo.svg'
import './App.css'
import {AppState, INIT_STATE} from "./state/app-state"
import {connectComponentToState} from "./simple-redux"
import {AppContext} from "./state/app-context"
import {AppAction} from "./state/app-action"
import {appReducer} from "./state/app-reducer"
import {useReducer} from "reinspect"

const App: React.FC = () => {
    const [state, dispatch] = useReducer(appReducer, INIT_STATE, s => s, 'App')
    return (
        <AppContext.Provider value={{dispatch: dispatch, state: state}}>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <ConnectedMyComponent/>
                </header>
            </div>
        </AppContext.Provider>
    )
}

export default App

interface MyComponentProps {
    a?: { id: number, userId: string, title: string },
    onB: (id: number) => void
}

function MyComponent({a, onB}: MyComponentProps) {
    const [id, setId] = useState(1)
    return (
        <div>
            <input type="text" onChange={(e) => setId(+e.target.value)} value={id}/><br/>
            <button onClick={() => onB(id)}>Push me!</button>
            <div>
                {!!a ?
                    <dl>
                        <dt>ID</dt>
                        <dd>{a.id}</dd>
                        <dt>User ID</dt>
                        <dd>{a.userId}</dd>
                        <dt>Title</dt>
                        <dd>{a.title}</dd>
                    </dl>
                    :
                    null
                }
            </div>
        </div>
    )
}

const mappedStateProps = (state: AppState, dispatch: Dispatch<ReducerAction<Reducer<AppState, AppAction>>>) => {
    return {
        a: state.a,
        onB: (id: number) => fetch('https://jsonplaceholder.typicode.com/todos/' + id)
            .then(response => response.json())
            .then(json => dispatch({type: "UpdateA", payload: json}))
    }
}

const ConnectedMyComponent = connectComponentToState(MyComponent, AppContext, mappedStateProps)
