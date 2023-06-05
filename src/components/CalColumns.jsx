import 'bootstrap/dist/css/bootstrap.css';
import RowGrid from './RowGrid';

const padTwo = (num) => {
  return `${num}`.padStart(2, '0');
};

const getIdentifier = (date) => {
  return `${date.getFullYear()}-${padTwo(date.getMonth() + 1)}-${padTwo(
    date.getDate()
  )}`;
};

const CalColumns = ({ day, id, tasks, startOfTheWeek, currDate }) => {
  const dateObj = new Date(startOfTheWeek);
  dateObj.setDate(dateObj.getDate() + id);
  const objKey = getIdentifier(dateObj);
  return (
    <div className="col p-0">
      <div
        style={{
          height: '50px',
          border: '1px solid black',
          backgroundColor: currDate.getDay() === id ? '#FFFAE3' : '',
          textAlign: 'center',
          padding: '12px',
        }}
      >
        {day} {dateObj.getDate()}
      </div>
      <div
        style={{
          backgroundColor: currDate.getDay() === id ? '#FFFAE3' : '',
          position: 'relative',
        }}
      >
        <RowGrid eventList={tasks[objKey] || []} />
      </div>
    </div>
  );
};

export default CalColumns;
