import React, { Component } from "react";
import "../css/common.css";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "../css/sweetalert.css";

class Home extends Component {
  state = {
    file: null,
    uploading: false,
    showAlert: false,
    validationError: false
  };
// onchnage handler
  inputChangeHandler = e => {
    this.setState({ file: e.target.files[0] });
  };
// upload to server
  fileUploadHandler = () => {
    if (!this.state.file) {
      this.setState({ validationError: true });
      setTimeout(() => {
        this.setState({ validationError: false });
      }, 1500);
      return false;
    } else {
      const formData = new FormData();
      formData.set("file", this.state.file);
      this.setState({ uploading: true });
      axios
        .post("https://file-uploder-wjlwscxqcd.now.sh/uploads/", formData)
        .then(res => {
          console.log(res);
          this.setState({ uploading: false, file: null, showAlert: true });
          this.fileInput.value = null;
          setTimeout(() => {
            this.setState({ showAlert: false });
          }, 1500);
        });
    }
  };
  //clears the file input
  cleaInput = () => {
    this.fileInput.value = null;
    this.setState({ file: null });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <input
            style={{ display: "none" }}
            onChange={this.inputChangeHandler}
            ref={fileInput => (this.fileInput = fileInput)}
            type="file"
            name="file"
          />

          <div className="file-info">
            <p>
              {this.state.file ? this.state.file.name : null}
              {this.state.file ? (
                <span className="clearInput-btn" onClick={this.cleaInput}>
                  <i className="fas fa-trash" />
                </span>
              ) : null}
            </p>
          </div>
          <button
            onClick={() => {
              this.fileInput.click();
            }}
            className="upload-btn"
          >
            <i className="fas fa-upload" />
            Browse
          </button>

          <button className="send-btn" onClick={this.fileUploadHandler}>
            Submit
          </button>
        </div>
        {this.state.uploading ? (
          <div className="spinner">
            <div className="rect1" />
            <div className="rect2" />
            <div className="rect3" />
            <div className="rect4" />
            <div className="rect5" />
          </div>
        ) : null}

        <SweetAlert
          show={this.state.showAlert}
          title="Success!!!"
          text="your image is uploaded "
          onConfirm={() => this.setState({ showAlert: false })}
        />
        <SweetAlert
          show={this.state.validationError}
          title=" No file Selected !!!"
          text="Please Upload a picture"
          onConfirm={() => this.setState({ validationError: false })}
        />
      </div>
    );
  }
}
export default Home;
