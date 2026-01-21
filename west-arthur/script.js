mapboxgl.accessToken =
  "pk.eyJ1IjoibnVtYmF0cHJvamVjdHMiLCJhIjoiY21rbzRka2RvMDF2NjNjcjI0MmNnYzBuYyJ9.Rq2u155x2skD8Q_iFAyN0w";

let currentPopup = null;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/outdoors-v12",
  center: [116.73117478944953, -33.47144934260539],
  zoom: 9,
});

map.addControl(new mapboxgl.ScaleControl(), "bottom-right");
map.addControl(new mapboxgl.NavigationControl(), "top-right");
map.on("zoom", () => {
  if (currentPopup) currentPopup.remove();
});

map.on("load", () => {
  // LGA boundary
  map.addSource("boundary", {
    type: "geojson",
    data: "west_arthur.geojson",
  });

  map.addLayer({
    id: "boundary-line",
    type: "line",
    source: "boundary",
    paint: {
      "line-color": "#333",
      "line-width": 2,
    },
  });

  // Trail 1: Collie-Darkan
  map.addSource("collie-darkan", {
    type: "geojson",
    data: "COLLIE_DARKAN.geojson",
  });

  map.addLayer({
    id: "collie-darkan-line",
    type: "line",
    source: "collie-darkan",
    paint: {
      "line-color": "#1d4ed8",
      "line-width": 3,
    },
  });

  // Trail 2: Darkan Heritage Trail
  map.addSource("heritage-trail", {
    type: "geojson",
    data: "Darkan_Heritage_Trail.geojson",
  });

  map.addLayer({
    id: "heritage-trail-line",
    type: "line",
    source: "heritage-trail",
    paint: {
      "line-color": "#d946ef",
      "line-width": 3,
    },
  });

  // POIs
  map.addSource("pois", {
    type: "geojson",
    data: "WEST_ARTHUR_POIS.geojson",
  });

  map.addLayer({
    id: "pois-points",
    type: "circle",
    source: "pois",
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "match",
        ["get", "category"],
        "Heritage",
        "#b5651d",
        "Trails",
        "#ba6de0",
        "Art",
        "#e63946",
        "Play",
        "#f4a261",
        "Nature",
        "#08ddcb",
        "Astrotourism",
        "#7c3aed",
        "#888888",
      ],
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 2,
    },
  });

  // POI popups
  map.on("click", "pois-points", (e) => {
    const props = e.features[0].properties;
    const coords = e.features[0].geometry.coordinates;
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords[1]},${coords[0]}`;

    let html = `<strong>${props.name}</strong>`;

    if (props.description) {
      html += `<p style="margin:8px 0;">${props.description}</p>`;
    }

    if (props.photo_url) {
      html += `<br><img src="${props.photo_url}" style="width:100%;max-width:200px;margin-top:8px;">`;
    }

    if (props.external_link) {
      html += `<br><a href="${props.external_link}" target="_blank">More info</a>`;
    }

    html += `<br><a href="${directionsUrl}" target="_blank">Get directions</a>`;

    if (currentPopup) currentPopup.remove();
    currentPopup = new mapboxgl.Popup()
      .setLngLat(coords)
      .setHTML(html)
      .addTo(map);
  });

  map.on("mouseenter", "pois-points", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "pois-points", () => {
    map.getCanvas().style.cursor = "";
  });

  // Collie-Darkan Rail Trail popup
  map.on("click", "collie-darkan-line", (e) => {
    const html = `
      <strong>Collie-Darkan Rail Trail</strong>
      <img src="https://www.westarthur.wa.gov.au/Profiles/westarthur/Assets/ClientData/Images/rail_trail_2.jpg" style="width:100%;max-width:200px;margin-top:8px;">
      <p style="margin:8px 0;">A scenic rail trail connecting Collie and Darkan.</p>
      <a href="https://trailswa.com.au/trails/trail/collie-darkan-rail-trail" target="_blank">More info & download KML</a>
    `;
    if (currentPopup) currentPopup.remove();
    currentPopup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(map);
  });

  map.on("mouseenter", "collie-darkan-line", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "collie-darkan-line", () => {
    map.getCanvas().style.cursor = "";
  });

  // Darkan Heritage Trail popup
  map.on("click", "heritage-trail-line", (e) => {
    const html = `
      <strong>Darkan Heritage Walk Trail</strong>
      <img src="https://www.westarthur.wa.gov.au/Profiles/westarthur/Assets/ClientData/Images/Nangip_Creek_4_-_Edited.jpg" style="width:100%;max-width:200px;margin-top:8px;">
      <p style="margin:8px 0;">A heritage walk through Darkan.</p>
      <a href="https://trailswa.com.au/trails/trail/darkan-heritage-walk-trail" target="_blank">More info & download KML</a>
    `;
    if (currentPopup) currentPopup.remove();
    currentPopup = new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(html)
      .addTo(map);
  });

  map.on("mouseenter", "heritage-trail-line", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "heritage-trail-line", () => {
    map.getCanvas().style.cursor = "";
  });
  const legend = document.getElementById("legend");
  const toggle = document.getElementById("legend-toggle");

  toggle.addEventListener("click", () => {
    legend.classList.toggle("collapsed");
    toggle.textContent = legend.classList.contains("collapsed") ? "☰" : "×";
  });
});
