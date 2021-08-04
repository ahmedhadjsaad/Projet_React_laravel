import React, { useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "../App.scss";

const AddEvent = (props) => {
  const [title, setTitle] = useState("");
  const [dateBegin, setDateBegin] = useState(new Date());
  const [timeBegin, setTimeBegin] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  const ajoutEvent = async () => {
    //  date debut
    let dateD = dateBegin;
    let month = "" + (dateD.getMonth() + 1);
    let day = "" + dateD.getDate();
    let year = dateD.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    var date = [year, month, day].join("-");
    // heure Debut
    var timeB = timeBegin.toTimeString();
    timeB = timeB.split(" ")[0];
    // heure Fin
    var timeE = timeEnd.toTimeString();
    timeE = timeE.split(" ")[0];
    //
    const res = await axios.post("http://localhost:8000/api/add-event", {
      title,
      date,
      timeB,
      timeE,
    });
    if (res.data.status === 200) {
      props.history.push("/");
      toast.success("✅ Event Added Successfuly", { containerId: "A" });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row bg-title">
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
      <div>
        <div className="event-add">
          <div className="form-group">
            <label>Ttile</label>
            <input
              type="text"
              className="form-control"
              placeholder="event"
              onChange={(e) => setTitle(e.target.value)}
              style={{
                borderRadius: "5px",
                border: "solid 1px #B3B3B3",
              }}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <CalendarContainer style={{ width: "100%" }} />
            <DatePicker
              class="form-control ddate"
              style={{ border: "none" }}
              value={dateBegin}
              selected={dateBegin}
              onChange={(d) => setDateBegin(d)}
              dateFormat="yyyy/MM/dd"
              width={"500px"}
            />
          </div>
          <div className="form-group">
            <label>Time Begin</label>
            <CalendarContainer style={{ width: "100%" }} />
            <DatePicker
              class="form-control ddate"
              style={{ border: "none" }}
              selected={timeBegin}
              onChange={(e) => setTimeBegin(e)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
          <div className="form-group">
            <label>Time End</label>
            <CalendarContainer style={{ width: "100%" }} />
            <DatePicker
              class="form-control ddate"
              style={{ border: "none" }}
              selected={timeEnd}
              onChange={(d) => setTimeEnd(d)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "5%",
            }}
          >
            <button
              style={{ borderRadius: "5px" }}
              type="button"
              className="btn btn-success"
              onClick={() => ajoutEvent()}
            >
              Confirmer
            </button>
          </div>
        </div>
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

export default withRouter(AddEvent);
