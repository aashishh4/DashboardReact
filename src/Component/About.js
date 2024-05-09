import React, { Component } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";

class About extends Component {
  state = {
    selectedFile: null,
  };

  // Function to handle file change
  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            name: "",
            isSwitchOn: false,
            image: "",
          }}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const formData = new FormData();
          
            // Append form values
            formData.append("name", values.name);
            formData.append("isSwitchOn", values.isSwitchOn);
          
            // Append selected file
            if (this.state.selectedFile) {
              formData.append("myFile", this.state.selectedFile, this.state.selectedFile.name);
            }
            
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
              },
            };
          
            // Send data to API
            axios
              .post("https://prakash58.xyz/api/category", formData, config)
              .then((response) => {
                console.log(response.data);
                // Clear form after successful submission
                resetForm();
              })
              .catch((error) => {
                console.error("Error uploading file: ", error);
              })
              .finally(() => {
                setSubmitting(false); // Reset submit button state
              });
          }}
          
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <br />
              <label htmlFor="isSwitchOn">
                Is Switch On
                <Field type="checkbox" id="isSwitchOn" name="isSwitchOn" />
              </label>
              <input type="file" onChange={this.onFileChange} />
              <br />
              <button type="submit" disabled={isSubmitting}>Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default About;
