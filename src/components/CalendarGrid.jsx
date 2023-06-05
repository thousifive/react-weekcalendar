import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import CalColumns from './CalColumns';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const timeSlots = [
  '',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const CalendarGrid = () => {
  const currDate = useSelector((state) => state.currentDate);
  const tasks = useSelector((state) => state.tasks);
  let startOfTheWeek = new Date(currDate);
  startOfTheWeek.setDate(startOfTheWeek.getDate() - startOfTheWeek.getDay());

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50px' }}>
          {timeSlots.map((time, id) => (
            <div
              key={time}
              className="row"
              style={{
                height: '50px',
                borderBottom: '1px solid',
                display: 'block',
              }}
            >
              <span
                style={{
                  padding: '0px 10px 0 0',
                  backgroundColor: 'white',
                  position: 'relative',
                  top: '-12px',
                }}
              >
                {time}
              </span>
            </div>
          ))}
        </div>
        <div className="row" style={{ margin: 0, flexGrow: 1 }}>
          {daysOfWeek.map((day, id) => (
            <CalColumns
              key={day}
              day={day}
              id={id}
              tasks={tasks}
              startOfTheWeek={startOfTheWeek}
              currDate={currDate}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CalendarGrid;
