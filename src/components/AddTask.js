import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { auth, db1 } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const AddTask = ({ onAdd, setReload }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState(format(new Date(), "MMMM d, yyyy h:mm a"));
  const [reminder, setReminder] = useState(false);
  var docuID = "";

  //Filter passed time select if adding calendar for current day
  const filterPassedTime = (day) => {
    const currentDate = new Date();
    return day > currentDate;
  };
  const populateTasks = ({ text, day, reminder }) => {
    docuID = Math.floor(Math.random(5) * parseInt(new Date(day).getTime()));
    setDoc(doc(db1, `users/${auth.currentUser.uid}/tasks/task${docuID}`), {
      task: text,
      date: day,
      reminder: reminder,
      id: docuID,
    });
    docuID = "";
  };
  //If trying to add empty task
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }
    //send
    onAdd({ text, day, reminder });
    populateTasks({ text, day, reminder });
    setText("");
    setDay(format(new Date(), "MMMM d, yyyy h:mm a"));
    setReminder(false);
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label>Day & Time</label>
        <DatePicker
          dateFormat='MMMM d, yyyy h:mm a'
          selected={new Date(day)}
          minDate={new Date()}
          onChange={(date) =>
            setDay(format(new Date(date), "MMMM d, yyyy h:mm a"))
          }
          timeIntervals={10}
          showTimeSelect
          filterTime={filterPassedTime}
        />
      </div>

      <div className='form-control form-control-check'>
        <label>Set Reminder</label>

        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.target.checked)}
        />
      </div>

      <input
        type='submit'
        onClick={() => setReload((prev) => !prev)}
        value='Save Task'
        className='btn btn-block'
      />
    </form>
  );
};

export default AddTask;
