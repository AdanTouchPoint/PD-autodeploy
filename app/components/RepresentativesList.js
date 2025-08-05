"use client";
import React, { useState, useMemo } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import List from "./List";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import { useStateContext } from "../context/StateContext";
const RepresentativesList = ({ setActiveSection, setEmails, setMany }) => {
  const {
    mainData,
    senator,
    mp,
    backendURLBase,
    endpoints,
    clientId,
    dataUser,
    emailData,
  } = useStateContext();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSenators = useMemo(() => 
    senator.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [senator, searchTerm]
  );

  const filteredMps = useMemo(() => 
    mp.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [mp, searchTerm]
  );

  const selectAll = (e) => {
    fetchLeads(
      true,
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emailData,
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
    setActiveSection('mainform');
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

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </Form.Group>

      <div className="list-container">
        <h5 className="representative-position">Senators</h5>
        <div className="representatives-container">
          {filteredSenators.length > 0 ? (
            filteredSenators.map((mps, index) => (
              <List
                mps={mps}
                key={index}
                setActiveSection={setActiveSection}
              />
            ))
          ) : (
            <Alert variant="info">
              No senators found matching your search.
            </Alert>
          )}
        </div>
      </div>

      <div className="list-container">
        <h5 className="representative-position">MP`S</h5>
        <div className="representatives-container">
          {filteredMps.length > 0 ? (
            filteredMps.map((mps, index) => (
              <List
                mps={mps}
                key={index}
                setActiveSection={setActiveSection}
              />
            ))
          ) : (
            <Alert variant="info">
              No MPs found matching your search.
            </Alert>
          )}
        </div>
      </div>
      <Button className="back-button" onClick={back}>
        Back
      </Button>
    </div>
  );
};

export default RepresentativesList;