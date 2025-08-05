"use client";
import React, { useState } from "react";
import List from "./List";
import ListSelect from "./ListSelect";
import ManualEmailForm from "./ManualEmailForm";
import ThankYou from "./ThankYou";
import UserInfoForm from "./UserInfoForm";
import EmailPreview from "./EmailPreview";
import { useStateContext } from "../context/StateContext";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/cjs/Button";

const MainForm = () => {
  const { colors,activeSection, mainData, senator, mp, setMany, setEmailData, dataUser, backendURLBase, endpoints, clientId, setActiveSection } = useStateContext();
  const [emails, setEmails] = useState([]);
console.log({colors, activeSection, mainData, senator, mp, setMany, setEmailData, dataUser, backendURLBase, endpoints, clientId, setActiveSection });
  const renderSection = () => {
    switch (activeSection) {
      case 'mainForm':
        return <UserInfoForm />;
      case 'listSection':
        const selectAll = (e) => {
          fetchLeads(
            true,
            backendURLBase,
            endpoints,
            clientId,
            dataUser,
            setEmailData,
            "NA",
            "checkbox-list-email-preference-lead"
          );
          setMany(true);
          setEmails([...mp, ...senator]);
          setActiveSection('listSelect');
          e.preventDefault();
        };
        const back = (e) => {
          e.preventDefault();
          setActiveSection('mainForm');
        };
        return (
          <div className={"container-content senators-container"}>
            <h3 className="main-texts-color instruction-text">
              Select your representatives
            </h3>
            <div className="note-container">
              <span
                className="link-simulation links-checkboxes-color change-mode-list-btn"
                onClick={selectAll}
              >
                Email / all several representatives
              </span>
              <p>{mainData.note}</p>
            </div>
            <div className="list-container">
              <h5 className="representative-position">Senators</h5>
              <div className="representatives-container">
                {senator && senator.length > 0 ? (
                  senator.map((mps, index) => (
                    <List
                      mps={mps}
                      key={index}
                    />
                  ))
                ) : (
                  <Alert variant="danger">
                    No representatives have been found with the state that has
                    provided us
                  </Alert>
                )}
              </div>
            </div>
            <div className="list-container">
              <h5 className="representative-position">MP`S</h5>
              <div className="representatives-container">
                {mp && mp.length > 0 ? (
                  mp.map((mps, index) => (
                    <List
                      mps={mps}
                      key={index}
                    />
                  ))
                ) : (
                  <Alert variant="danger">
                    No representatives have been found with the state that has
                    provided us
                  </Alert>
                )}
              </div>
            </div>
            <Button className="back-button" onClick={back}>
              Back
            </Button>
          </div>
        );
      case 'listSelect':
        return (
          <div className={"container-content senators-container"}>
            <h2 className="main-texts-color instruction-text">
              Select all representatives you’d like to email
            </h2>
            <div className="representatives-container">
              {mp.length > 0 || senator.length > 0 ? (
                <ListSelect
                  emails={emails}
                />
              ) : (
                <Alert variant="danger">
                  No representatives have been found with the state that has
                  provided us
                </Alert>
              )}
            </div>
          </div>
        );
      case 'emailform':
        return <ManualEmailForm />;
      case 'emailPreview':
        return <EmailPreview />;
      case 'typ':
        return <ThankYou />;
      default:
        return <UserInfoForm />;
    }
  };

  if (!mainData) return "loading datos";
  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"form-container"}>
        {renderSection()}
      </div>
    </div>
  );
};

export default MainForm;
