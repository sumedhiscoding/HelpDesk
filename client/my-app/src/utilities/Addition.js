const conversationData = {
    // ... your conversation data object
  };
  
  const incomingMessage = {
    // ... your incoming message object
  };
  
  // Extracting sender ID from incoming message
  const senderId = incomingMessage.messaging[0].sender.id;
  
  // Finding the participant with a matching ID in the participants' data array
  const matchingParticipant = conversationData.participants.data.find(
    (participant) => participant.id === senderId
  );
  
  if (matchingParticipant) {
    // If a matching participant is found, append the necessary information to the message
    const newMessage = {
      id: incomingMessage.messaging[0].message.mid,
      message: incomingMessage.messaging[0].message.text,
      from: {
        name: matchingParticipant.name,
        email: matchingParticipant.email,
        id: matchingParticipant.id,
      },
      to: {
        data: [
          {
            name: matchingParticipant.name,
            email: matchingParticipant.email,
            id: matchingParticipant.id,
          },
        ],
      },
    };
  
    // Append the new message to the existing messages array
    conversationData.messages.data.push(newMessage);
  
    // Now, conversationData contains the updated messages array with the new message
    console.log(conversationData);
  } else {
    console.log('Sender ID not found in participants data.');
  }
  