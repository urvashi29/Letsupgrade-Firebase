import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebase.config";

export default function Tasks() {
  // UI state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // form state
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingId, setEditingId] = useState(null);

  // filter state (priority)
  const [filterPriority, setFilterPriority] = useState("all"); // "all", "low", "high", "medium"

  const fetchTasks = async () => {
    //get the task from firestore
    setLoading(true);
    setError("");

    let ref = collection(db, "tasks");
    let q;
    if (filterPriority == "all") {
      q = query(ref, orderBy("createdAt", "desc")); //sorting based on creatdAt
    } else {
      q = query(ref, where("priority", "==", filterPriority));
    }

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        console.log(snap);
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        console.log(items);
        setTasks(items);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    console.log(tasks);
    return () => unsubscribe(); //unmounting in Reactjs
  };

  // Reactjs - useEffect()
  useEffect(() => {
    fetchTasks();
  }, [db, filterPriority]);

  //CRUD
  const onUpdate = () => {};

  const OnCreate = async (e) => {
    e.preventDefault(); //prevent the refresh of page
    setError("");
    if (!title.trim()) {
      setError("Title is required!");
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        priority,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setPriority("medium");
    } catch (e) {
      setError(e.message);
    }
  };

  // BOM -> js
  const onDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (err) {
      console.log(err);
    }
  };

  const beginEdit = (id) => {
    //write the logic to edit
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <section>
        <h2>{editingId ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={editingId ? onUpdate : OnCreate}>
          <div>
            <label>
              Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
            </label>
          </div>
          <div>
            <label>
              Priority
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit">{editingId ? "Update" : "Create"}</button>
            {editingId ? <button type="button">Cancel</button> : null}
          </div>
        </form>
        {error ? <p>Error: {error}</p> : null}
      </section>

      <hr />

      <section>
        <h2>Filter by priority</h2>
        <label>
          Show
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">all</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>
      </section>

      <section>
        <h2>Tasks</h2>
        {loading && <p>Loading...</p>}
        <ul>
          {tasks.map((t) => {
            return (
              <li key={t.id}>
                <h3>
                  {t.title} - {t.priority}
                  <button onClick={() => beginEdit(t.id)}>Edit </button>
                  <button onClick={() => onDelete(t.id)}>Delete </button>
                </h3>
              </li>
            );
          })}
        </ul>
      </section>

      <hr />
    </div>
  );
}

// HTML -> heading, list, div, semantic elements
// javascript
// async/await used to make js asynchronous
// OnCreate, onUpdate -> Js functions
// try & catch: error handling in javascript
// events -> onchange, onsubmit (javascript)
// callback js
// varible
