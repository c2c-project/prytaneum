// /* eslint-disable */
// import React from 'react';
// import Chatbar from './Window/Chatbar';
// import Messages from './Messages';

// export default { title: 'Chat Window' };

// export function MessageBar() {
//     return <Chatbar onMessageSend={message => console.log(message)} />;
// }

// export function MessageWindow() {
//     const [messages, updateMessages] = React.useState([]);
//     React.useEffect(() => {
//         const intervalId = setInterval(() => {
//             updateMessages(prevMessages => [
//                 ...prevMessages,
//                 {
//                     author: 'some author',
//                     message: 'a message here',
//                     sentOn: new Date(),
//                     _id: Math.random()
//                 }
//             ]);
//             return () => clearInterval(intervalId);
//         }, 1000);
//     }, []);
//     return (
//         <div style={{ height: '500px' }}>
//             <Messages messages={messages} />
//         </div>
//     );
// }
