import React, { Component } from 'react';
import { Location, Marker, COLORS } from './marker';
import { BUILDINGS } from './buildings';

type EditorProps = {
    marker: Marker;
    moveTo?: Location;
    onCancelClick: () => void;
    onSaveClick: (name: string, color: string, loc: Location) => void;
};

type EditorState = {
    name: string;
    color: string;
    listedMoveTo: string;
    filter: string;
    allowCustomMoveTo: boolean;
};

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
        return selectedBuilding ? { name: selectedBuilding.longName, location: selectedBuilding.location}
                                : { name: this.state.name, location: this.props.marker.location};
    };

    getCustomLoc = (): Location => {
        return this.props.moveTo && this.state.allowCustomMoveTo ? this.props.moveTo : this.props.marker.location;
    };

    handleSaveClick = () => {
        const { name, color } = this.state;
        if (!name) {
            alert('Please enter a name for the building.');
            return;
        }
        const location = this.props.moveTo ? this.getCustomLoc() : this.getSelectedBuildingInfo().location;
        this.props.onSaveClick(name, color, location);
    };

    render = (): JSX.Element => {
        const { name, color, listedMoveTo, filter, allowCustomMoveTo } = this.state;
        const filteredBuildings = this.filteredBuildings();

        return (
            <div>
                <p>
                    Name:
                    <span style={{ marginLeft: '5px' }} />
                    <input type="text" value={name} onChange={(e) => this.setState({ name: e.target.value })}/>
                    {this.props.moveTo ? undefined : (<>
                        <span style={{ marginLeft: '15px' }} />
                        Move To:
                        <span style={{ marginLeft: '5px' }} />
                        <select value={listedMoveTo} onChange={(e) => this.setState({ listedMoveTo: e.target.value })}>
                            <option value="">Select a building</option>
                            {filteredBuildings.map(building => (
                                <option key={building.shortName} value={building.shortName}> {building.longName} </option>
                            ))}
                        </select>
                    </> )}
                </p>
                <p>
                    Color:
                    <span style={{ marginLeft: '5px' }} />
                    <select value={color} onChange={(e) => this.setState({ color: e.target.value })}>
                        {COLORS.map(c => (<option key={c} value={c}> {c} </option>))}
                    </select>
                    {this.props.moveTo ? (
                        <p>
                            <input type="checkbox" checked={allowCustomMoveTo} onChange={(e) => this.setState({ allowCustomMoveTo: e.target.checked })}/>
                            move to new location (gray)
                        </p>
                    ) : (
                        <>
                            <span style={{ marginLeft: '100px' }} />
                            Filter: <span style={{ marginLeft: '5px' }} />
                            <input type="text" value={filter} onChange={(e) => this.setState({ filter: e.target.value })}
                                placeholder="Search buildings..."
                            />
                            <span style={{ marginLeft: '10px' }} />
                            (show only buildings including this text)
                        </>
                    )}
                </p>
                <button onClick={this.handleSaveClick}>Save</button>
                <span style={{ marginLeft: '5px' }} />
                <button onClick={this.props.onCancelClick}>Cancel</button>
            </div>
        );
    };
}
