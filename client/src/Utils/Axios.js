import axios from "axios";

let url = "";

class Axios {
  addtag(tagName, callback) {
    if (tagName) {
      axios
        .post(url + "/api/addtag", { tagName: tagName })
        .then(res => {
          if (res.data && res.data.success) {
            callback(null, res.data);
          } else {
            callback("Unknown error", null);
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  }
  showtag(callback) {
    axios
      .post(url + "/api/showtag")
      .then(res => {
        if (res.data && res.data.success) {
          callback(null, res.data);
        } else {
          callback("Unknown error", null);
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response && error.response.data) {
        } else {
          callback("Unknown error", null);
        }
      });
  }
  addimage(file, callback) {
    console.log(file);
    if (file) {
      axios
        .post(url + "/api/addimage", file)
        .then(res => {
          if (res.data.success) {
            console.log(file);
            callback(null, res.data);
          } else {
            callback("Unknown error", null);
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  }
  showimages(callback) {
    axios
      .get(url + "/api/showimage")
      .then(res => {
        if (res.data && res.data.success) {
          console.log(res.data);
          callback(null, res.data);
        } else {
          callback("Unknown error", null);
        }
      })
      .catch(error => {
        console.log(error.response);
        if (error.response && error.response.data) {
        } else {
          callback("Unknown error", null);
        }
      });
  }
  addfile(file, callback) {
    console.log(file);
    if (file) {
      axios
        .post(url + "/api/files", file, {
          config: {
            headers: { "Content-Type": "multipart/form-data" }
          }
        })
        .then(res => {
          console.log(file);
          if (res.data.success) {
            console.log(file);
            callback(null, res.data);
          } else {
            callback("Unknown error", null);
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  }
  deleteimage(imagename, callback) {
    if (imagename) {
      axios
        .post(url + "/api/deleteimage", { imagename: imagename })
        .then(res => {
          if (res.data && res.data.success) {
            callback(null, res.data);
          } else {
            callback("Unknown error", null);
          }
        })
        .catch(error => {
          console.log(error.response);
          if (error.response && error.response.data) {
          } else {
            callback("Unknown error", null);
          }
        });
    } else {
      callback("Fill Up all details", null);
    }
  }
}

let globalAxios = new Axios();

export default globalAxios;
