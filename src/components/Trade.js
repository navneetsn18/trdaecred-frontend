import React from 'react';
import {InputLabel} from '@material-ui/core';
import './Trade.css';
import Logo from "./icon.png";
import TopBanner from "./banner.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

const styles={
  hidden:{
    display:"none",
  },
  importLabel:{
    color: "white",
  },
};

function isEmpty(ob){
  for(var i in ob){ return false;}
 return true;
}

class Trade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileURL: '',
      condition: false,
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    fetch('https://tradecred-backend.herokuapp.com/upload', {
      mode: 'no-cors',
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "multipart/form-data; boundary=AaB03x" +
        "--AaB03x" +
        "Content-Disposition: file" +
        "Content-Type: png" +
        "Content-Transfer-Encoding: binary" +
        "...data... " +
        "--AaB03x--",
        "Accept": "application/json",
        "type": "formData"
      },
    });
    let proxy = "https://cors-anywhere.herokuapp.com/";
    let api = `${proxy}https://tradecred-backend.herokuapp.com/result`;
    fetch(api).then(res=>{ return res.json();}).then(data=>{
      this.setState({filename:this.uploadInput.files[0]['name'],data:data,condition:true})
    });
  }
  render() {
    if(!this.state.condition)
    {
      return (
        <div className="body">
          <img src={TopBanner} alt="Banner" width="390px"/>
          <br></br>
          <form onSubmit={this.handleUploadImage} className="form">
            <InputLabel style={styles.importLabel} className="uploadBtn">
              <input type='file' name='file' ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleUploadFile} style={styles.hidden} />
              <img src={Logo} alt="Upload" />
              <p>Upload Spreadsheet</p>
            </InputLabel>
          </form>
          <br></br>
          <h1 className="dataTable"> A single place for all your Invoice analysis.</h1>
          </div>
      );
    }
    else
    {
      if(isEmpty(this.state.data))
      {
        return (
          <div className="body">
            <img src={TopBanner} alt="Banner" width="390px"/>
            <br></br>
            <form onSubmit={this.handleUploadImage} className="form">
              <InputLabel style={styles.importLabel} className="uploadBtn">
                <input type='file' name='file' ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleUploadFile} style={styles.hidden} />
                <img src={Logo} alt="Upload" />
                <p>Upload Spreadsheet</p>
              </InputLabel>
            </form>
            <br></br>
            <h1 className="dataTable">Wrong file format or wrong data in file.</h1>
            </div>
        );
      }
      else
      {
        return (
          <div className="body">
            <img src={TopBanner} alt="Banner" width="390px"/>
            <br></br>
            <form onSubmit={this.handleUploadImage} className="form">
              <InputLabel style={styles.importLabel} className="uploadBtn">
                <input type='file' name='file' ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleUploadFile} style={styles.hidden} />
                <img src={Logo} alt="Upload" />
                <p>Upload Spreadsheet</p>
              </InputLabel>
            </form>
            <br></br>
            <Table striped bordered hover size="sm" className="dataTable">
                <tr>
                  <td>Filename: </td>
                  <td className="td1">{this.state.filename}</td>
                </tr>
                <tr>
                  <td>Number of Invoices Uploaded: </td>
                  <td className="td1">{this.state.data.Number_of_invoices}</td>
                </tr>
                <tr>
                  <td>Total Sum of Invoices Amount: </td>
                  <td className="td1">{this.state.data.Total_sum}</td>
                </tr>
                <tr>
                  <td>Total Number of vendors: </td>
                  <td className="td1">{this.state.data.No_Up}</td>
                </tr>
                <tr>
                  <td>Number of Invalid Invoices: </td>
                  <td className="td1">{this.state.data.Invalid}</td>
                </tr>
              </Table> 
            </div>
        );
      }
    }
    
  }
}

export default Trade;

