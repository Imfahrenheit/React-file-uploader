import React, { Component } from "react";
import axios from "axios";

import SweetAlert from "sweetalert-react";
import "../css/sweetalert.css";

const url = "https://file-uploder-wjlwscxqcd.now.sh/";

class Upload extends Component {
  state = {
    data: [],
    loading: true,
    deleting: false,
    deleted: false
  };
  // on componentmount sends HTTTP call for files
  componentDidMount() {
    this.refreshImg();
  }
  //this func call a get request to the api root end point
  refreshImg = () => {
    axios.get(`${url}uploads/`).then(res => {
      const data = res.data.response.uploads;
      this.setState({ data, loading: false, deleting: false });
    });
  };
  // deletes individulal item from server
  deleteImg = e => {
    this.setState({ deleting: true });
    axios.delete(`${url}uploads/${e.target.id}`).then(res => {
      this.refreshImg();

      this.setState({ deleted: true });
      setTimeout(() => {
        this.setState({ deleted: false });
      }, 1500);
    });
  };
  // renders image files from the state
  displayImg = () => {
    const data = this.state.data;
    if (data) {
      return data.map(el => {
        return (
          <div key={el.id} className="img-wrapper">
            <a
              href={url+ el.imageFile}
              target="#"
              className="download-btn"
              download
            >
              <img className="fetched-img" src={url + el.imageFile} alt="" />
            </a>
            <span onClick={e => this.deleteImg(e)} className="delete-btn">
              <i id={el.id} className="fas fa-trash" />
            </span>
          </div>
        );
      });
    } else return;
  };

  render() {
    return (
      <div>
        {this.state.loading ? <div className="lds-dual-ring"></div> : null}
        {this.state.deleting ? (
          <div className="spinner">
              <div className="rect1" />
              <div className="rect2" />
              <div className="rect3" />
              <div className="rect4" />
              <div className="rect5" />
          </div>
        ) : null}

        <div className="img-container">{this.displayImg()}</div>
        {!this.state.data ? (
          <h3 style={{ margin: "0 auto" }}>
            No more Images left in the storage{" "}
          </h3>
        ) : null}

        <SweetAlert
          show={this.state.deleted}
          title=" success!!!"
          text="File is deleted "
          onConfirm={() => this.setState({ deleted: false })}
        />
      </div>
    );
  }
}
export default Upload;
