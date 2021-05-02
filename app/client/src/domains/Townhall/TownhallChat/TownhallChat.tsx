import React from 'react';
// import { MenuItem } from '@material-ui/core';
// import type { ChatMessageForm, SocketIOEvents } from 'prytaneum-typings';
// import { motion } from 'framer-motion';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//     initializeChatMessages,
//     addChatMessage,
//     updateChatMessage,
//     deleteChatMessage,
//     readChatMessages,
// } from 'reducers';
// import useSocketio, { SocketFn } from 'hooks/useSocketio';
// import useEndpoint from 'hooks/useEndpoint';
// import useTownhall from 'hooks/useTownhall';
// import useUser from 'hooks/useUser';
// import Chat from 'components/Chat';
// import Loader from 'components/Loader';
// import ChatMessage from 'components/ChatMessage';
// import TextField from 'components/TextField';
// import { createChatMessage, getChatmessages } from '../api';

// interface Props {
//     onDataChange?: (length: number) => void;
// }

// export default function TownhallChat({ onDataChange }: Props) {
//     const [townhall] = useTownhall();
//     const messageRef = React.useRef<ChatMessageForm>();
//     const [user] = useUser();
//     const countRef = React.useRef<number>(0);
//     const dispatch = useDispatch();
//     const { unread, read } = useSelector((store) => store.chat);
//     const messages = React.useMemo(() => [...read, ...unread], [read, unread]);
//     const [room, setRoom] = React.useState('Room #1');

//     // load initial messages
//     const [, areMessagesLoading] = useEndpoint(() => getChatmessages(townhall._id), {
//         onSuccess: ({ data }) => dispatch(initializeChatMessages(data)),
//         runOnFirstRender: true,
//     });

//     const socketFn: SocketFn = React.useCallback(
//         (socket) =>
//             socket.on('chat-message-state', (action: SocketIOEvents['chat-message-state']) => {
//                 switch (action.type) {
//                     case 'create-chat-message':
//                         dispatch(addChatMessage(action.payload));
//                         break;
//                     case 'update-chat-message':
//                         dispatch(updateChatMessage(action.payload));
//                         break;
//                     case 'delete-chat-message':
//                         dispatch(deleteChatMessage(action.payload._id));
//                         break;
//                     case 'moderate-chat-message':
//                         dispatch(deleteChatMessage(action.payload._id));
//                         break;
//                     default:
//                     // do nothing
//                 }
//             }),
//         [dispatch]
//     );
//     useSocketio('/chat-messages', { query: { townhallId: townhall._id } }, socketFn);

//     const create = React.useCallback(() => {
//         // verify message exists
//         if (!messageRef.current) throw new Error('No message set');

//         // copy the current message
//         const copy = messageRef.current;

//         // clear the ref
//         messageRef.current = undefined;

//         // send
//         return createChatMessage(townhall._id, copy);
//     }, [townhall._id]);

//     const [postMesssage, isLoading] = useEndpoint(create, { minWaitTime: 0 });

//     React.useEffect(() => {
//         if (onDataChange && messages.length - countRef.current > 0) {
//             onDataChange(messages.length - countRef.current);
//             countRef.current = messages.length;
//         }
//     }, [messages.length, onDataChange]);

//     const readMessages = React.useCallback(() => {
//         dispatch(readChatMessages());
//     }, [dispatch]);

//     const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//         setRoom(event.target.value as string);
//     };

//     if (areMessagesLoading) return <Loader />;

//     return (
//         <Chat
//             disabled={isLoading || !user}
//             onSubmit={(form) => {
//                 messageRef.current = form;
//                 postMesssage();
//             }}
//             onScrollToBottom={readMessages}
//         >
//             <TextField select label='Breakout Room' value={room} onChange={handleChange}>
//                 <MenuItem value='Room #1'>Room #1</MenuItem>
//                 <MenuItem value='Room #2'>Room #2</MenuItem>
//                 <MenuItem value='Room #3'>Room #3</MenuItem>
//                 <MenuItem value='Room #4'>Room #4</MenuItem>
//                 <MenuItem value='Room #5'>Room #5</MenuItem>
//             </TextField>
//             {messages.map(({ _id, meta, message }) => (
//                 <motion.li
//                     key={_id}
//                     initial={{ y: 5, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ type: 'keyframes' }}
//                 >
//                     <ChatMessage name={meta.createdBy.name.first} timestamp={meta.createdAt} message={message} />
//                 </motion.li>
//             ))}
//         </Chat>
//     );
// }

// TownhallChat.defaultProps = {
//     onDataChange: undefined,
// };
export default () => <div />;
