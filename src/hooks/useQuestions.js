import React from 'react';
import io from 'socket.io-client';
import useJwt from './useJwt';

function connect(roomId = 'chat') {
    const url = `${process.env.REACT_APP_SERVER}/questions`;
    return io.connect(url, { query: `roomId=${roomId}` });
}

function useQuestions(roomId = 'session') {
    const session = JSON.parse(localStorage.getItem('session'));
    const initialQuestion =
        session && session.questionHistory
            ? session.questionHistory[session.questionHistory.length - 1]
            : false;
    const [questions, setQuestions] = React.useState([]);
    const [current, setCurrent] = React.useState(initialQuestion);
    const [jwt] = useJwt();
    const [sendFunc, setFunc] = React.useState(() => {
        // TODO: maybe have a message queue?
        // i.e. some way to save the messages they're trying to send before ocnnection
        // or just have a loading screen
        // console.log('not connected');
    });
    
    React.useEffect(() => {
        let isMounted = true;
        // SOCKET IO
        const question = connect(roomId);
        question.on('connect', function() {
            // TODO: login tokens here? or some kind of security?
            // chat.emit('new-user');
            if (isMounted) {
                setFunc(question);
            }
        });
        question.on('update-toxicity', function(messageId) {
            if (isMounted) {
                setQuestions(curQuestions =>
                    curQuestions.map(element => {
                        const questionElement = element
                        if (questionElement._id === messageId){
                            questionElement.toxicity = true
                        }
                        return questionElement
                    })
                );
            }
        });
        question.on('moderate-question', function(messageId) {
            if (isMounted) {
                setQuestions(curQuestions =>
                    curQuestions.map(element => {
                        const questionElement = element
                        if (questionElement._id === messageId){
                            questionElement.moderated= true
                        }
                        return questionElement
                    })
                );
            }
        });
        question.on('cancel-moderate-question', function(messageId) {
            if (isMounted) {
                setQuestions(curQuestions =>
                    curQuestions.map(element => {
                        const questionElement = element
                        if (questionElement._id === messageId){
                            questionElement.moderated= false
                        }
                        return questionElement
                    })
                );
            }
        });
        question.on('asked', function(messageId) {
            if (isMounted) {
                setQuestions(curQuestions =>
                    curQuestions.map(element => {
                        const questionElement = element
                        if (questionElement._id === messageId){
                            questionElement.asked = true
                        }
                        return questionElement
                    })
                );
            }
        });
        question.on('question', function(message) {
            if (isMounted) {
                setQuestions(state => [...state, message]);
            }
        });
        question.on('disconnect', () => console.log('disconnected'));
        question.on('error', err => console.log(err));
        question.on('set-question', q => {
            setCurrent(q);
        });
        question.on('update-is-center', function(messageId, isCenter) {
            if (isMounted) {
                setQuestions(curQuestions =>
                    curQuestions.map(element => {
                        const questionElement = element
                        if (questionElement._id === messageId){
                            questionElement.isCenter = isCenter
                        }
                        return questionElement
                    })
                );
            }
        });
        question.on('update-cluster-number', function(messageId, clusterNumber) {
            if (isMounted) {
                setQuestions(curQuestions =>
                    curQuestions.map(element => {
                        const questionElement = element
                        if (questionElement._id === messageId){
                            questionElement.clusterNumber = clusterNumber
                        }
                        return questionElement
                    })
                );
            }
        });
        // TODO: 193
        /**
         * here is where you'd add your listener for the 'classification' event on the client
         * and update the state appropriately to trigger a re-render in react
         */
        // question.on('moderate', messageId => {
        //     if (isMounted) {
        //         setQuestions(curMessages =>
        //             curMessages.filter(msg => msg._id !== messageId)
        //         );
        //     }
        // });
        // FETCH
        fetch(`/api/questions/${roomId}`, {
            headers: {
                Authorization: `bearer ${jwt}`
            }
        }).then(r => {
            r.json().then(history => {
                if (isMounted) {
                    setQuestions(history.filter(m => !m.moderated));
                }
            }).catch((exception) => console.log( exception));
        });

        // SOCKET IO CLEANUP
        return () => {
            console.log('closing');
            isMounted = false;
            question.close();
        };
    }, [roomId, jwt]);

    return [
        questions,
        question => {
            // prevent a blank message or a message with only spaces from being sent
            if (question.trim()) {
                sendFunc.emit('question', { jwt, question });
            }
        },
        // raw sendFunc so that privileged actions take place inside the components themselves, which are protected
        current
    ];
}

export default useQuestions;
