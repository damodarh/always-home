import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const AddProperty = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [fileLimit, setFileLimit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    host: "",
    reviews: 0,
    pricePerNight: 0,
    cleaningFee: 0,
    serviceFee: 0,
    bedroom: 0,
    beds: 0,
    bath: 0,
    rating: 0,
    avgCost: 0,
    availability: 0,
    distance: 0,
    favorite: false,
    address: "",
  });

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

    const formDataNew = { ...formData, images: [...uploadedFiles] };
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
    axios.post("/api/properties", formDataApi, config).then((res) => {
      setRedirect(true);
    });
  };

  const deleteUploadedImage = (e) => {
    const uploadedFilesClone = uploadedFiles.filter(
      (image, index) => index !== e
    );
    setUploadedFiles(uploadedFilesClone);
  };

  const {
    title,
    host,
    pricePerNight,
    cleaningFee,
    serviceFee,
    bedroom,
    beds,
    bath,
    avgCost,
    distance,
    address,
  } = formData;

  if (redirect) return <Redirect to='/properties' />;

  return (
    <div>
      <div className='w-75 ms-5 mt-3 register'>
        <h1 className='large text-primary'>Add Property</h1>
        <form
          className='form'
          onSubmit={onSubmit}
          enctype='multipart/form-data'
          noValidate
        >
          <div className='row'>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Title</label>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Property Title'
                  name='title'
                  value={title}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Host</label>
              <div className='mb-3'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Host'
                  name='host'
                  value={host}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
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
          </div>
          <div className='row'>
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
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Bedrooms</label>
              <div className='mb-3'>
                <select
                  className='form-select'
                  name='bedroom'
                  value={bedroom}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Bath</label>
              <div className='mb-3'>
                <select
                  className='form-select'
                  name='bath`'
                  value={bath}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Beds</label>
              <div className='mb-3'>
                <select
                  className='form-select'
                  name='beds'
                  value={beds}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
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
              <label className='form-label control-label'>Distance</label>
              <div className='mb-3'>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Distance'
                  name='distance'
                  value={distance}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className='form-group required col-3'>
              <label className='form-label control-label'>Address</label>
              <div className='mb-3'>
                <textarea
                  className='form-control'
                  placeholder='Address'
                  name='address'
                  value={address}
                  onChange={(e) => onChange(e)}
                  required
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
              value='Host Property'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
