import React from 'react';

type MessageBadge = {
    type: 'messages-badge';
    payload: string;
};

type ClearMessageBadge = {
    type: 'messages-badge';
    payload: null;
};

type QuestionsBadge = {
    type: 'questions-badge';
    payload: string;
};

type ClearQuestionsBadge = {
    type: 'questions-badge';
    payload: null;
};

type Actions =
    | MessageBadge
    | QuestionsBadge
    | ClearMessageBadge
    | ClearQuestionsBadge;
type State = Record<string, string | number | null>;
// type Reducer = (s: State, a: Actions) => State;
type Context = [State, React.Dispatch<Actions>];
export const PaneContext = React.createContext<Context>([{}, () => {}]);

interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

function reducer(state: State, action: Actions): State {
    // for now, it always does the same thing regardless -- could change in the future?
    switch (action.type) {
        case 'messages-badge': {
            return { ...state, [action.type]: action.payload };
        }
        case 'questions-badge': {
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
