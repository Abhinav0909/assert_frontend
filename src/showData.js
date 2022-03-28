import axios from "axios";
import React from "react";
function ShowData({ values, status }) {
  console.log("Show Data", values);
  const deleteData = (id) => {
    console.log(id);
    console.log("TRYING");
    axios
      .delete(`http://localhost:5000/${id}`)
      .then((_) => {
        console.log("Delete a task");
        console.log(_.data);
      })
      .catch((e) => console.log(e));
  };
  const updateData = (id) => {
    axios
      .patch(`http://localhost:5000/${id}`, {
        header: "Updated Data",
        description: "Desc",
      })
      .then((_) => {
        console.log("Update a task");
        console.log(_.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {values.map((data) => (
        <div
          key={values.indexOf(data)}
          style={{
            boxShadow: "5px 10px #888888",
            width: "40%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {data.isCompleted === false && (
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p style={{ marginRight: "10px", float: "left",fontFamily:"monospace" }}>
                  Title: {data.header}
                </p>
                <p style={{ marginRight: "10px",fontFamily:"monospace" }}>
                  Description: {data.description}
                </p>
                <p style={{ marginRight: "10px",fontFamily:"monospace" }}>
                  Status: {data.isCompleted.toString()}
                </p>
              </div>
              <button
                type="submit"
                style={{
                  cursor: "pointer",
                  margin: "10px ",
                  background: "wheat",
                  fontFamily:"monospace"
                }}
                onClick={(e) =>  {deleteData(data._id);}}
              >
                Delete
              </button>
              <button
                style={{
                  cursor: "pointer",
                  margin: " 10px ",
                  background: "wheat",
                  fontFamily:"monospace"
                }}
                onClick={() => updateData(data._id)}
              >
                Update
              </button>
              <button
                style={{
                  cursor: "pointer",
                  margin: " 10px ",
                  background: "wheat",
                  fontFamily:"monospace"
                }}
                onClick={()=>status(data._id)}
              >
                Complete
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
export default ShowData;
