import { Image } from 'primereact/image'; // Import the Image component from PrimeReact
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import { useEffect, useState } from 'react';
const ImageGallery = () => {
  let { id } = useParams();
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/events/" + id, {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("CurrentUser")
          },
        })
        if (response.status === 400) {
          alert("No images added");
          return;
        }
        if (!response.ok) {
          alert("Error");
          return;
        }
        const files = await response.json();
        const fileDetails = files.map(
          image => ({
            filename: image.filename,
            type: image.Type
          }
          )
        );
        console.log(fileDetails);
        setFiles(fileDetails);
      } catch (err) {
        console.log(err)
      }

    };
    fetchImages();

  }, [id]);

  return (
    <div className="image-gallery">
      {files.map((file, index) => (
        <Image
          key={index}
          src={`images/${file.filename}.${file.type}`}
          alt={`Image ${index + 1}`}
          width="250"
          preview
        />
      ))}
    </div>
  );
};
export default ImageGallery;
