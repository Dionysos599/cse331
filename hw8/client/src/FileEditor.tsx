import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path, solid, split, replaceSquare, findSquare, toColor } from './square';
import { len, prefix } from './list';
import { SquareElem } from "./square_draw";


type FileEditorProps = {
  /** Name of the file being edited. */
  name: string;

  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;

  /** Called to ask parent to go back to the file picker. */
  onBack: () => void;
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
    return (
        <div>
          <SquareElem width={600n} height={600n}
                      square={this.state.root} selected={this.state.selected}
                      onClick={this.doSquareClick}></SquareElem>
          {this.state.selected !== undefined ? (
              <div className="editor-tools">
                <button onClick={this.doSplitClick}>Split</button>
                <button onClick={this.doMergeClick}>Merge</button>
                <select onChange={this.doColorChange}>
                  <option value="white">White</option>
                  <option value="pink">Pink</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
          ) : null}
          <button onClick={this.doSaveClick}>Save</button>
          <button onClick={this.props.onBack}>Close</button>
        </div>
    );
  };

  doSquareClick = (path: Path): void => {
    this.setState({selected: path});
  }

  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.selected === undefined) return;

    const selected = this.state.selected;
    const root = this.state.root;
    const targetSquare = findSquare(selected, root);

    if (targetSquare.kind === "solid") {
      const newSquare = split(
          solid(targetSquare.color),
          solid(targetSquare.color),
          solid(targetSquare.color),
          solid(targetSquare.color)
      );

      const updatedRoot = replaceSquare(selected, newSquare, root);
      this.setState({ root: updatedRoot });
    } else {
      alert("Cannot split a square that is already split!");
    }

    this.setState({selected: undefined});
  };

  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.selected === undefined) return;

    const selected = this.state.selected;
    const root = this.state.root;

    if (selected.kind === "nil") {
        alert("This is the root square!");
        return;
    }
    const parentPath = prefix(len(selected) - 1n, selected)

    if (parentPath === undefined) {
      alert("Cannot merge the root square!");
      return;
    }

    const parentSquare = findSquare(parentPath, root);

    if (parentSquare.kind === "split") {
      const targetSquare = findSquare(selected, root);
      if (targetSquare.kind !== "solid") {
        alert("Selected square is not solid and cannot determine color for merge!");
        return;
      }

      const mergedColor = targetSquare.color; // Color of the selected square
      const mergedSquare = solid(mergedColor);

      // Replace
      const updatedRoot = replaceSquare(parentPath, mergedSquare, root);
      this.setState({ root: updatedRoot, selected: parentPath });
    } else {
      alert("Cannot merge a square that is not part of a split!");
    }

    this.setState({selected: undefined});
  };

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    if (!this.state.selected) return;

    const selected = this.state.selected;
    const root = this.state.root;
    const newColor = toColor(evt.target.value); // Get the selected color from the dropdown

    const targetSquare = findSquare(selected, root);

    if (targetSquare.kind === "solid") {
      const updatedSquare: Square = { kind: "solid", color: newColor };
      const updatedRoot = replaceSquare(selected, updatedSquare, root);
      this.setState({ root: updatedRoot });
    } else {
      alert("Cannot change the color of a split square!");
    }

    this.setState({selected: undefined});
  };

  doSaveClick = (): void => {
    this.setState({selected: undefined});
    this.props.onSave(this.props.name, this.state.root);
  };
}
