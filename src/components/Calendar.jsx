import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDate, addTask } from '../redux/actions';
import CalendarGrid from './CalendarGrid';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const WeekCalendar = () => {
  const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currTask, setCurrTask] = useState({});
  const [throwNotification, setThrowNotification] = useState(false);
  const [openTask, setOpenTask] = useState(false);
  const [taskToShow, setTaskToShow] = useState({});

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const getTimeInMins = (time, date) => {
    const [hr, min] = time?.split(':');
    const newDate = new Date(date);
    newDate.setHours(hr);
    newDate.setMinutes(min - 5);
    return newDate - new Date();
  };

  const showNotification = (task) => {
    setCurrTask(task);
    setThrowNotification(true);
  };

  const closeNotification = () => {
    setCurrTask({});
    setThrowNotification(false);
  };

  const renderNotification = (data) => {
    let timeDiff = getTimeInMins(data.time, data.date);
    if (timeDiff > 0) {
      setTimeout(() => showNotification(data), timeDiff);
    }
  };

  useEffect(() => {
    Object.entries(tasks).forEach(([key, value]) =>
      value.map((v) => renderNotification(v))
    );
  }, []);

  const handleNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    dispatch(setCurrentDate(nextWeek));
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    dispatch(setCurrentDate(prevWeek));
  };

  const saveTask = () => {
    if (title && date && time && endTime) {
      const [hr, min] = time.split(':');
      const [endHr, endMin] = endTime.split(':');
      const diff = +endHr + +endMin / 60 - (+hr + +min / 60);

      const task = {
        title,
        description,
        date,
        time,
        endTime,
        top: `${(+hr + +min / 60) * 50}px`,
        height: `${diff * 50}px`,
      };
      dispatch(addTask(task));
      renderNotification(task);
      closeTask();
    } else alert('Please add all the required data');
  };

  const closeTask = () => {
    setOpenModal(false);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setEndTime('');
  };

  const renderTask = (data) => {
    closeNotification();
    setOpenModal(true);
    setOpenTask(true);
    setTaskToShow(data);
  };

  const closeOpenTask = () => {
    setOpenModal(false);
    setOpenTask(fasle);
    setTaskToShow({});
  };

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button className="btn btn-primary m-3" onClick={handlePrevWeek}>
          Previous Week
        </Button>
        <h1 className="mt-2 mb-1" style={{ textAlign: 'center' }}>
          Current Date: {currentDate.toDateString()}
        </h1>
        <Button className="btn btn-primary m-3" onClick={handleNextWeek}>
          Next Week
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          className="btn btn-secondary m-3"
          onClick={() => dispatch(setCurrentDate(new Date()))}
        >
          Today
        </Button>
        <Button
          variant="primary"
          style={{ height: '38px' }}
          onClick={() => setOpenModal(true)}
        >
          Create Task
        </Button>
      </div>

      <h2>Week Calendar</h2>
      <div>
        <CalendarGrid />
      </div>

      <Modal show={openModal} onHide={() => setOpenModal(false)}>
        {!openTask ? (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Add Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add task title"
                    required
                    value={title}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeTask}>
                Close
              </Button>
              <Button variant="primary" onClick={saveTask}>
                Save Task
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Header closeButton>
              <Modal.Title>{taskToShow.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Description: {taskToShow.description}</div>
              <div>Start Time: {taskToShow.time}</div>
              <div>End Time; {taskToShow.endTime}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeOpenTask}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>

      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Toast show={throwNotification} onClose={closeNotification}>
          <Toast.Header>
            <strong className="me-auto">{currTask.title}</strong>
          </Toast.Header>
          <Toast.Body>
            <p>Remainder!, You have a task in 5 mins</p>
            <Button variant="secondary" onClick={() => renderTask(currTask)}>
              View
            </Button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default WeekCalendar;
