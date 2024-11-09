import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';

// ** constants **
import { REACT_APP_API_BASE_URL } from 'config';
import { PublicNavigation } from 'constants/navigation.constant';
import { setSocket, socketSelector } from 'reduxStore/slices/socketSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';

export const socketName = {
  SEND_MESSAGE: 'send-message',
  NEW_MESSAGE: 'new-message',
  NEW_ROOM: 'new-room',
  JOIN_ROOM: 'join-room',
  USER_ACTIVE: 'user-active',
  UNREAD_MESSAGE: 'unread-message-count',
};

const SocketComponent = () => {
  const dispatch = useDispatch();
  const socket = useSelector(socketSelector);
  const token = useSelector(getAuthToken);

  socket?.on(socketName.NEW_ROOM, (data) => {
    socket.emit(socketName.JOIN_ROOM, data);
  });

  const connectSocket = async () => {
    const socket = openSocket(REACT_APP_API_BASE_URL as string, {
      forceNew: true,
      transports: ['websocket'],
      query: {
        token,
      },
    });

    dispatch(setSocket(socket));

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
  };

  useEffect(() => {
    if (
      token &&
      !window.location.href.includes(PublicNavigation.somethingWentWrong)
    ) {
      connectSocket();
    }
  }, []);

  return <></>;
};

export default SocketComponent;
