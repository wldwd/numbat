// REQUIRED: Replace with your actual Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoibnVtYmF0cHJvamVjdHMiLCJhIjoiY21rbzEzNmllMDE3MjNmc2VoZnNsaHZjOSJ9.c7Gr2WIWM5Cs9JS7xni0eg";

const map = new mapboxgl.Map({
  container: "map",
  // REQUIRED: Replace with your own style URL
  // 1. Copy this style in Mapbox Studio: https://api.mapbox.com/styles/v1/numbatprojects/cmjgpvx61000a01sg2c0qf91k.html?title=copy&access_token=pk.eyJ1IjoibnVtYmF0cHJvamVjdHMiLCJhIjoiY2x6d3Mxa3EyMDlkajJycjJsa2R1b3UzZyJ9.NshixxCCMKdK-eCrVNTyHw&zoomwheel=true&fresh=true#14.09/-31.95044/115.86089
  // 2. Paste your new style URL here
  style: "mapbox://styles/numbatprojects/cmkcpnd0y002g01su7w3kf23n",
  center: [115.77290435409037, -31.75208625873852], // ECU Joondalup campus
  zoom: 14,
  customAttribution:
    "Data: Your Move, Edith Cowan University, Main Roads WA | Map: Numbat Geospatial",
});

// UI controls
map.addControl(new mapboxgl.ScaleControl(), "bottom-left");
map.addControl(new mapboxgl.NavigationControl(), "top-right");

// Load bike routes when map is ready
map.once("load", () => {
  map.addSource("routes", {
    type: "geojson",
    data: "joondalup.geojson", // Bike route data
  });

  map.addLayer({
    id: "routes-lines",
    type: "line",
    source: "routes",
    paint: {
      "line-color": "#b710f9",
      "line-width": 2,
    },
  });
});

// Toggle legend visibility (☰ = menu icon, × = close)
const legend = document.getElementById("legend");
const toggle = document.getElementById("legend-toggle");

toggle.addEventListener("click", () => {
  legend.classList.toggle("collapsed");
  toggle.textContent = legend.classList.contains("collapsed") ? "☰" : "×";
});
