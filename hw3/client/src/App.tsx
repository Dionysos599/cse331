import React, { Component } from "react";
import { Building, Edge } from "./buildings";
import { Editor } from "./Editor";
import { isRecord } from "./record";
import campusMap from "./img/campus_map.jpg";

// Radius of the circles drawn for each marker.
const RADIUS: number = 30;

type AppProps = {}; // no props

type AppState = {
  buildings?: Array<Building>; // list of known buildings
  endPoints?: [Building, Building]; // end for path
  path?: Array<Edge>; // shortest path between end points
};

/** Top-level component that displays the entire UI. */
export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {};
  }

  componentDidMount = (): void => {
    fetch("/api/buildings")
        .then(this.doBuildingsResp)
        .catch(this.doBuildingsError);
  };

  doBuildingsResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doBuildingsJson)
          .catch(() => this.doBuildingsError("200 response is not valid JSON"));
    } else {
      res.text().then(this.doBuildingsError)
          .catch(() => this.doBuildingsError("error response is not text"));
    }
  };

  doBuildingsJson = (data: unknown): void => {
    if (!isRecord(data)) {
      throw new Error(`Data is not a record: ${typeof data}`);
    }

    if (data.buildings === undefined || !Array.isArray(data.buildings)) {
      throw new Error(`data.buildings is missing or not an array`);
    }

    const buildings = data.buildings as Array<Building>;
    this.setState({ buildings });
  }

  doBuildingsError = (msg: string): void => {
    console.error(`Error fetching /api/buildings: ${msg}`);
  };

  render = (): JSX.Element => {
    if (this.state.buildings === undefined) {
      return <p>Loading building information...</p>;
    } else {
      return (
          <div>
            <svg id="svg" width="866" height="593" viewBox="0 0 4330 2964">
              <image href={campusMap} width="4330" height="2964" />
              {this.renderPath()}
              {this.renderEndPoints()}
            </svg>
            <Editor buildings={this.state.buildings} onEndPointChange={this.doEndPointChange}/>
          </div>
      );
    }
  };

  /** Returns SVG elements for the two end points. */
  renderEndPoints = (): Array<JSX.Element> => {
    if (this.state.endPoints === undefined) {
      return [];
    } else {
      const [start, end] = this.state.endPoints;
      return [
        <circle
            cx={start.location.x}
            cy={start.location.y}
            fill={"red"}
            r={RADIUS}
            stroke={"white"}
            strokeWidth={10}
            key={"start"}
        />,
        <circle
            cx={end.location.x}
            cy={end.location.y}
            fill={"blue"}
            r={RADIUS}
            stroke={"white"}
            strokeWidth={10}
            key={"end"}
        />,
      ];
    }
  };

  /** Returns SVG elements for the edges on the path. */
  renderPath = (): Array<JSX.Element> => {
    if (!this.state.path) {
      return [];
    } else {
      const elems: Array<JSX.Element> = [];
      for (let i = 0; i < this.state.path.length; i++) {
        const e = this.state.path[i];
        elems.push(
            <line
                x1={e.start.x}
                y1={e.start.y}
                key={i}
                x2={e.end.x}
                y2={e.end.y}
                stroke={"green"}
                strokeWidth={10}
            />
        );
      }
      return elems;
    }
  };

  doEndPointChange = (endPoints?: [Building, Building]): void => {
    this.setState({ endPoints, path: undefined });
    if (endPoints !== undefined) {
      const [start, end] = endPoints;
      console.log(`show path from ${start.shortName} to ${end.shortName}`);

      const s = encodeURIComponent(start.shortName);
      const e = encodeURIComponent(end.shortName);
      fetch(`/api/shortestPath?start=${s}&end=${e}`)
          .then(this.doShortestPathResp)
          .catch(() => this.doShortestPathError("failed to connect to server"));
    } else {
      console.log("show no path");
    }
  };

  doShortestPathResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doShortestPathJson)
          .catch(() => this.doShortestPathError("200 response is not valid JSON"));
    } else {
      res.text().then(this.doShortestPathError)
          .catch(() => this.doShortestPathError("error response is not text"));
    }
  };

  /** Parses the JSON data from the shortest path response. */
  doShortestPathJson = (data: unknown): void => {
    if (!isRecord(data)) {
      throw new Error(`Data is not a record: ${typeof data}`);
    }

    if (data.path === undefined || !isRecord(data.path)) {
      throw new Error(`data.path is missing or not a record`);
    }

    if (data.path.steps === undefined || !Array.isArray(data.path.steps)) {
      throw new Error(`data.path.steps is missing or not an array`);
    }

    this.setState({ path: data.path.steps });
  };

  /** Logs errors related to fetching the shortest path. */
  doShortestPathError = (msg: string): void => {
    console.error(`Error fetching /api/shortestPath: ${msg}`);
  };
}