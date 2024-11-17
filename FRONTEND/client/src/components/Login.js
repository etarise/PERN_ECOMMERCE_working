import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

function Login() {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      //console.log("1");
      fetch("http://localhost:5000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.Status === "Success") {
            // alert(data.Status + " yes aya");
            navigate("/Dashboard");
          } else {
            //  alert(data.Status + " no aya");
          }
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  const registerUser = () => {
    navigate("/Register");
  };
  return (
    <Fragment>
      <div class="col d-flex justify-content-center">
        <div className="card w-50   mt-5  ">
          <div className="card-header text-center">
            Log in to Rue Bales E-Shop
          </div>
          <div className="card-body">
            <form onSubmit={onSubmitForm}>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>

              <div className="d-flex justify-content-evenly">
                <section>
                  <div className="col center">
                    <button className="btn btn-secondary  m-4">Log in</button>

                    <button
                      className="btn btn-secondary m-4"
                      onClick={registerUser}
                    >
                      Register
                    </button>
                  </div>
                </section>
              </div>
            </form>
          </div>

          <div className="card-footer d-flex justify-content-evenly">
            <section className=" d-flex socials">
              <a
                href="http://localhost:5000/api/v1/users/login/facebook"
                class="button"
              >
                Log In With Facebook
              </a>
              {/* <a
                href="http://localhost:5000/api/v1/users/auth/facebook"
                className="btn btn-primary"
              >
                <span className="m-2">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </a> */}
              {/* <button className="btn btn-light m-4">
                <span className="m-2">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </button> */}
              <button className="btn btn-light  m-4">
                <span className="m-2">
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
              </button>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
