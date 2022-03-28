import React, { useState,useEffect } from "react";
import axios from "axios";
import ShowData from "./showData";
function App() {
  const [values, setValues] = useState([]);
  const [header,setHeader] = useState("");
  const [description,setDescription] = useState("");
  const postData = () => {
    axios
      .post("http://localhost:5000/", {
        header: header,
        description:description
      })
      
      .then((_) => {
        console.log("POSTED"); 
        axios
        .get("http://localhost:5000/")
        .then((res) => {
            console.log(res);
          setValues( res.data );
        })
        .catch((e) => {
          console.log(e);
        });})
      .catch((e) => {
        console.log(e);
      });
  };

  const completeStatus = (id) => {
    console.log(id);
    axios
    .patch(`http://localhost:5000/status/${id}`)
    .then(() => {
      axios
        .get("http://localhost:5000/")
        .then((res) => {
            console.log(res);
          setValues( res.data );
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
  }
  
  useEffect(() => {
    const fetchData = () => {
      if(values.length === 0){
        axios
        .get("http://localhost:5000/", values)
        .then(async (res) => {
            console.log("GET", res.data);
          setValues( res.data );
        })
        .catch((e) => {
          console.log(e);
        });
      }
    };
    fetchData();
  }, [values]);
  return (
    <div className="App">
      <form
        
        onSubmit={(e) => {
          e.preventDefault();
          postData();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          maxWidth: "20%",
        }}
      >
        <label style={{ marginBottom: "6px",fontFamily:"monospace" }}>Heading</label>
        <input placeholder="Enter details" onChange={(e)=> setHeader(e.target.value)} id="header" required />
        <label style={{ marginBottom: "6px" ,fontFamily:"monospace"}}>Description</label>
        <textarea
          placeholder="Enter the information"
          onChange={(e)=> setDescription(e.target.value)}
          id="description"
          style ={{marginBottom:"10px",fontFamily:"monospace"}}
          required
        />
        <button
          type="submit"
          style={{
            border: "2px solid green",
            background: "green",
            borderRadius: "10px",
            maxWidth: "100%",
            margin: "auto",
            fontFamily:"monospace"
          }}
        >
          Submit
        </button>
      </form>
      <ShowData values={values} status ={completeStatus}/>
    </div>
  );
}

export default App;
