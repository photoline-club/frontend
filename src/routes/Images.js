import { Image } from "primereact/image"; // Import the Image component from PrimeReact
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import { useEffect, useState } from "react";
import { api } from "../const";
import { NavBar } from "../components/NavBar";
import { Link } from "react-router-dom"
const ImageGallery = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(api + "/api/events/" + id, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CurrentUser"),
          },
        });
        if (response.status === 400) {
          alert("No images added");
          return;
        }
        if (response.status !== 200) {

          navigate(`/events/${id}/upload`);
          return;
        }
        const files = await response.json();
        const fileDetails = files.images.map((image) => ({
          filename: image.asset_id,
          type: image.type,
          user: image.user.username,
        }));
        console.log(fileDetails);
        setFiles(fileDetails);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [id]);
  return (
    <div className="Root">
      <NavBar></NavBar>
      <div className="image-gallery">

        {files.map((file, index) => (
          <div key={index}>
            <Image
              key={index}
              src={`${api}/images/${file.filename}.${file.type}`}
              alt={`Image ${index + 1}`}
              width="250"
              preview
            />
            <div className="username-posted-image">
              <small>{file.user}</small>
            </div>

          </div>
        ))}
      </div>
      <Link to={`/events/${id}/upload`}>upload</Link>
    </div>
  );
};
export default ImageGallery;
