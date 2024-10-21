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

  handleFromChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const start = this.props.buildings.find(
        (building) => building.shortName === event.target.value
    );

    this.setState({ start }, this.updateEndPoints);
  };

  handleToChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const end = this.props.buildings.find(
        (building) => building.shortName === event.target.value
    );

    this.setState({ end }, this.updateEndPoints);
  };

  updateEndPoints = (): void => {
    const { start, end } = this.state;
    if (start !== undefined && end !== undefined) {
      // Both endpoints are selected
      this.props.onEndPointChange([start, end]);
    } else {
      this.props.onEndPointChange(undefined);
    }
  };

  handleClear = (): void => {
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
                onChange={this.handleFromChange}
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
                onChange={this.handleToChange}
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

          <button onClick={this.handleClear}>clear</button>
        </div>
    );
  };
}
