import React, { Component } from 'react';
import { Location, Marker, COLORS } from './marker';
import { BUILDINGS } from './buildings';

type EditorProps = {
    /** The marker that the user wants to edit. */
    marker: Marker;

    /** If provided, let the user move to this location. */
    moveTo?: Location;

    /** Callback to invoke when the user wants to cancel editing. */
    onCancelClick: () => void;

    /** Callback to invoke when the user wants to save the edit. */
    onSaveClick: (name: string, color: string, loc: Location) => void;
};

type EditorState = {
    name: string;
    color: string;
    listedMoveTo: string;
    filter: string;
    allowCustomMoveTo: boolean;
};

/** Component that allows the user to edit a marker. */
export class Editor extends Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);

        this.state = {
            name: props.marker.name,
            color: props.marker.color,
            listedMoveTo: '',
            filter: '',
            allowCustomMoveTo: false,
        };
    }

    componentDidUpdate = (oldProps: EditorProps): void => {
        if (oldProps.marker !== this.props.marker) {
            this.setState({
                name: this.props.marker.name,
                color: this.props.marker.color,
                listedMoveTo: '',
            });
        }
    };

    filteredBuildings = () => {
        return BUILDINGS.filter(building =>
            building.longName.toLowerCase().includes(this.state.filter.toLowerCase()) ||
            building.shortName.toLowerCase().includes(this.state.filter.toLowerCase())
        );
    };

    getSelectedBuildingInfo = (): { name: string; location: Location } => {
        const selectedBuilding = BUILDINGS.find(b => b.shortName === this.state.listedMoveTo);
        if (selectedBuilding) {
            return {
                name: selectedBuilding.longName,
                location: selectedBuilding.location,
            };
        }
        // no building selected, return the current marker.
        return {
            name: this.state.name,
            location: this.props.marker.location,
        };
    };

    getCustomLoc = (): Location => {
        if (this.props.moveTo && this.state.allowCustomMoveTo) {
            return this.props.moveTo;
        }
        return this.props.marker.location;
    };

    render = (): JSX.Element => {
        const filteredBuildings = this.filteredBuildings();

        if (this.props.moveTo) {
            return (
                <div>
                    <p>
                        Name:
                        <span style={{marginLeft: '5px'}}></span>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={(e) => this.setState({name: e.target.value})}
                        />
                    </p>
                    <p>
                        Color:
                        <span style={{marginLeft: '5px'}}></span>
                        <select
                            value={this.state.color}
                            onChange={(e) => this.setState({color: e.target.value})}
                        >
                            {COLORS.map((color) => (
                                <option key={color} value={color}> {color} </option>
                            ))}
                        </select>
                    </p>
                    <p>
                        <input
                            type="checkbox"
                            checked={this.state.allowCustomMoveTo}
                            onChange={(e) => this.setState({ allowCustomMoveTo: e.target.checked })}
                        />
                        move to new location (gray)
                    </p>
                    <button
                        onClick={() => {
                            if (!this.state.name) {
                                alert('Please enter a name for the building.');
                                return;
                            }
                            this.props.onSaveClick(
                                this.state.name,
                                this.state.color,
                                this.getCustomLoc()
                            )
                        }}
                    >
                        Save
                    </button>
                    <span style={{marginLeft: '5px'}}></span>
                    <button onClick={this.props.onCancelClick}>
                        Cancel
                    </button>
                </div>
            );
        }

        return (
            <div>
                <p>
                    Name:
                    <span style={{marginLeft: '5px'}}></span>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.setState({name: e.target.value})}
                    />
                    <span style={{marginLeft: '15px'}}></span>

                    Move To:
                    <span style={{marginLeft: '5px'}}></span>
                    <select
                        onChange={(e) => this.setState({listedMoveTo: e.target.value})}
                        value={this.state.listedMoveTo}
                    >
                        <option value="">Select a building</option>
                        {filteredBuildings.map((building) => (
                            <option key={building.shortName} value={building.shortName}>
                                {building.longName}
                            </option>
                        ))}
                    </select>
                </p>
                <p>
                    Color:
                    <span style={{marginLeft: '5px'}}></span>
                    <select
                        value={this.state.color}
                        onChange={(e) => this.setState({color: e.target.value})}
                    >
                        {COLORS.map((color) => (
                            <option key={color} value={color}> {color} </option>
                        ))}
                    </select>
                    <span style={{marginLeft: '100px'}}></span>

                    Filter:
                    <span style={{marginLeft: '5px'}}></span>
                    <input
                        type="text"
                        value={this.state.filter}
                        onChange={(e) => this.setState({filter: e.target.value})}
                        placeholder="Search buildings..."
                    />
                    <span style={{marginLeft: '10px'}}></span>
                    (show only buildings including this text)
                </p>
                <button
                    onClick={() => {
                        const {name, location} = this.getSelectedBuildingInfo();
                        if (!name) {
                            alert('Please enter a name for the building.');
                            return;
                        }
                        this.props.onSaveClick(name, this.state.color, location);
                    }}
                >
                    Save
                </button>
                <span style={{marginLeft: '5px'}}></span>
                <button onClick={this.props.onCancelClick}>
                    Cancel
                </button>
            </div>
        );
    };
}