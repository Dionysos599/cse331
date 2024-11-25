import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path  } from './square';
import { SquareElem } from "./square_draw";


type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;

  // TODO: may want to add more props
};


type FileEditorState = {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;
};


/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {

  constructor(props: FileEditorProps) {
    super(props);

    this.state = { root: props.initialState };
  }

  render = (): JSX.Element => {
    // TODO: add some editing tools here
    return <SquareElem width={600n} height={600n}
                      square={this.state.root} selected={this.state.selected}
                      onClick={this.doSquareClick}></SquareElem>;
  };

  doSquareClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    console.log(path);
    alert("Stop that!");
  }

  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
  };

  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
  };

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    // TODO: remove this code, implement
    console.log(evt);
  };
}
