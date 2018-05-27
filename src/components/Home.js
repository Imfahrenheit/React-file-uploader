import React, { Component, Fragment } from "react";
import "../css/common.css";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "../css/sweetalert.css";

class Home extends Component {
  state = {
    file: null,
    previewSrc: null,
    err: null,
    uploading: false,
    showAlert: false,
    ileSizeAlert: false
  };
  // onchnage handler
  inputChangeHandler = e => {
    const file = e.target.files[0];    
    if (file.size < 4194304) {
      this.setState({ previewSrc: URL.createObjectURL(file), file });
    } else {
      this.setState({ fileSizeAlert: true });
      return false;
    }
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
          this.setState({ uploading: false, file: null, showAlert: true });
          this.fileInput.value = null;
          setTimeout(() => {
            this.setState({ showAlert: false });
          }, 1500);
        })
        .catch(err => {
          console.log(err);
          this.setState({
            err,
            file: null,
            uploading: false
          });
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
      <Fragment>
        <div className="wrapper">
          <input
            accept="image/*"
            style={{ display: "none" }}
            onChange={this.inputChangeHandler}
            ref={fileInput => (this.fileInput = fileInput)}
            type="file"
          />
          {this.state.uploading ? (
            <div className="spinner">
              <div className="rect1" />
              <div className="rect2" />
              <div className="rect3" />
              <div className="rect4" />
              <div className="rect5" />
            </div>
          ) : null}
          <div className={"input-container"}>
            <div className="file-info">
              {!this.state.file ? <p>Browse </p> : null}
              {this.state.file ? (
                <p>Upload--
                {this.state.file.name.length <18? this.state.file.name: "Your File"}
                <span className="clearInput-btn" onClick={this.cleaInput}>
                <i className="fas fa-trash" />
                </span>
                </p>
              ) : null}
            </div>
            {!this.state.file ? (
              <button
                onClick={() => {
                  this.fileInput.click();
                }}
                className="upload-btn">
                <i className="fas fa-folder-open" />
              </button>
            ) : (
              <button className="send-btn" onClick={this.fileUploadHandler}>
                <i className="fas fa-upload" />
              </button>
            )}
          </div>
        </div>

        {this.state.file ? (
          <div className="preview">
            <img className="previewImg" src={this.state.previewSrc} alt="" />
            <div/>
          </div>
        ) : null}

        <SweetAlert
          show={this.state.showAlert}
          title="Success!!!"
          text="your image is uploaded "
          onConfirm={() => this.setState({ showAlert: false })}
        />
        
        <SweetAlert
          show={this.state.fileSizeAlert}
          title=" File is too Large!!!"
          text="Maximum File Size is 5MB "
          onConfirm={() => this.setState({ fileSizeAlert: false })}
        />
      </Fragment>
    );
  }
}
export default Home;
