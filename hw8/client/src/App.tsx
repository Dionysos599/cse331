import React, { Component } from "react";
import { solid, split, Path, Square } from './square';
import { SquareElem } from './square_draw';
import { FilePicker } from "./FilePicker";


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
 * to pick from or an editor for files files
 */
export class App extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    // TODO: change to correct starting view once it's implemented
    this.state = {show: {kind: "edit-file", name: "", initialState: solid("white")}};
  }
  
  render = (): JSX.Element => {
    // Render a loading screen if app is accessing data from the server
    // or display file list page or editor page appropraitely
    if (this.state.show.kind === "load-list") {
      return <p>Loading file names...</p>;

    } else if (this.state.show.kind === "show-list") {
      return <FilePicker />; // TODO: pass in necessary props

    } else if (this.state.show.kind === "load-file") {
      return <p>Loading {this.state.show.name}...</p>;

    } else {
      // TODO: Replace return with commented out line to render full editor
      //       component instead of always a static square
      const sq: Square = split(solid("blue"), solid("orange"), solid("purple"), solid("pink"));
      return <SquareElem width={600n} height={600n} square={sq}
        onClick={this.doSquareClick}/>;
      // return <FileEditor initialState={sq}>  // TODO: pass in necessary props
    }
  };

  doSquareClick = (path: Path): void => {
    console.log(path);
    alert("Stop that!");
  };

  // TODO: write functions here to handle switching between app pages and
  //       for accessing the server
}
