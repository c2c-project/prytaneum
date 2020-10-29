import React from 'react';

type MessageBadge = {
    type: 'Chat';
    payload: number;
};

type QuestionsBadge = {
    type: 'Question Feed';
    payload: number;
};

type Actions = MessageBadge | QuestionsBadge;
type State = Record<string, number>;
// type Reducer = (s: State, a: Actions) => State;
type Context = [State, React.Dispatch<Actions>];
export const PaneContext = React.createContext<Context>([{}, () => {}]);

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

function reducer(state: State, action: Actions): State {
    // for now, it always does the same thing regardless -- could change in the future?
    switch (action.type) {
        case 'Chat': {
            return { ...state, [action.type]: action.payload };
        }
        case 'Question Feed': {
            return { ...state, [action.type]: action.payload };
        }
        default:
            return state;
    }
}

export default function Pane({ children }: Props) {
    const contextValue = React.useReducer(reducer, {});
    return (
        <PaneContext.Provider value={contextValue}>
            {children}
        </PaneContext.Provider>
    );
}
