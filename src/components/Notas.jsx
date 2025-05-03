import { useState } from "react";
import './Apart_info.css';

function App () {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [notes, setNotes] = useState(data);
  const [count, setCount] = useState(4);

  function remove(id) {
    setNotes(notes.filter((e) => e.key !== id))
  }

  function handle() {
    if (!title || !des) {
        window.alert("Incomplete input");
        return;
    }
    setNotes([...notes, { key: count, title: title, des: des }]);
    setCount(count + 1);
    setTitle("");
    setDes("");
    console.log(notes);
  }

  return (
    <div id="daily-info"style={{ position: "relative", height: "auto", width: "100%" }}>
        <div>
            <div>
                <h2>NOTA</h2>
            </div>
            <div>
                {notes.map((e) => (
                    <div>
                        <div style={{ width: "90%" }}>
                            <h4>Title: {e.title}</h4>
                            <p>Note: {e.des}</p>
                        </div>
                        <button
                            type="input"
                            style={{
                                fontSize: "20px",
                                width: "8%",
                                height: "35px",
                                padding: "0 2% 0 2%",
                                color: "black",
                            }}
                            onClick={() => remove(e.key)}
                        >
                            X
                        </button>
                    </div>
                ))}
                <div className="add">
                    <h3>Add Notes</h3>
                    <input
                        type="text"
                        id="title"
                        placeHolder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        id="description"
                        placeholder="Notes"
                        value={des}
                        onChange={(e) => {
                            setDes(e.target.value);
                        }}
                    ></input>
                    <button type="submit" onClick={handle}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
);
}

const data = [
  {
      key: 0,
      title: "Html",
      des: "HyperText MarkUp Language",
  },
  { key: 1, title: "CSS", des: "StyleSheet" },
  {
      key: 2,
      title: "JavaScript",
      des: "Scripting language for web",
  },
  {
      key: 3,
      title: "React",
      des: "JavaScript framework",
  },
];

export default App;