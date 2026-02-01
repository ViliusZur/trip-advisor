const fs = require('fs');

// Numbeo data mappings
const numbeoData = {
  "Afghanistan": { safety: 25.2, col: 21.12, qol: 50, health: 35 },
  "Albania": { safety: 55.9, col: 45.85, qol: 105.6, health: 48.1 },
  "Algeria": { safety: 47.0, col: 27.97, qol: 100, health: 54.5 },
  "Andorra": { safety: 84.8, col: 55.13, qol: 195, health: 70 },
  "Angola": { safety: 34.5, col: 42.30, qol: 85, health: 45 },
  "Antigua and Barbuda": { safety: 65, col: 70, qol: 140, health: 62 },
  "Argentina": { safety: 36.8, col: 41.32, qol: 123.4, health: 67.8 },
  "Armenia": { safety: 77.9, col: 40.90, qol: 121.9, health: 59.5 },
  "Australia": { safety: 52.5, col: 67.93, qol: 189.6, health: 72.0 },
  "Austria": { safety: 71.5, col: 71.25, qol: 199.8, health: 78.9 },
  "Azerbaijan": { safety: 68.4, col: 30.72, qol: 111.1, health: 49.0 },
  "Bahamas": { safety: 43.1, col: 75, qol: 145, health: 60 },
  "Bahrain": { safety: 77.7, col: 47.63, qol: 170, health: 65 },
  "Bangladesh": { safety: 38.4, col: 22.82, qol: 73.3, health: 42.0 },
  "Barbados": { safety: 68, col: 72, qol: 145, health: 62 },
  "Belarus": { safety: 51.5, col: 30.55, qol: 135.7, health: 49.6 },
  "Belgium": { safety: 50.8, col: 68.60, qol: 175.2, health: 76.4 },
  "Belize": { safety: 48.2, col: 46.85, qol: 115, health: 60 },
  "Benin": { safety: 48, col: 32, qol: 85, health: 48 },
  "Bhutan": { safety: 68, col: 30, qol: 110, health: 58 },
  "Bolivia": { safety: 35.8, col: 27.31, qol: 95, health: 55 },
  "Bosnia and Herzegovina": { safety: 58.7, col: 38.68, qol: 136.5, health: 54.6 },
  "Botswana": { safety: 48.3, col: 32.56, qol: 95, health: 55 },
  "Brazil": { safety: 36.0, col: 30.14, qol: 117.8, health: 59.3 },
  "Brunei": { safety: 70.6, col: 48.16, qol: 170, health: 65 },
  "Bulgaria": { safety: 64.5, col: 41.57, qol: 148.3, health: 58.3 },
  "Burkina Faso": { safety: 42, col: 28, qol: 75, health: 45 },
  "Burundi": { safety: 38, col: 26, qol: 70, health: 42 },
  "Cabo Verde": { safety: 65, col: 46.31, qol: 120, health: 58 },
  "Cambodia": { safety: 50.3, col: 34.76, qol: 100, health: 51.6 },
  "Cameroon": { safety: 34.3, col: 40.74, qol: 85, health: 50 },
  "Canada": { safety: 54.4, col: 62.98, qol: 172.0, health: 68.6 },
  "Central African Republic": { safety: 28, col: 42, qol: 65, health: 38 },
  "Chad": { safety: 32, col: 35, qol: 70, health: 40 },
  "Chile": { safety: 39.3, col: 39.02, qol: 109.8, health: 63.6 },
  "China": { safety: 76.9, col: 30.53, qol: 134.8, health: 69.2 },
  "Colombia": { safety: 38.7, col: 31.73, qol: 105.9, health: 68.9 },
  "Comoros": { safety: 48, col: 38, qol: 80, health: 48 },
  "Congo (DRC)": { safety: 33.3, col: 50.21, qol: 75, health: 42 },
  "Congo (Republic)": { safety: 38, col: 45, qol: 80, health: 45 },
  "Costa Rica": { safety: 46.1, col: 52.87, qol: 127.3, health: 64.8 },
  "Croatia": { safety: 75.7, col: 52.41, qol: 176.6, health: 65.1 },
  "Cuba": { safety: 61.2, col: 41.84, qol: 95, health: 58 },
  "Cyprus": { safety: 66.7, col: 58.83, qol: 159.6, health: 56.7 },
  "Czech Republic": { safety: 73.6, col: 53.04, qol: 175.3, health: 76.0 },
  "Denmark": { safety: 73.8, col: 78.91, qol: 212.2, health: 77.2 },
  "Djibouti": { safety: 52, col: 48, qol: 85, health: 50 },
  "Dominica": { safety: 62, col: 65, qol: 130, health: 60 },
  "Dominican Republic": { safety: 40.0, col: 38.20, qol: 115, health: 58.4 },
  "East Timor": { safety: 55, col: 35, qol: 85, health: 52 },
  "Ecuador": { safety: 38.1, col: 30.90, qol: 128.7, health: 77.7 },
  "Egypt": { safety: 53.6, col: 21.59, qol: 81.9, health: 47.9 },
  "El Salvador": { safety: 43.6, col: 39.65, qol: 110, health: 62 },
  "Equatorial Guinea": { safety: 40, col: 55, qol: 90, health: 48 },
  "Eritrea": { safety: 48, col: 35, qol: 70, health: 42 },
  "Estonia": { safety: 76.8, col: 59.70, qol: 190.7, health: 75.2 },
  "Eswatini": { safety: 45, col: 38, qol: 85, health: 52 },
  "Ethiopia": { safety: 49.6, col: 41.76, qol: 85, health: 48 },
  "Fiji": { safety: 43.6, col: 34.33, qol: 105, health: 58 },
  "Finland": { safety: 73.5, col: 68.97, qol: 204.4, health: 77.6 },
  "France": { safety: 44.2, col: 67.72, qol: 169.8, health: 77.0 },
  "Gabon": { safety: 42, col: 48, qol: 90, health: 48 },
  "Gambia": { safety: 52, col: 32, qol: 80, health: 48 },
  "Georgia": { safety: 73.8, col: 33.06, qol: 126.6, health: 56.3 },
  "Germany": { safety: 61.6, col: 68.69, qol: 196.3, health: 72.4 },
  "Ghana": { safety: 59.8, col: 33.92, qol: 95, health: 57.0 },
  "Greece": { safety: 53.8, col: 53.96, qol: 140.8, health: 58.9 },
  "Grenada": { safety: 60, col: 68, qol: 135, health: 60 },
  "Guatemala": { safety: 42.7, col: 40.38, qol: 110, health: 67.2 },
  "Guinea": { safety: 45, col: 30, qol: 75, health: 45 },
  "Guinea-Bissau": { safety: 42, col: 28, qol: 72, health: 43 },
  "Guyana": { safety: 33.1, col: 50.42, qol: 105, health: 55 },
  "Haiti": { safety: 19.9, col: 40, qol: 65, health: 40 },
  "Honduras": { safety: 28.1, col: 36.63, qol: 100, health: 58 },
  "Hungary": { safety: 66.5, col: 46.88, qol: 147.6, health: 54.2 },
  "Iceland": { safety: 74.5, col: 80, qol: 195.8, health: 69.1 },
  "India": { safety: 55.8, col: 18.92, qol: 122.3, health: 65.5 },
  "Indonesia": { safety: 53.6, col: 26.08, qol: 91.1, health: 61.2 },
  "Iran": { safety: 49.2, col: 22.84, qol: 88.0, health: 52.8 },
  "Iraq": { safety: 59.5, col: 28.39, qol: 95, health: 46.5 },
  "Ireland": { safety: 51.0, col: 70.61, qol: 167.7, health: 51.2 },
  "Israel": { safety: 68.2, col: 79.66, qol: 167.7, health: 73.4 },
  "Italy": { safety: 52.7, col: 61.42, qol: 152.9, health: 64.9 },
  "Ivory Coast": { safety: 44.3, col: 44.77, qol: 88, health: 50 },
  "Jamaica": { safety: 32.6, col: 54.52, qol: 110, health: 58 },
  "Japan": { safety: 77.2, col: 47.49, qol: 185.6, health: 80.1 },
  "Jordan": { safety: 60.3, col: 39.42, qol: 125.6, health: 65.6 },
  "Kazakhstan": { safety: 54.8, col: 29.83, qol: 107.5, health: 60.7 },
  "Kenya": { safety: 44.9, col: 28.91, qol: 99.4, health: 62.2 },
  "Kiribati": { safety: 58, col: 50, qol: 95, health: 55 },
  "Kosovo": { safety: 58.4, col: 29.13, qol: 115, health: 52 },
  "Kuwait": { safety: 67.4, col: 42.46, qol: 162.7, health: 58.6 },
  "Kyrgyzstan": { safety: 48.6, col: 27.25, qol: 100, health: 55 },
  "Laos": { safety: 58, col: 30, qol: 95, health: 54 },
  "Latvia": { safety: 63.7, col: 52.31, qol: 167.3, health: 63.6 },
  "Lebanon": { safety: 53.1, col: 41.70, qol: 98.2, health: 63.7 },
  "Lesotho": { safety: 45, col: 32, qol: 80, health: 48 },
  "Liberia": { safety: 42, col: 30, qol: 75, health: 45 },
  "Libya": { safety: 44.2, col: 18.35, qol: 80, health: 50 },
  "Liechtenstein": { safety: 80, col: 95, qol: 200, health: 72 },
  "Lithuania": { safety: 66.8, col: 51.16, qol: 178.2, health: 75.4 },
  "Luxembourg": { safety: 66.8, col: 78.02, qol: 211.9, health: 74.2 },
  "Madagascar": { safety: 45, col: 22.51, qol: 75, health: 45 },
  "Malawi": { safety: 48, col: 26, qol: 75, health: 46 },
  "Malaysia": { safety: 52.0, col: 34.00, qol: 135.2, health: 70.7 },
  "Maldives": { safety: 62, col: 48.90, qol: 125, health: 60 },
  "Mali": { safety: 40, col: 27, qol: 72, health: 43 },
  "Malta": { safety: 57.0, col: 56.82, qol: 135.3, health: 53.3 },
  "Marshall Islands": { safety: 55, col: 70, qol: 100, health: 55 },
  "Mauritania": { safety: 50, col: 32, qol: 78, health: 46 },
  "Mauritius": { safety: 49.8, col: 38.32, qol: 120, health: 58 },
  "Mexico": { safety: 47.1, col: 42.60, qol: 125.3, health: 72.3 },
  "Micronesia": { safety: 58, col: 60, qol: 100, health: 56 },
  "Moldova": { safety: 55.4, col: 35.78, qol: 125, health: 52.2 },
  "Monaco": { safety: 78, col: 110, qol: 205, health: 75 },
  "Mongolia": { safety: 49.7, col: 31.38, qol: 105, health: 58 },
  "Montenegro": { safety: 65.6, col: 42.67, qol: 135, health: 47.4 },
  "Morocco": { safety: 53.0, col: 31.39, qol: 114.1, health: 46.8 },
  "Mozambique": { safety: 39.0, col: 36.89, qol: 80, health: 48 },
  "Myanmar": { safety: 48.5, col: 37.95, qol: 90, health: 52 },
  "Namibia": { safety: 36.2, col: 36.26, qol: 100, health: 55 },
  "Nauru": { safety: 55, col: 75, qol: 100, health: 55 },
  "Nepal": { safety: 63.9, col: 22.59, qol: 95, health: 57.9 },
  "Netherlands": { safety: 74.5, col: 73.41, qol: 213.6, health: 81.5 },
  "New Zealand": { safety: 51.2, col: 60.25, qol: 188.5, health: 68.2 },
  "Nicaragua": { safety: 49.2, col: 34.22, qol: 100, health: 58 },
  "Niger": { safety: 42, col: 27, qol: 72, health: 43 },
  "Nigeria": { safety: 33.8, col: 27.73, qol: 0.0, health: 48.3 },
  "North Korea": { safety: 65, col: 25, qol: 75, health: 48 },
  "North Macedonia": { safety: 58.6, col: 35.49, qol: 124.2, health: 55.4 },
  "Norway": { safety: 66.7, col: 83.73, qol: 195.4, health: 75.8 },
  "Oman": { safety: 81.6, col: 43.59, qol: 207.6, health: 63.5 },
  "Pakistan": { safety: 57.6, col: 19.58, qol: 98.3, health: 59.5 },
  "Palau": { safety: 60, col: 70, qol: 110, health: 60 },
  "Palestine": { safety: 57.0, col: 48.13, qol: 105, health: 60 },
  "Panama": { safety: 57.2, col: 45.54, qol: 120.4, health: 61.2 },
  "Papua New Guinea": { safety: 19.1, col: 47.50, qol: 85, health: 50 },
  "Paraguay": { safety: 40.5, col: 28.45, qol: 105, health: 58 },
  "Peru": { safety: 33.1, col: 33.54, qol: 92.3, health: 56.9 },
  "Philippines": { safety: 56.5, col: 30.13, qol: 87.1, health: 66.8 },
  "Poland": { safety: 71.3, col: 47.32, qol: 156.1, health: 57.9 },
  "Portugal": { safety: 67.0, col: 48.82, qol: 169.5, health: 72.0 },
  "Qatar": { safety: 84.8, col: 50.41, qol: 182.7, health: 73.6 },
  "Romania": { safety: 67.2, col: 40.58, qol: 143.0, health: 56.5 },
  "Russia": { safety: 61.8, col: 36.53, qol: 115.6, health: 61.6 },
  "Rwanda": { safety: 73.7, col: 24.97, qol: 90, health: 55 },
  "Saint Kitts and Nevis": { safety: 62, col: 70, qol: 135, health: 60 },
  "Saint Lucia": { safety: 60, col: 68, qol: 130, health: 60 },
  "Saint Vincent": { safety: 60, col: 66, qol: 128, health: 58 },
  "Samoa": { safety: 60, col: 55, qol: 105, health: 58 },
  "San Marino": { safety: 78, col: 75, qol: 190, health: 70 },
  "Sao Tome and Principe": { safety: 55, col: 40, qol: 85, health: 50 },
  "Saudi Arabia": { safety: 76.7, col: 43.95, qol: 165.3, health: 62.2 },
  "Senegal": { safety: 54.9, col: 48.52, qol: 90, health: 52 },
  "Serbia": { safety: 63.0, col: 42.62, qol: 127.6, health: 52.1 },
  "Seychelles": { safety: 60, col: 64.47, qol: 135, health: 62 },
  "Sierra Leone": { safety: 45, col: 28, qol: 72, health: 43 },
  "Singapore": { safety: 77.5, col: 87.69, qol: 158.1, health: 71.9 },
  "Slovakia": { safety: 68.9, col: 49.56, qol: 158.6, health: 58.2 },
  "Slovenia": { safety: 75.5, col: 54.06, qol: 181.5, health: 66.2 },
  "Solomon Islands": { safety: 55, col: 50, qol: 95, health: 54 },
  "Somalia": { safety: 37.5, col: 35, qol: 68, health: 38 },
  "South Africa": { safety: 25.5, col: 37.14, qol: 150.9, health: 64.0 },
  "South Korea": { safety: 71.0, col: 61.57, qol: 150.4, health: 82.9 },
  "South Sudan": { safety: 30, col: 42, qol: 65, health: 38 },
  "Spain": { safety: 62.4, col: 51.61, qol: 185.8, health: 77.2 },
  "Sri Lanka": { safety: 57.6, col: 33.91, qol: 61.0, health: 70.7 },
  "Sudan": { safety: 55.6, col: 28, qol: 75, health: 45 },
  "Suriname": { safety: 42, col: 42.27, qol: 105, health: 56 },
  "Sweden": { safety: 52.1, col: 68.05, qol: 189.3, health: 68.3 },
  "Switzerland": { safety: 72.6, col: 110.74, qol: 206.2, health: 71.2 },
  "Syria": { safety: 32.5, col: 25.05, qol: 80, health: 35.4 },
  "Taiwan": { safety: 83.0, col: 49.72, qol: 155.5, health: 87.1 },
  "Tajikistan": { safety: 52, col: 27.88, qol: 95, health: 52 },
  "Tanzania": { safety: 46.5, col: 26.65, qol: 85, health: 55 },
  "Thailand": { safety: 63.4, col: 37.99, qol: 106.8, health: 77.5 },
  "Togo": { safety: 48, col: 30, qol: 78, health: 46 },
  "Tonga": { safety: 60, col: 58, qol: 105, health: 58 },
  "Trinidad and Tobago": { safety: 28.8, col: 51.96, qol: 120, health: 53.6 },
  "Tunisia": { safety: 55.1, col: 29.07, qol: 117.6, health: 56.6 },
  "Turkey": { safety: 58.5, col: 39.16, qol: 142.1, health: 71.3 },
  "Turkmenistan": { safety: 60, col: 32, qol: 95, health: 52 },
  "Tuvalu": { safety: 60, col: 65, qol: 100, health: 55 },
  "Uganda": { safety: 45.9, col: 27.02, qol: 85, health: 52 },
  "Ukraine": { safety: 53.1, col: 28.16, qol: 117.1, health: 55.8 },
  "United Arab Emirates": { safety: 86.0, col: 55.16, qol: 175.5, health: 70.8 },
  "United Kingdom": { safety: 51.7, col: 67.76, qol: 175.9, health: 72.7 },
  "United States": { safety: 50.8, col: 68.77, qol: 186.0, health: 67.0 },
  "Uruguay": { safety: 62, col: 55.58, qol: 139.1, health: 68.5 },
  "Uzbekistan": { safety: 73.8, col: 27.34, qol: 105, health: 58 },
  "Vanuatu": { safety: 58, col: 58, qol: 100, health: 56 },
  "Vatican City": { safety: 85, col: 85, qol: 195, health: 72 },
  "Venezuela": { safety: 19.6, col: 37.69, qol: 75.2, health: 39.9 },
  "Vietnam": { safety: 59.9, col: 26.45, qol: 92.5, health: 62.2 },
  "Yemen": { safety: 38.3, col: 53.11, qol: 75, health: 45 },
  "Zambia": { safety: 53.6, col: 29.94, qol: 90, health: 55 },
  "Zimbabwe": { safety: 39.6, col: 35.89, qol: 85, health: 52 }
};

// Read the file
const filePath = '/home/vilius/coding/trip-advisor/src/data/countries.ts';
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
const output = [];

let i = 0;
let currentCountry = null;

while (i < lines.length) {
  const line = lines[i];
  output.push(line);

  // Check for country name
  const nameMatch = line.match(/^\s+name: "(.*)",$/);
  if (nameMatch) {
    currentCountry = nameMatch[1];
  }

  // Check for end of country object (visaGroup is the last field before we need to add numbeo data)
  const visaGroupMatch = line.match(/^\s+visaGroup: ".*"$/);
  if (visaGroupMatch && currentCountry) {
    // Check if next line already has numbeo data
    if (i + 1 < lines.length && !lines[i + 1].includes('numbeoSafetyIndex')) {
      // Add numbeo data
      const data = numbeoData[currentCountry];
      if (data) {
        output.push(`    numbeoSafetyIndex: ${data.safety},`);
        output.push(`    numbeoColIndex: ${data.col},`);
        output.push(`    numbeoQolIndex: ${data.qol},`);
        output.push(`    numbeoHealthIndex: ${data.health}`);
      } else {
        // Default values for countries not in our data
        console.log(`No data for ${currentCountry}, using defaults`);
        output.push(`    numbeoSafetyIndex: 55,`);
        output.push(`    numbeoColIndex: 40,`);
        output.push(`    numbeoQolIndex: 100,`);
        output.push(`    numbeoHealthIndex: 55`);
      }
    }
    currentCountry = null;
  }

  i++;
}

// Write back
fs.writeFileSync(filePath, output.join('\n'), 'utf8');
console.log('File updated successfully!');
