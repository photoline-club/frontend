import { FileUpload } from "primereact/fileupload";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../const";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";

const wrapperStyle = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black",
};

export default function UploadImage() {
  const { id } = useParams();
  const [priv, setPrivate] = useState(false);
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${api}/api/events`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CurrentUser"),
      },
    })
      .then((res) => res.json())
      .then((json) => setEvent(json.events.find((e) => e.id == id)))
      .catch(() => navigate("/login"));
  }, []);
  const upload = async (evt) => {
    const files = evt.files;
    const data = new FormData();
    files.forEach((f) => data.append("upload[]", f, f.name));
    const res = await fetch(`${api}/api/events/${id}?private=${priv}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("CurrentUser"),
      },
      body: data,
    });
    if (res.status == 201) {
      navigate(`/events/${id}`);
    } else navigate("/login");
  };
  return (
    <div style={{ height: "100%" }}>
      <NavBar />
      <div style={wrapperStyle}>
        <div>
          <div>
            <h1>Upload photos for {event.title}</h1>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <span>Private:</span>
            <Checkbox checked={priv} onChange={(e) => setPrivate(e.checked)} />
          </div>
          <FileUpload
            onUpload={() => console.log("e")}
            onError={console.error}
            customUpload
            uploadHandler={upload}
            multiple
            maxFileSize={1000000}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}
