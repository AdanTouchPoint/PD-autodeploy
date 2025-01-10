"use client";
import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/cjs/Col";
import Alert from "react-bootstrap/Alert";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import { animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";

const ManualEmailForm = ({
  dataUser,
  setDataUser,
  emailData,
  clientId,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  mainData,
  isLoading,
  allDataIn,
  setActiveSection,
}) => {
  useEffect(() => {
    const text = mainData.emailform?.message?.text
    setDataUser({
      ...dataUser,
      message: text,
    });
  }, []);
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const errorHandler = (message) => {
    return (
      <Alert variant="danger">
        {message}
      </Alert>
    );
  };
  const handleMessageChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      subject: e.target.name === "subject" ? e.target.value : dataUser.subject,
      message: e.target.name === "message" ? e.target.value : dataUser.message,
    });
  };

  const verifyData = async (dataUser) =>{
    const { subject, message } = await dataUser;
    if (
      subject === undefined ||
      message === undefined ||
      subject === "" ||
      message === ""
    ) {
      setValid(false)
      setError("form");
      const options = {
        duration: 100,
        smooth: true,
      };
      scroll.scrollToTop(options)
      return false
    }
    return true
  }
  const handleSend = async (e) => {
    e.preventDefault();
    const { subject, message, emailUser, userName } = await dataUser;
    setError("")
    const validData = await verifyData(dataUser)
    if (validData === false ) {
      setError("form")
      return
    }
    setValid(true)
    let currentSubject = subject;
    const messageEmail = message?.replace(/\n\r?/g, "<br/>");
    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendBatchEmails,
      clientId,
      `to=${
        allDataIn.length > 0 ? allDataIn : emailData.email
      }&subject=${currentSubject}&firstName=${userName}&emailData=${emailUser}&text=${encodeURIComponent(messageEmail)}`
    );
    if (payload.success === true) {
      fetchLeads(
        true,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        messageEmail,
        "message-single-representative-lead"
      );
      setActiveSection("emailPreview");
    }
    if (payload.success !== true) {
      fetchLeads(
        false,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        messageEmail,
        "message-sinlge-representative-not-sended-lead"
      );
      setError("email");
    }
  };
  const back = (e) => {
    e.preventDefault();
    setActiveSection("listSection");
  };
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  return (
    <>
      {isLoading == true ? (
        <div className="emailContainer">{loading("spinner-containerB")}</div>
      ) : (
        <div className={"emailContainer"}>
          {error === "form"
            ? errorHandler("llena todos los campos")
            : error === "email"
            ? errorHandler("nose envio el email ")
            : null}
          <Form
            name="fm-email"
            onSubmit={handleSend}
            noValidate
            validated={valid}
          >
            <div>
              <>
                <h3 className="ia-instructions-title main-text-title">
                  {mainData.emailform?.title?.text
                    ? mainData.emailform?.title?.text
                    : "Write your email"}
                </h3>
                <p className="ia-instructions-p main-text-instruction">
                  {mainData.emailform?.instructions?.text
                    ? mainData.emailform?.instructions?.text
                    : "Customer instructions for the user. Here the client can give the user recommendations on what to mention in the email and how to write the subject."}
                </p>
              </>
              <div>
                <div>
                  <Col>
                    <Form.Group>
                      <Form.Label className="subject-label">
                        Subject Line
                      </Form.Label>
                      <Form.Control
                        id="subject-emailform"
                        onChange={handleMessageChange}
                        name="subject"
                        type="text"
                        defaultValue={mainData.emailform?.subject?.text}
                        className="subject-input"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="subject-label">Email</Form.Label>
                      <Form.Control
                        id="message-emailform"
                        onChange={handleMessageChange}
                        as="textarea"
                        rows={12}
                        name="message"
                        defaultValue={mainData.emailform?.message?.text}
                        className="email-ia-text-area"
                        required
                      />
                    </Form.Group>
                  </Col>
                </div>
                <div
                  className={
                    "container buttons-container-email-form btn-container-checklist"
                  }
                >
                  <Button
                    onClick={back}
                    className={"button-email-form back-button"}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSend}
                    className={"button-email-form secundary-btn"}
                  >
                    Send!
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default ManualEmailForm;
