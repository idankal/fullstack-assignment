import React, { Component } from 'react';
import getData from '../../services/Request';
import { Emit } from '../../services/Socket';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      show: false,
      currentFile: 0,
      src: ''
    };
  }

  componentDidMount() {
    getData().then(res => this.setState({files: res.data.data}));
  }

  handleClick = (filename, id) => {
    const { files } = this.state;
    let obj = {
      message: 'play',
      value: files[id].filename,
      cb: 'playSong'
    }
    Emit(obj, (res) => {
      var src = URL.createObjectURL(new Blob([res]));
      this.setState({src: src, show: true, currentFile: id});
    })
  }

  render() {
    const { files, show, currentFile, src } = this.state
    const table = files.map((el,i) => {
      return (
        <tr key={el._id}>
            <td>{(i+1)}</td>
            <td>{el.filename}</td>
            <td>{el.creationDate}</td>
            <td>{el.creationTime}</td>
            <td>{el.duration}</td>
            <td>
              { (show && currentFile == i) ?
                 <audio controls autoPlay>
                    <source src={src} type="audio/x-wav" />
                </audio> :
                <button type="button" className="waves-effect waves-light btn" onClick={() => this.handleClick(el.filename, i)}>Play</button>
              }
            </td>
        </tr>
      );
    })
    return(
      <div className="container">
          <h4>List of files</h4>
          <span>{ files.length } files in Database</span>
          <table className="highlight">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>File Name</th>
                      <th>Created Date</th>
                      <th>Created Time</th>
                      <th>Duration</th>
                      <th>Listen</th>
                  </tr>
              </thead>

              <tbody>
                {table}
              </tbody>
          </table>
      </div>
    )
  }
};

export default Home;
