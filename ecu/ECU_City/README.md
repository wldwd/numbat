# Bike Routes to ECU City Campus

An interactive map showing bike routes, cycle lanes, and amenities for cyclists traveling to Edith Cowan University's City Campus.

## Requirements

- Web server (for hosting the HTML/CSS/JS files)
- Mapbox account and access token

**Note:** If you're setting up multiple map pages (e.g., City and Joondalup campuses), you only need to complete the Mapbox setup once. The same access token and style can be used across all map pages.

## Installation

1. Upload all files to your web server, maintaining the folder structure:

```
   your-project/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── city.geojson
   └── assets/
       ├── arrow.svg
       ├── bicycle.svg
       ├── drinking-water.svg
       ├── toilet.svg
       ├── picnic-table.svg
       ├── shower-head.svg
       ├── locker.svg
       ├── bicycle_box.svg
       ├── storefront.svg
       └── star.svg
```

2. Create a Mapbox account at [mapbox.com](https://www.mapbox.com/)

3. Copy the map style to your Mapbox account:

   - Make sure you're logged into your Mapbox account
   - Click this link: https://api.mapbox.com/styles/v1/numbatprojects/cmjgpvx61000a01sg2c0qf91k.html?title=copy&access_token=pk.eyJ1IjoibnVtYmF0cHJvamVjdHMiLCJhIjoiY2x6d3Mxa3EyMDlkajJycjJsa2R1b3UzZyJ9.NshixxCCMKdK-eCrVNTyHw&zoomwheel=true&fresh=true#14.09/-31.95044/115.86089
   - Click the "Copy style" button
   - Optionally, rename the style in Mapbox Studio for easier identification
   - Click the "Publish" button to publish your style
   - The style will now appear in your Mapbox Studio styles page

4. Get your style URL:

   - In Mapbox Studio, open your copied style
   - Click the "Share" button
   - Copy the style URL (it will look like `mapbox://styles/yourusername/yourstyleid`)

5. Get your Mapbox access token:

   - Go to your Mapbox account page
   - Navigate to the "Access tokens" section
   - Copy your default public token (or create a new one)

6. Add your credentials to the code:

   - Open `script.js` in a text editor
   - Find the line: `mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN_HERE";`
   - Replace the placeholder with your actual access token from step 5
   - Find the line with: `style: "YOUR_STYLE_HERE",`
   - Replace it with your style URL from step 4
   - Save the file

7. Test locally or deploy to your web server

## Troubleshooting

**Map doesn't load:**

- Check browser console for errors (F12 in most browsers)
- Verify your access token is correct
- Ensure `city.geojson` file path is correct

**401 Unauthorized error:**

- Your access token may be invalid or expired
- Create a new token in your Mapbox account

**Icons don't appear:**

- Check that the `assets/` folder uploaded correctly
- Verify file paths are relative to `index.html`

**CORS errors when testing locally:**

- Use a local web server (e.g., Python: `python -m http.server`)
- Or upload to your web server for testing

## Technical Details

- **Map Library:** Mapbox GL JS v3.17.0
- **Custom Style:** Custom Mapbox style with bike infrastructure layers
- **Data Format:** GeoJSON
- **Dependencies:** All loaded via CDN (no npm install required)

## Credits

- **Data:** Your Move / Department of Transport and Major Infrastructure, Edith Cowan University, Main Roads WA, City of Perth, OpenStreetMap
- **Map:** Numbat Geospatial / Georgia Scott
- **Mapping Platform:** Mapbox GL JS
