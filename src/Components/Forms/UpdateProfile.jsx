import React, { useEffect, useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { Form, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import formupload from "../../img/formupload.png";
import { Update_Profile, user_detail } from "../../Api_Collection/Api";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAdress] = useState("");

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setName(user.fullName);
    setEmail(user?.email);
    setMobileNumber(user?.mobileNumber);
    setGender(user?.gender);
    setImageUrl(user?.profilePic);
    setAdress(user?.address);
  }, [user]);

  useEffect(() => {
    user_detail(setUser);
  }, []);

  const handlePostData = (e) => {
    e.preventDefault();
    const fromData = new FormData();
    fromData.append("fullName", name);
    fromData.append("email", email);
    fromData.append("mobileNumber", mobileNumber);
    fromData.append("gender", gender);
    fromData.append("address", address);
    {
      image && fromData.append("image", image);
    }
    Update_Profile(fromData);
    navigate("/patient_panel");
  };


  const selectImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const ChooseFile = () => {
    const target = document.getElementById("file");
    target.click();
  };


  return (
    <>
      <div className="booking-container">
        <div className="backbutton">
          <IoArrowBackCircle
            style={{
              color: "#1A9FB2",
              width: "40px",
              height: "40px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/appointment_scheduling")}
          />
        </div>
        <div className="form-container">
          <div className="formheading1">
            <div className="formsheading2">
              <h1>Update Patient Profile</h1>
            </div>
          </div>
          <form onSubmit={handlePostData}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "0.5rem"
              }}
            >

              <img
                src={imageUrl ? imageUrl : user?.profilePic}
                alt="Profile"
                className="profilemodal-image"
                style={{ cursor: "pointer" }}
                onClick={() => ChooseFile()}
              />

              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => selectImage(e)}
              />

            </div>

            <div className="profile-section">
              <h2>Resident Details</h2>

              <div className="form-field">
                <label htmlFor="AHCCCS">Name:</label>
                <input
                  type="text"
                  id="AHCCCS"
                  value={name}
                  placeholder="Type Here....."
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="AHCCCS">Contact Number:</label>
                <input
                  type="text"
                  id="AHCCCS"
                  value={mobileNumber}
                  placeholder="Type Here....."
                  required
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="AHCCCS">Email:</label>
                <input
                  type="email"
                  id="AHCCCS"
                  value={email}
                  placeholder="Type Here....."
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="AHCCCS">Gender:</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Open this select menu</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="programlocation&address">Address</label>
                <textarea
                  id="programlocation&address"
                  rows={2}
                  cols={130}
                  placeholder="Type Here......"
                  required
                  value={address}
                  onChange={(e) => setAdress(e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="initalsubmit">
                SUBMIT DETAILS
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;