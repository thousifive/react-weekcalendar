import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const RowGrid = ({ eventList }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const openTask = (data) => {
    setData(data);
    setOpenModal(true);
  };

  const closeTask = () => {
    setData({});
    setOpenModal(false);
  };

  return (
    <>
      {Array.from({ length: 24 }, () => []).map((row, id) => (
        <div
          key={id}
          className="row"
          style={{
            height: '50px',
            border: '1px solid black',
            margin: 0,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        ></div>
      ))}
      {/* Todo */}
      {eventList?.map((e, id) => (
        <div
          key={id}
          className="row"
          style={{
            top: e?.top || 0,
            left: 0,
            right: 0,
            height: e.height,
            border: '1px solid black',
            margin: 0,
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: '#0000ffba',
            position: 'absolute',
            textAlign: 'start',
          }}
          onClick={() => openTask(e)}
        >
          <span style={{ color: 'white' }}>{e.title}</span>
        </div>
      ))}
      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Description: {data.description}</div>
          <div>Start Time: {data.time}</div>
          <div>End Time; {data.endTime}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTask}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RowGrid;
