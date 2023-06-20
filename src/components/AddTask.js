import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState(format(new Date(), "MMMM d, yyyy h:mm a"));
  const [reminder, setReminder] = useState(false);

  //Filter passed time select if adding calendar for current day
  const filterPassedTime = (day) => {
    const currentDate = new Date();
    return day > currentDate;
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

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  );
};

export default AddTask;
