import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { setAlert } from "../../../actions/alert";
import { useLocation } from "react-router";

const UpdatePropertyDetail = ({ setAlert }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [property, setProperty] = useState({});
  const [fileLimit, setFileLimit] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [formData, setFormData] = useState({
    pricePerNight: 0,
    cleaningFee: 0,
    serviceFee: 0,
    avgCost: 0,
  });

  const location = useLocation();

  useEffect(() => {
    const property = location.state.property;
    const { pricePerNight, cleaningFee, serviceFee, avgCost } = property;
    setFormData({
      pricePerNight,
      cleaningFee,
      serviceFee,
      avgCost,
    });
    let images = property.images.map(image => new Blob([new Uint8Array(image.data.data)], {type: image.contentType }))
    setUploadedFiles(images)
    setAmenities(options.filter((option) => property.amenities.includes(option.value)))
    setProperty(property);
  }, []);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === 5) setFileLimit(true);
        if (uploaded.length > 5) {
          alert(`You can only add a maximum of ${5} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
      return false;
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let amenitiesTemp = [];
    amenities.map((option) => amenitiesTemp.push(option.value));
    const formDataNew = {
      ...formData,
      images: [...uploadedFiles],
      amenities: [...amenitiesTemp],
    };
    let formDataApi = new FormData();
    Object.keys(formDataNew).forEach((key) => {
      if (key === "images") {
        for (let i = 0; i < uploadedFiles.length; i++) {
          formDataApi.append("images", uploadedFiles[i]);
        }
      } else formDataApi.append(`${key}`, formDataNew[key]);
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`/api/properties/${property._id}`, formDataApi, config)
      .then((res) => {
        setAlert("Property details updated successfully!", "success");
      });
  };

  const deleteUploadedImage = (e) => {
    const uploadedFilesClone = uploadedFiles.filter(
      (image, index) => index !== e
    );
    setUploadedFiles(uploadedFilesClone);
  };

  const handleSelectChange = (amenities) => {
    setAmenities(amenities);
  };

  const { pricePerNight, cleaningFee, serviceFee, avgCost } = formData;

  const options = [
    { value: "Wifi", label: "Wifi" },
    { value: "Washer/Dryer", label: "Washer/Dryer" },
    { value: "Cooks", label: "Cooks" },
    { value: "Backyard", label: "Backyard" },
  ];

  return (
    <div>
      <div className='w-75 ms-5 mt-3 register'>
        <h1 className='large text-primary'>Update Property Details</h1>
        <form
          className='form'
          onSubmit={onSubmit}
          enctype='multipart/form-data'
        >
          <div className='row'>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>
                Price per Night
              </label>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Price per Night'
                  name='pricePerNight'
                  value={pricePerNight}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>
                Cleaning Fee (USD)
              </label>
              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Cleaning Fee'
                  name='cleaningFee'
                  value={cleaningFee}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>
                Service Fee (USD)
              </label>
              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Service Fee'
                  name='serviceFee'
                  value={serviceFee}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>
                Average Cost (USD)
              </label>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Average Cost'
                  name='avgCost'
                  value={avgCost}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Amenities</label>
              <div className='mb-3'>
                <Select
                  isMulti
                  value={amenities}
                  onChange={handleSelectChange}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className='required col-6'>
            <div className='mb-3'>
              <input
                id='images'
                name='images'
                style={{ display: "none" }}
                type='file'
                multiple
                accept='image/png'
                onChange={handleFileEvent}
                disabled={fileLimit}
              />

              <label htmlFor='images'>
                <a
                  className={`btn btn-primary ${!fileLimit ? "" : "disabled"} `}
                >
                  Upload Property Images
                </a>
              </label>

              <div className='row mt-4'>
                {uploadedFiles.map((file, index) => (
                  <div className='col-lg-4 col-md-4 col-xs-4 thumb' key={index}>
                    <img
                      className='img-responsive w-75 h-75 border border-1'
                      src={URL.createObjectURL(file)}
                      alt={`upload-${index}`}
                    />
                    <button
                      className='btn btn-danger btn-sm ms-2'
                      onClick={() => deleteUploadedImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='d-grid'>
            <input
              type='submit'
              className='btn btn-primary'
              value='Update Property Details'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(UpdatePropertyDetail);
