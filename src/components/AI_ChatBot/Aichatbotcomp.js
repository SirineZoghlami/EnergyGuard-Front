 //@ts-nocheck
 import React, { useState } from 'react';
 import axios from 'axios';
 import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
 import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
 import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
 import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import RobotSVg from 'assets/images/RobotSvg.svg'
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";



 const apiKey = "";
 

 
 function SimpleForm() {
   const [messages, setMessages] = useState([
     {
       message: "Besoin de renseignements sur un équipements industriels ? Tapez votre demande ici.",
       sentTime: "just now",
       sender: "ChatGPT",
     },
   ]);
   const [isTyping, setIsTyping] = useState(false);
 
   const handleSend = async (message) => {
     const newMessage = {
       message,
       direction: 'outgoing',
       sender: "user",
     };
   
     const newMessages = [...messages, newMessage];
   
     setMessages(newMessages);
   
     setIsTyping(true);
   
     try {
       const financialCheckResponse = "1"
       ;
   
       const responseData = financialCheckResponse;
       
       if (responseData ) {
   
         if (message) {
           console.log("yess")
           const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              messages: [{ role: "system", content:`${message}` }],
              model: "gpt-3.5-turbo",
            })
          });
   
           const responseData1 = await response.json();
           console.log(responseData1)
           const responseData = responseData1.choices?.[0]?.message?.content || '';
   
           if (responseData ) {
             const sanitizedMessage = responseData;
             const apiResponses = [
               {
                 message: sanitizedMessage,
                 sender: "ChatAPI",
                 sentTime:"just now",
               },
             ];
   
             setMessages([...newMessages, ...apiResponses]);
           } else {
             console.error("API response format is unexpected:", responseData);
             // Handle unexpected API response format
           }
         } else {
           console.log("noo")
           const apologyMessage = {
             message: "Sorry,",
             sender: "ChatGPT",
           };
           setMessages([...newMessages, apologyMessage]);
         }
       } else {
         console.error("API response format is unexpected:", responseData);
         // Handle unexpected API response format
       }
     } catch (error) {
       console.error("Error processing message:", error);
       // Handle error scenario
     } finally {
       setIsTyping(false); // Ensure that isTyping is turned off, whether successful or in error
     }
   };
   
 
   return (
    <DashboardLayout>

    <DashboardNavbar />
    <SoftBox boxShadow={3} borderRadius="12px" p={3} >
   
       <CardHeader>
        
         <CardTitle>
         <div className='symbol symbol-50px me-5'>
                       <span className='symbol-label '>
                       <img
          src={RobotSVg}
            style={{height : '75px', width : '75px'}}
          alt=''
                     />
                       </span>
                     </div>
           <h3>  
    Assistant d&apos;information sur les équipements industriels
  </h3>
         </CardTitle>

       </CardHeader>
       
       <CardBody >
           <Card>
             <MessageList
               scrollBehavior="smooth"
               typingIndicator={isTyping ? <TypingIndicator content="en train d'ecrire..." /> : null}
             >
               {messages.map((message, i) => (
                 <Message key={i} model={message}>
                  
                   {message.sender === 'ChatAPI' }
                   
                 
                     {messages.map((message, i) => (
                 <Message key={i} model={message}>
                  
                   {message.sentTime}
                   
               
                 </Message>
            

               ))}
                 </Message>
            

               ))}
               
           
             </MessageList>
           
             <MessageInput placeholder="Ecrire votre message ici" onSend={handleSend} />
           </Card>
         </CardBody>
       </SoftBox>

     </DashboardLayout>
   );
 }
 
 export default SimpleForm;
 