import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import HeaderComp from "../components/Header";

const MicroService = (props) => {
  const [amount, setAmount] = useState("");
  const [dayTime, setDayTime] = useState("");

  const [jobs, setJobs] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = moment().format("HH:MM");
    if (dayTime < currentTime)
      return alert("Invalid time, time must be in future");

    setJobs({ time: dayTime, amount });
  };

  const cronJobs = () => {
    console.log(jobs);
  };

  useEffect(() => {
    setInterval(() => {
      cronJobs();
    }, 300000);
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <Fragment>
      <HeaderComp />
      <div className="micro-service mt-5">
        <h3 className="heading">Micro Service</h3>
        <form className="form-micro" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amount</label>
            <input
              className="form-control"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              className="form-control"
              type="time"
              name="dayTime"
              onChange={(e) => setDayTime(e.target.value)}
              value={dayTime}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

MicroService.propTypes = {};

export default MicroService;
