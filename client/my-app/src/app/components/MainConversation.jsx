import React, { useState, useEffect } from "react";
import { useMessageContext } from "../contexts/MessageContext";
import { Formik, Field, Form } from "formik";
import { SendMessage } from "@/utilities/SendMessage";

const MainConversation = () => {
  const { conversations, selectedConversation, setSelectedConversation } = useMessageContext();
  const [newconvo, setNewConvo] = useState(selectedConversation);

  useEffect(() => {
    setNewConvo(selectedConversation);
  }, [newconvo, selectedConversation]);

  return (
    <div className="h-screen bg-[url('/background-img.jpg')] bg-cover ">
      {newconvo && (
        <div style={{ position: "relative" }} className="h-screen">
          <div>Top Bar</div>
          <div style={{ overflowY: "auto", height: "calc(100% - 90px)" }}>
            {newconvo?.data?.toReversed().map((message, index) => {
              const isHelperDesk = message.from.name === "HelperDesk";
              const messageClass = isHelperDesk ? "justify-end" : "justify-start";
              const bgClass = isHelperDesk ? "bg-teal-500 text-white" : "bg-fuchsia-500 text-white";

              return (
                <div key={index} className={`flex ${messageClass}`}>
                  <div className={`h-4 ${bgClass}  rounded-md p-5 m-2 flex justify-center items-center origin-bottom-right rounded-sm`}>
                    {message.message}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: "sticky", bottom: 0, padding: "10px", background: "white" }}>
            <Formik
              initialValues={{
                message: "",
              }}
              onSubmit={async (values) => {
                const id = newconvo?.data?.find((message) => {
                  if (message.from.name !== "HelperDesk") {
                    return message.from.id;
                  }
                });
                const receivingId = id.from.id;
                const payload = {
                  message: values.message,
                  PageScopedId: receivingId,
                };
                SendMessage(payload);
              }}
            >
              <Form>
                <Field id="Message" name="message" placeholder="Type Here" className="w-4/6 p-3 bg-emerald-200 rounded-lg " />
                <button type="submit" className="mx-5 bg-black text-white rounded-md p-2">Submit</button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainConversation;
