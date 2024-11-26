import React, { Component } from "react";
import { solid, Square } from './square';
import { FileEditor } from "./FileEditor";
import { FilePicker } from "./FilePicker";
import {isRecord} from "./record";


/** Describes set of possible app page views */
// NOTE: the enum here has much more detail than what we showed in the
// walkthrough video. The same principle applies, here we just gave you
// more guidance :)
type Page = 
  // Loading list of file names
  {kind: "load-list"} |
  // Displaying list of file names
  {kind: "show-list", names: Array<string>} |
  // Loading an individual file's contents
  {kind: "load-file", name: string} |
  // Editing an individual file
  {kind: "edit-file", name: string, initialState: Square};

type AppState = {
  show: Page;   // Stores state for the current page of the app to show
};

/**
 * Displays the square application containing either a list of files names
 * to pick from or an editor for files
 */
export class App extends Component<{}, AppState> {

  componentDidMount = (): void => {
    this.doMainMenuClick();
  }

  constructor(props: {}) {
    super(props);
    this.state = {show: {kind: "load-list"}};
  }

  render = (): JSX.Element => {
    // Render a loading screen if app is accessing data from the server
    // or display file list page or editor page appropriately
    if (this.state.show.kind === "load-list") {
      return <p>Loading file names...</p>;

    } else if (this.state.show.kind === "show-list") {
      return (
          <FilePicker
              files={this.state.show.names}
              onPick={this.doLoadFileClick}
              onCreate={this.doCreateClick}
              onDelete={this.doDeleteClick}
          />
      );

    } else if (this.state.show.kind === "load-file") {
      return <p>Loading {this.state.show.name}...</p>;

    } else if (this.state.show.kind === "edit-file") {
      return (
          <FileEditor
              name={this.state.show.name}
              initialState={this.state.show.initialState}
              onSave={this.doSaveClick}
              onBack={this.doMainMenuClick}
          />
      );
    } else {
      throw new Error("Unknown page kind");
    }
  };


  /** Handle navigating back to the FilePicker */
  doMainMenuClick = (): void => {
    this.setState({ show: { kind: "load-list" } });

    fetch("/api/list")
        .then(this.doListResp)
        .catch(() => this.doListError("failed to connect to server"));
  };

  doListResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doListJson)
          .catch(() => this.doListError("200 response is not valid JSON"));
    } else {
      res.text().then(this.doListError)
          .catch(() => this.doListError("error response is not text"));
    }
  };

  doListJson = (val: unknown): void => {
    if (!isRecord(val)) {
      throw new Error(`Data is not a record: ${typeof val}`);
    }

    if (val.files === undefined || !Array.isArray(val.files)) {
      throw new Error(`Data has no files field: ${val}`);
    }

    this.setState({ show: { kind: "show-list", names: val.files }});
  };

  doListError = (msg: string): void => {
    console.error(msg);
  };


  /** Handle creating a new file */
  doCreateClick = (name: string): void => {
    this.setState({
      show: { kind: "edit-file", name: name, initialState: solid("white") }
    });
  };


  /** Handle when a file is clicked to load */
  doLoadFileClick = (name: string): void => {
    this.setState({ show: { kind: "load-file", name } });

    fetch(`/api/load?name=${name}`)
        .then(this.doLoadResp)
        .catch(() => this.doLoadError("failed to connect to server"));
  };

  doLoadResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(data => this.doLoadJson(data))
          .catch(() => this.doLoadError("200 response is not valid JSON"));
    } else {
      res.text().then(this.doLoadError)
          .catch(() => this.doLoadError("error response is not text"));
    }
  };

  doLoadJson = (val: { name: string, content: Square }): void => {
    this.setState({ show: { kind: "edit-file", name: val.name, initialState: val.content } });
  };

  doLoadError = (msg: string): void => {
    console.error(msg);
  };


  /** Handle saving a file */
  doSaveClick = (name: string, root: Square): void => {
    const args = { name, content: root };

    fetch("/api/save", {
      method: "POST",
      body: JSON.stringify(args),
      headers: { "Content-Type": "application/json" },
    })
        .then(() => alert("File saved successfully"))
        .catch(() => this.doSaveError("failed to connect to server"));
  };

  doSaveError = (msg: string): void => {
    console.error(msg);
    alert("Failed to save file");
  };


  /** Handle deleting a file */
  doDeleteClick = (name: string): void => {
    fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    })
        .then(() => this.doMainMenuClick()) // Refresh
        .catch(() => this.doDeleteError("failed to connect to server"));
  };

  doDeleteError = (msg: string): void => {
      console.error(msg);
      alert("Failed to delete file");
  };
}
