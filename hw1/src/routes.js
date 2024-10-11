// Store the information about each building here.
const buildings = [];


// Parses and records information on all the buildings
// MOR,Moore Hall,2317.1749,1859.502
export const parseBuildings = (lines) => {
    for (let i = 0; i < lines.length; i++) {
        const [shortName, longName, x, y] = lines[i].split(",");
        buildings.push({shortName, longName, x: parseFloat(x), y: parseFloat(y)});
    }
};


// Returns a list of (<= 3) buildings whose names contain the given text.
export const findByName = (req, res) => {
    const longName = req.query.text || '';
    const results = [];
    for (let i = 0; i < buildings.length; i++) {
        if (results.length < 3 && buildings[i].longName.toLowerCase().includes(longName.toLowerCase())) {
            results.push(buildings[i]);
        }
    }

    res.send({results});
}


// Returns a list of the 3 buildings located closest to the given point
export const closest = (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);

    buildings.sort((a, b) => {
        const da = Math.sqrt((a.x - x) ** 2 + (a.y - y) ** 2);
        const db = Math.sqrt((b.x - x) ** 2 + (b.y - y) ** 2);
        return da - db;
    });
    res.send({results: buildings.slice(0, 3)});
}
