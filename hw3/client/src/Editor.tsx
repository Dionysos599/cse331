import React, { Component } from 'react';
import { Building } from './buildings';


type EditorProps = {
  /** Names of all the buildings that are available to choose. */
  buildings: Array<Building>;

  /** Called to note that the selection has changed. */
  onEndPointChange: (endPoints?: [Building, Building]) => void;
};

type EditorState = {
  start?: Building;
  end?: Building;
};


/** Component that allows the user to edit a marker. */
export class Editor extends Component<EditorProps, EditorState> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {};
  }

  doUpdateEndPoint = (): void => {
    this.state.start !== undefined && this.state.end !== undefined
        ? this.props.onEndPointChange([this.state.start!, this.state.end!])
        : this.props.onEndPointChange(undefined);
  };

  onFromChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const start = this.props.buildings.find((building) => building.shortName === event.target.value);
    this.setState({ start }, this.doUpdateEndPoint);
  };

  onToChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const end = this.props.buildings.find((building) => building.shortName === event.target.value);
    this.setState({ end }, this.doUpdateEndPoint);
  };

  onClear = (): void => {
    this.setState({ start: undefined, end: undefined }, () => {
      this.props.onEndPointChange(undefined);
    });
  };

  render = (): JSX.Element => {
    return (
        <div>
          <p>
            From:
            <span style={{marginLeft: '5px'}}></span>
            <select
                onChange={this.onFromChange}
                value={this.state.start?.shortName || ''}
            >
              <option value="">(choose a building)</option>
              {this.props.buildings.map((building) => {
                return (
                    <option key={building.shortName} value={building.shortName}>
                      {building.longName}
                    </option>
                );
              })}
            </select>
          </p>

          <p>
            To:
            <span style={{marginLeft: '5px'}}></span>
            <select
                onChange={this.onToChange}
                value={this.state.end?.shortName || ''}
            >
              <option value="">(choose a building)</option>
              {this.props.buildings.map((building) => {
                return (
                    <option key={building.shortName} value={building.shortName}>
                      {building.longName}
                    </option>
                );
              })}
            </select>
          </p>

          <button onClick={this.onClear}>clear</button>
        </div>
    );
  };
}
