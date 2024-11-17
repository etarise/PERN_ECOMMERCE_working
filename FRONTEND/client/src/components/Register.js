import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    street: "",
    city: "",
    phone: "",
    country: "",
    postcode: "",
    IsAdmin: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Password do no match !");
    } else {
      // You can send formData to your server or perform any action here
      try {
        //   console.log("Form data submitted:", formData);
        fetch("http://localhost:5000/api/v1/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.Status === "Success") {
              alert(data.Status + " yes aya");
              navigate("/");
            } else {
              //  alert(data.Status + " no aya");
            }
          });
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Fragment>
      <div className="align-items-center h-100 mt-3">
        <div className="col-md-12 ">
          <h1>Registration Form</h1>
          <hr />
          <form className="row g-3 mt-4" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="inputEmail4"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                required
                minLength="6"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputConfirmPassword"
                required
                minLength="6"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                value={formData.addressLine1}
                name="addressLine1"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress2" className="form-label">
                Address 2
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                value={formData.addressLine2}
                name="addressLine2"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="street" className="form-label">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputCity" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCity"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>

            {/* <div class="col-md-4">
          <label for="inputState" class="form-label">
            State
          </label>
          <select id="inputState" class="form-select">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div> */}

            <div className="col-md-2">
              <label htmlFor="inputPhone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={formData.phone}
                name="phone"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-2">
              <label htmlFor="inputCountry" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCountry"
                value={formData.country}
                name="country"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-2">
              <label forhtml="inputPostcode" className="form-label">
                Postcode
              </label>
              <input
                type="text"
                className="form-control"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
              />
            </div>
            {/* <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
        </div> */}
            <hr />
            <section className="d-flex justify-content-evenly  col-9">
              <button type="submit" className="btn btn-primary mb-4">
                RESET ALL
              </button>
              <button type="submit" className="btn btn-primary mb-4">
                SUBMIT FORM
              </button>
            </section>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;

// userName,
// email,
// password,
// street,
// addressLine1,
// addressLine2,
// postCode,
// phone,
// IsAdmin,
// country,
// city,
