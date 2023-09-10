import Header from "./Header";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import Footer from "./Footer";
import About from "./About";
import Button from "./Button";
import { auth, db1 } from "../firebase";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  collection,
  deleteDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Home = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  //set tasks
  useEffect(() => {
    //database calls
    const getTasksDatabase = async () => {
      const tasksFromDatabase = await fetchTasks();
      setTasks(tasksFromDatabase);
    };
    getTasksDatabase();
  }, [reload]);

  //Fetch Tasks
  const fetchTasks = async () => {
    //Pull document task from subcollection Tasks from Users/user/
    const querySnapshot = await getDocs(
      collection(db1, "users", `${auth.currentUser.uid}`, "tasks")
    );
    var tasksArray = [];
    querySnapshot.forEach((doc) => {
      tasksArray.push(doc.data());
    });

    return tasksArray;
  };

  //Add Task localhost server
  const addTask = (task) => {
    console.log(task);
    setTasks([...tasks, task]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db1, `users/${auth.currentUser.uid}/tasks/task${id}`));

    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggle reminder on database
  const toggleReminderDatabase = async (id) => {
    const taskRef = await doc(
      db1,
      `users/${auth.currentUser.uid}/tasks/task${id}`
    );
    const docSnap = await getDoc(taskRef);
    const data = docSnap.data();
    updateDoc(taskRef, {
      reminder: !data.reminder,
    });
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
          name={auth.currentUser.displayName}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && (
                  <AddTask onAdd={addTask} setReload={setReload} />
                )}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminderDatabase}
                  />
                ) : (
                  "No Tasks To Show"
                )}
                <Button
                  className=''
                  color='red'
                  text='Sign Out'
                  onClick={() => auth?.signOut()}
                />
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default Home;
