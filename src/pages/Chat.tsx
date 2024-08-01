import React, { useContext } from 'react'
import { ChatContext } from '../context/chatContext'
import { Alert, Container, Spinner, Stack } from 'react-bootstrap'
import UserChats from '../components/chats/UserChats'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {
  const {userChats, isUserChatsLoading, userChatsError} = useContext(ChatContext)

  const {user} = useContext(AuthContext)

  console.log("Userchats", userChats)

  if(isUserChatsLoading){
    return(
      <Container>
        <Spinner animation='border'/>
        <p>Loading Chats...</p>
      </Container>
    )
  }

  if(userChatsError){
    return(
      <Container>
        <Alert variant='danger'>
          Error Loading Chats: {userChatsError.message}
        </Alert>
      </Container>
    )
  }
  return (
    <Container>
      {userChats && userChats?.length > 0 ? (
        <Stack gap={4} className="align-items-start" direction="horizontal">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {userChats.map((chat, index) => (
              <div key={index}>
                <UserChats chat={chat} user={user} />
              </div>
            ))}
          </Stack>
          <p>ChatBox</p>
        </Stack>
      )
      :
      (
        <div>No chats available</div>
      )
        }
    </Container>
  )
}

export default Chat
