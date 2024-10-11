const SCALE_X = 4330 / 866;
const SCALE_Y = 2964 / 593;

// Called when the user clicks on the map.
const ShowClosest = (evt) => {
  const svg = document.getElementById('svg')
  const r = svg.getClientRects()[0];
  const x = SCALE_X * (evt.clientX - r.x);
  const y = SCALE_Y * (evt.clientY - r.y);

  fetch("/closest?x=" + x + "&y=" + y).then((res) => {
    if (res.status === 200) {
      res.json().then((data) => {
        ShowResults(data.results);
      });
    }
  })
};

// Cleared when the user clicks the search button.
const HandleSearch = (evt) => {
  const elem = document.getElementById('search');
  const text = elem.value.trim();
  if (text.length > 0) {
    fetch("/findByName?text=" + encodeURIComponent(text)).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          ShowResults(data.results);
        });
      }
    })
  }
};

// Called when the user clicks the clear button.
const HandleClear = (evt) => {
  const elem = document.getElementById('search');
  elem.value = "";
  ShowResults([]);
};


const COLORS = [
    ["rgb(204, 66, 72)", "rgba(204, 66, 72, 0.25)"],
    ["rgb(50, 85, 165)", "rgba(50, 85, 165, 0.25)"],
    ["rgb(150, 66, 157)", "rgba(150, 66, 157, 0.25)"]
  ];

// Updates the UI to show the given results.
const ShowResults = (results) => {
  const svgElem = document.getElementById('svg');
  const svgHtml = [
    '<image href="campus_map.jpg" width="4330" height="2964"/>'
  ];
  for (let i = 0; i < results.length; i++) {
    const [c, d] = COLORS[i];
    const x = results[i].x;
    const y = results[i].y;
    svgHtml.push(
      `<circle cx="${x}" cy="${y}" stroke="${c}" r="100" stroke-width="10" fill="${d}"/>`);
  }
  svgElem.innerHTML = svgHtml.join("\n");

  const resElem = document.getElementById('results');
  const resHtml = [];
  if (results.length > 0) {
    resHtml.push(`<h3>Results</h3>`);
    for (let i = 0; i < results.length; i++) {
      const c = COLORS[i][0];
      const short = results[i].shortName;
      const long = results[i].longName;
      resHtml.push('<p class="result">' +
          `<span class="color" style="background-color: ${c};">&nbsp;</span>` +
          `<span class="text">${short}: ${long}</span></p>`);
    }
  }
  resElem.innerHTML = resHtml.join("\n");
};