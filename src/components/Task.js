import { FaTimes } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      key={task.id}
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.task}
        {""}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            onDelete(task.id);
          }}
        />
      </h3>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
