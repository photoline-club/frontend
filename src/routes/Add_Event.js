import React, { useState, useEffect } from "react";
import "../App.css";
import { NavBar } from "../components/NavBar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { useNavigate } from "react-router-dom";
import { api } from "../const.js";

const getData = async () => {
  const response = await fetch(api + "/api/friends", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("CurrentUser"),
    },
  });
  if (response.status === 401) {
    throw new Error();
  } else if (response.status !== 200) {
    alert("Error");
    return;
  }

  const json = await response.json();

  return json.data;
};

const fetchData = async (title, description, start_date, end_date, users) => {
  const response = await fetch(api + "/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("CurrentUser"),
    },
    body: JSON.stringify({
      title: title,
      description: description,
      start_date: start_date,
      end_date: end_date,
      users: users,
    }),
  });

  if (response.status === 401) {
    throw new Error();
  } else if (response.status !== 201) {
    alert("Error");
    return;
  }
};

// const handleSubmit = () => {
//     fetchData(name, description, start_date, end_date, friends);
//     setName(''); setDescription(''); setStartDate(''); setEndDate(''); setFriends('');
// }

export default function Add_Event() {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [selected, setSelected] = useState([]);
  const [to_display, setDisplay] = useState([]);

  useEffect(() => {
    getData()
      .then((friendsList) => {
        setDisplay([]);
        const temp_list = [];
        friendsList.forEach((f) =>
          temp_list.push({ name: f.friend.username, id: f.friend.id })
        );
        setDisplay(temp_list);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleSubmit = () => {
    fetchData(name, description, start_date, end_date, selected).catch(() => {
      navigate("/login");
    });
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSelected("");
    setDisplay([]);
  };

  return (
    <div className="container" style={{ height: "100%" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <div>Event title:</div>
          <InputText value={name} onChange={(e) => setName(e.target.value)} />
          <div>Description:</div>
          <div>
            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              cols={30}
            />
          </div>

          <div>Start Date</div>
          <div>
            <Calendar
              value={start_date}
              onChange={(e) => setStartDate(e.value)}
              dateFormat="dd/mm/yy"
            />
          </div>
          <div>End Date</div>
          <div>
            <Calendar
              value={end_date}
              onChange={(e) => setEndDate(e.value)}
              dateFormat="dd/mm/yy"
            />
          </div>
          <div>Friends</div>
          <div>
            <MultiSelect
              value={selected}
              onChange={(e) => setSelected(e.value)}
              options={to_display}
              optionLabel="name"
              optionValue="id"
              display="chip"
              placeholder="Select Friends"
              className="w-full md:w-20rem"
            />
          </div>
          <div>
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
