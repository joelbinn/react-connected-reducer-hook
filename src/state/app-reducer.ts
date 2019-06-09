import {AppAction} from "./app-action"
import {AppState} from "./app-state"

export function appReducer(currentState: AppState, action: AppAction): AppState {
    switch (action.type) {
        case "UpdateA":
            return {...currentState, a: action.payload}
        default:
            return currentState

    }
}
