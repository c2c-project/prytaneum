// import React from 'react';
// import TChatUser from './TownhallChatUser';

// export default { title: 'TownhallChat' };

// let counter = 0;

// const mockMessage = (message) => {
//     counter += 1;
//     return {
//         message,
//         _id: counter.toString(),
//         userId: counter.toString(),
//         moderated: false,
//         sent: Date.now(),
//         username: Math.random().toString(),
//     };
// };

// export function SpectatingUser() {
//     const [messages, setMessage] = React.useState([]);
//     const sendMessage = (m) => setMessage((curr) => [...curr, mockMessage(m)]);
//     return (
//         <TChatUser
//             title='TownhallChatUser'
//             messages={messages}
//             onMessageSend={sendMessage}
//         />
//     );
// }

// export function OwnedMessages() {
//     const [messages, setMessage] = React.useState([]);
//     const myId = '1';
//     const wrappedMock = (m) => ({ ...mockMessage(m), userId: myId });
//     const sendMessage = (m) => setMessage((curr) => [...curr, wrappedMock(m)]);
//     return (
//         <TChatUser
//             title='TownhallChatUser'
//             messages={messages}
//             onMessageSend={sendMessage}
//         />
//     );
// }

