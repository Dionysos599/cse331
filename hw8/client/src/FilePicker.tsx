import React, { Component, ChangeEvent, MouseEvent } from "react";


type FilePickerProps = {
  /** Array of existing file names */
  files: Array<string>;

  /** Callback for selecting an existing file */
  onPick: (name: string) => void;

  /** Callback for creating a new file */
  onCreate: (name: string) => void;

  /** Callback for deleting a file */
  onDelete: (name: string) => void;
};


type FilePickerState = {
  name: string;  // text in the name text box
};


/** Displays the list of created design files. */
export class FilePicker extends Component<FilePickerProps, FilePickerState> {

  constructor(props: FilePickerProps) {
    super(props);

    this.state = {name: ''};
  }

  render = (): JSX.Element => {
    return (<div>
      <h3>Files</h3>
      <ul>{this.props.files.map(this.doListClick)}</ul>
      <div>
        <label>
          Name:
          <span style={{marginLeft: "10px"}}></span>
          <input type="text" value={this.state.name} onChange={this.doNameChange}
          />
        </label>
        <span style={{marginLeft: "10px"}}></span>
        <button onClick={this.doCreateClick}>Create</button>
        <span style={{marginLeft: "10px"}}></span>
        <button onClick={this.doDeleteClick}>Delete</button>
      </div>
    </div>);
  };

  doListClick = (fileName: string): JSX.Element => {
    return (
      <li key={fileName}>
        <a href="#" onClick={(evt) => this.doFileClick(evt, fileName)}>
        {fileName}
        </a>
      </li>
    );
  };

  doFileClick = (evt: MouseEvent<HTMLAnchorElement>, fileName: string): void => {
    evt.preventDefault();
    this.props.onPick(fileName);
  };

  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value});
  };

  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    const name = this.state.name;

    if (name.trim() === "") {
      alert("File name cannot be empty.");
      return;
    }

    this.props.onCreate(name.trim());
    this.setState({ name: "" });
  };

  doDeleteClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    const name = this.state.name;

    if (name.trim() === "") {
      alert("File name cannot be empty.");
      return;
    }

    this.props.onDelete(name.trim());
    this.setState({ name: "" });
  }

}
