import React from 'react'
import { useMessageContext } from '../contexts/MessageContext'
const Information = () => {
    const {selectedConversation} = useMessageContext();
    console.log("selectedConversation in information",selectedConversation);
  return (
    <div>Information</div>
  )
}

export default Information