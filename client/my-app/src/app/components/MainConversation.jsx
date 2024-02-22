import React, { useState, useEffect } from "react";
import { useMessageContext } from "../contexts/MessageContext";
import { Formik, Field, Form } from "formik";
import { SendMessage } from "@/utilities/SendMessage";
const MainConversation = () => {

  const {conversations, selectedConversation,setSelectedConversation } = useMessageContext();
  const [newconvo,setNewConvo]=useState(selectedConversation);
  useEffect(() => {
    console.log("selectedConversation",selectedConversation)
    console.log("conversations",conversations);
    setNewConvo(selectedConversation);
        
 
  }, [newconvo,selectedConversation]);

  return (
    <div>
      {newconvo && (
        <div>
            {console.log("newconvo",newconvo)}
          <div>Top Bar</div>
          <div classname="overflow-auto">
            {newconvo?.data?.toReversed().map((message) => {
              if (message.from.name == "HelperDesk") {
                return <div className="bg-blue-400 flex justify-end">{message.message}</div>;
              } else
                return <div className="bg-red-500 flex justify-start"> {message.message}</div>;
            })}
          </div>
          <div>
            <Formik
              initialValues={{
                message: "",
              }}
              onSubmit={async (values) => {
                // console.log(values);
                //we need to get pageSCopedId
                const id = newconvo?.data?.find((message) => {
                  if (message.from.name != "HelperDesk") {
                    return message.from.id;
                  }
                });
                // console.log("found id", id);

                const receivingId = id.from.id;
                const payload = {
                  message: values.message,
                  PageScopedId: receivingId,
                };
                // console.log("payload ", payload);
                SendMessage(payload);
              }}
            >
              <Form>
                <Field id="Message" name="message" placeholder="Type Here" />
                <button type="submit">Submit</button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainConversation;
