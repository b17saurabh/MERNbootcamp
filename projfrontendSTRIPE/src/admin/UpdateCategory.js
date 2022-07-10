//update category

import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { updateCategory, getCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: "",
    getRedirect: false,
    createdCategory: "",
    formData: new FormData(),
  });
  const { name, error, getRedirect, formData, createdCategory } = values;

  const preload = (categoryId) => {
    // console.log("cateId " + categoryId);
    getCategory(categoryId).then((data) => {
      //   console.log(data);
      if (data && data?.error) {
        setValues({ ...values, error: data?.error });
      } else {
        setValues({
          ...values,
          name: data?.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateCategory(match.params.categoryId, user._id, token, formData).then(
      (data) => {
        console.log(data);
        if (data && data?.error) {
          setValues({ ...values, error: data?.error });
        } else {
          setValues({
            ...values,
            name: "",
            createdCategory: data?.name,
          });
          console.log(`data?.name: ${name}`);
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCategory ? "" : "none" }}
    >
      <h4>{createdCategory} updated successfully!</h4>
    </div>
  );

  const warningMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  const updateCategoryForm = () => (
    <form>
      <div className="form-group pt-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3 mt-3"
      >
        Update Category
      </button>
    </form>
  );

  return (
    <Base
      title="Update Product here!"
      description="Welcome to product create section"
      className="container bg-info p-4 text-white"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-2">
          {successMessage()}
          {warningMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
