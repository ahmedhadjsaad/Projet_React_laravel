import React, { useState } from "react";
import Calendar from "react-awesome-calendar";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const CalendarApp = (props) => {
  const [modal, setModal] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [eventToday, setEventToday] = useState([]);
  const events = useSelector((state) => state.eventReducer.events);

  const getEventToday = async (e) => {
    var month = parseInt(e.month) + 1;
    var month = month.toString();
    if (month.length === 1) {
      var month = "0" + month;
    }
    var day = parseInt(e.day);
    var day = day.toString();
    if (day.length === 1) {
      var day = "0" + day;
    }
    var date = e.year + "-" + month + "-" + day;
    const res = await axios.get(`http://localhost:8000/api/get-event/${date}`);
    console.log(`res.data`, res.data);
    if (res.data.status === 200) {
      setEventToday(res.data.events);
    }
    setModal(true);
    setDay(day);
    setMonth(month);
    setYear(parseInt(e.year));
  };

  const openModal = () => {
    setModal(!modal);
  };

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
        <div
          style={{ display: "flex", justifyContent: "space-around" }}
          className="row bg-title"
        >
          <div
            className="col-lg-4"
            style={{
              marginTop: "10px",
            }}
          >
            <Link to="/AddEvent">
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
                <i style={{ paddingRight: "5px" }} className="fas fa-plus"></i>
                Add Event
              </button>
            </Link>
          </div>
          <div className="col-lg-4">
            <h4 className="calendar-app">Calendar App</h4>
          </div>
          <div
            className="col-lg-4"
            style={{
              marginTop: "10px",
            }}
          >
            <Link to="/ViewEvent">
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
                <i style={{ paddingRight: "5px" }} className="far fa-eye"></i>
                View Event
              </button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="white-box">
              <div className="row">
                <Calendar
                  events={events}
                  onClickTimeLine={(e) => getEventToday(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        style={{ maxWidth: "700px", width: "100%" }}
        isOpen={modal}
        toggle={(e) => openModal(e)}
        fade={false}
      >
        <ModalHeader toggle={(e) => openModal(e)}>
          <h3
            style={{ textAlign: "center", color: "brown", fontWeight: "bold" }}
          >
            Date : {year}-{month}-{day}
          </h3>
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              fontFamily: "Montserrat, sans-serif",
              FontSize: "14px",
              FontWeight: "700",
              LineHeight: "18.375px",
              width: "100%",
            }}
          >
            <div>
              <table style={{ width: "100%" }}>
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
                {eventToday.length > 0
                  ? eventToday.map((el) => (
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
          </div>
        </ModalBody>
      </Modal>
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

export default CalendarApp;
