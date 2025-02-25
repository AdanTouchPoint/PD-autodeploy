"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/cjs/Col";
import Alert from "react-bootstrap/Alert";
import Loader from "react-loader-spinner";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import { urlEncode } from "../assets/helpers/utilities";
import { useCompletion } from "ai/react";
import { animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";
import ManualEmailForm from "./ManualEmailForm";
const EmailForm = ({
  leads,
  setLeads,
  questions,
  dataUser,
  setDataUser,
  hideIAPrompt,
  setHideIAPrompt,
  emailData,
  setEmailData,
  clientId,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  mainData,
  allDataIn,
  setAllDataIn,
  setMany,
  many,
  isLoading,
}) => {

  
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);

  const { userName, subject } = dataUser;
  const [emailMessage, setEmailMessage] = useState({});
  const [requestCompletion, setRequestCompletion] = useState([]);
  const [ableGenIA, setAbleGenIA] = useState(true);
  const [continueBtn, setcontinueBtn] = useState(true);
  
  
  const handleMessageChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      subject: e.target.name === "subject" ? e.target.value : dataUser.subject,
      message: e.target.name === "message" ? e.target.value : dataUser.message,
    });
    if (!dataUser.message || dataUser.message === '') {
      setAbleGenIA(false);
    }
    // console.log(dataUser);
  };
  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      let payload;
      // console.log(dataUser, 'sendmany')
      if (many === true) {
        payload = await fetchData(
          "GET",
          backendURLBaseServices,
          endpoints.toSendBatchEmails,
          clientId,
          `to=${allDataIn}&subject=${dataUser.subject}&firstName=${
            dataUser.userName
          }&emailData=${
            dataUser.emailUser
          }&text=${dataUser.message.replace(/\n\r?/g, "<br/>")}`
        )
      } else{
        // console.log(allDataIn);
        payload = await fetchData(
          "GET",
          backendURLBaseServices,
          endpoints.toSendBatchEmails,
          clientId,
          `to=${emailData.email}&subject=${dataUser.subject}&firstName=${
            dataUser.userName
          }&emailData=${
            dataUser.emailUser
          }&text=${dataUser.message.replace(/\n\r?/g, "<br/>")}`
        );

      }
      
      // console.log(payload.success);
      const messageEmail = dataUser.message.replace(/\n\r?/g, "<br/>")
      if (payload.success === true) {
        fetchLeads(
          true,
          backendURLBase,
          endpoints,
          clientId,
          dataUser,
          emailData,
          messageEmail,
          'message'
        );
        setLeads(leads + 1);
      } else {
        fetchLeads(
          false,
          backendURLBase,
          endpoints,
          clientId,
          dataUser,
          emailData,
          messageEmail,
          'message-not-sended'
        );
        throw new Error("Email not sent successfully");
      }
    } catch (error) {
      console.error("Error handling continue:", error);
      // Mostrar un mensaje de error al usuario, puedes agregar un estado para manejarlo
      setError(true);
    }
  };
  const back = (e) => {
    e.preventDefault();
    setHideEmailForm(true)
    setHideIAPrompt(false);
    
  };
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const manualMailChange = async (e) =>{
    e.preventDefault();
    setDataUser({
      ...dataUser,
      subject:'',
      message:''
    })

  }
  return (
    <>
      {/* {isLoading == true ? (
              <div className="emailContainer">
                {loading("spinner-containerB")}

              </div>
            ) : ( */}
            <div className={"emailContainer"} >
        {error ? (
          <Alert variant={"danger"}>
            All fields are required, please fill in the missing ones.
          </Alert>
        ) : null}
        {console.log(allDataIn)}
        <Form
          name="fm-email"
          // onSubmit={handleContinue}
          noValidate
          validated={validated}
        >
          <div>
            <>
            <h3 className="ia-instructions-title main-text-title">Edit & Send</h3>
            <p className="ia-instructions-p main-text-instruction">Edit and/or send the email that was written for you by AI. </p> 
            
            </>  
           
            
              <div>
                <div>
                  <Col>
                    
                      <Form.Group>
                        <Form.Label className="label-ia-prompt">
                          Subject Line
                        </Form.Label>
                        <Form.Control
                          id="subject-emailform"
                          onChange={handleMessageChange}
                          name="subject"
                          type="text"
                          defaultValue={dataUser.subject}
                        />
                      </Form.Group>
                    
                    <Form.Group>
                     <Form.Label className="label-ia-prompt">Email</Form.Label>
                      
                      
                      <Form.Control
                        id="message-emailform"
                        onChange={handleMessageChange}
                        as="textarea"
                        rows={12}
                        name="message"
                        defaultValue={dataUser.message}
                        className="email-ia-text-area"
                        required
                      />
                    </Form.Group>
                  </Col>
                </div>
                <div className={"container buttons-container-email-form btn-container-checklist"}>
                  <Button onClick={back} className={"button-email-form back-button"}>
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleContinue}
                    className={"button-email-form secundary-btn"}
                  >
                    Send
                  </Button>
                </div>
              </div>
              <div className="change-to-manual-email-container">
          <span className="change-to-manual-email-letters" onClick={manualMailChange}>OR Click here to write without using AI <u className="change-to-manual-email-btn">Write it yourself</u></span>
        </div>
          </div>
        </Form>
        
        </div>
      {/* )} */}
      <ManualEmailForm
        many={many}
        setMany={setMany}
        setLeads={setLeads}
        leads={leads}

        dataUser={dataUser}
        emailData={emailData}
        setEmailData={setEmailData}
        setDataUser={setDataUser}
        clientId={clientId}
        endpoints={endpoints}
        backendURLBase={backendURLBase}
        backendURLBaseServices={backendURLBaseServices}
        mainData={mainData}
        questions={questions}
        allDataIn={allDataIn}
        setAllDataIn={setAllDataIn}
        
      />
    </>
  );
};

export default EmailForm;
