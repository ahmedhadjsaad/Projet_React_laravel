import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ViewEvent = (props) => {
  const events = useSelector((state) => state.eventReducer.events);

  const deleteEvent = async (id) => {
    const res = await axios.delete(
      `http://localhost:8000/api/delete-event/${id}`
    );
    if (res.data.status === 200) {
      toast.success("✅ Event Deleted Successfuly", { containerId: "A" });
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-title">
          {console.log(`events`, events)}
          <div
            style={{
              marginTop: "10px",
            }}
          >
            <Link to="/">
              {" "}
              <button
                style={{
                  background: "#1ccb9e",
                  border: "1px solid #1ccb9e",
                  borderRadius: "5px",
                }}
                type="button"
                className="btn btn-info"
              >
                {" "}
                <i
                  style={{ paddingRight: "5px" }}
                  className="fas fa-arrow-circle-left"
                ></i>
                Retour
              </button>
            </Link>
          </div>
          <div className="col-lg-12">
            <h4 className="calendar-app">Calendar App</h4>
          </div>
        </div>
        <table style={{ width: "100%", marginTop: "5%" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "center",
                  border: "solid",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Event
              </th>
              <th
                style={{
                  textAlign: "center",
                  border: "solid",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Date
              </th>
              <th
                style={{
                  textAlign: "center",
                  border: "solid",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Heure Debut
              </th>
              <th
                style={{
                  textAlign: "center",
                  border: "solid",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Heure Fin
              </th>
              <th
                style={{
                  textAlign: "center",
                  border: "solid",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Supp{" "}
              </th>
            </tr>
          </thead>
          {events.length > 0
            ? events.map((el) => (
                <tbody>
                  <tr>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                      }}
                    >
                      {el.title}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                      }}
                    >
                      {el.date}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                      }}
                    >
                      {el.timeBegin}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                      }}
                    >
                      {el.timeEnd}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        border: "solid",
                        color: "black",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#D9534F",
                          borderRadius: "5px",
                        }}
                        onClick={() => deleteEvent(el.id)}
                      >
                        <i
                          style={{ color: "white" }}
                          className="fas fa-trash-alt"
                        ></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
            : null}
        </table>
      </div>
      <ToastContainer
        transition={Flip}
        enableMultiContainer1
        containerId={"A"}
        position={toast.POSITION.TOP_RIGHT}
        autoClose={2500}
      />
    </div>
  );
};

export default ViewEvent;
