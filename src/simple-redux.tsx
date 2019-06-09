import React, {Dispatch, Reducer, ReducerAction, useContext} from "react"

export interface StateContext<S, A> {
    dispatch: Dispatch<ReducerAction<Reducer<S, A>>>
    state: S
}

/**
 * Create a component that is "connected" to the state (handled by the useReducer hook) and
 * maps props to state and dispatch.
 *
 * It requires the state and to be provided in the specified context and that the context has been
 * initialized using useReducer in some encompassing component.
 *
 * @param WrappedComponent the component to connect to state
 * @param CONTEXT the context (must extend StateContext)
 * @param mapProps a function that maps props to state and dispatch
 */
export function connectComponentToState<COMPONENT_PROPS, STATE, ACTIONS>(
    WrappedComponent: React.ComponentType<COMPONENT_PROPS>,
    CONTEXT: React.Context<StateContext<STATE, ACTIONS>>,
    mapProps: (state: STATE, dispatch: React.Dispatch<React.ReducerAction<React.Reducer<STATE, ACTIONS>>>, ownProps?: Partial<COMPONENT_PROPS>) => COMPONENT_PROPS
): React.FunctionComponent<Partial<COMPONENT_PROPS>> {
    return (ownProps: Partial<COMPONENT_PROPS>) => {
        const context: StateContext<STATE, ACTIONS> = useContext(CONTEXT)
        const {dispatch, state} = context
        const mappedProps = mapProps(state, dispatch, ownProps)
        return <WrappedComponent {...mappedProps}/>
    }
}
