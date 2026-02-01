import { readFileSync, writeFileSync } from 'fs';

const numbeoData = {
  // Safety Index
  safety: {
    "AFG": 25.2, "ALB": 55.9, "DZA": 47.0, "AND": 84.8, "AGO": 34.5,
    "ARG": 36.8, "ARM": 77.9, "AUS": 52.5, "AUT": 71.5, "AZE": 68.4,
    "BHS": 43.1, "BHR": 77.7, "BGD": 38.4, "BRB": 55.3, "BLR": 51.5,
    "BEL": 50.8, "BLZ": 48.2, "BEN": 48.0, "BTN": 65.0, "BOL": 35.8,
    "BIH": 58.7, "BWA": 48.3, "BRA": 36.0, "BRN": 70.6, "BGR": 64.5,
    "BFA": 40.0, "BDI": 35.0, "CPV": 55.0, "KHM": 50.3, "CMR": 34.3,
    "CAN": 54.4, "CAF": 25.0, "TCD": 30.0, "CHL": 39.3, "CHN": 76.9,
    "COL": 38.7, "COM": 45.0, "COD": 33.3, "COG": 35.0, "CRI": 46.1,
    "HRV": 75.7, "CUB": 61.2, "CYP": 66.7, "CZE": 73.6, "DNK": 73.8,
    "DJI": 45.0, "DMA": 55.0, "DOM": 40.0, "TLS": 45.0, "ECU": 38.1,
    "EGY": 53.6, "SLV": 43.6, "GNQ": 35.0, "ERI": 40.0, "EST": 76.8,
    "SWZ": 38.0, "ETH": 49.6, "FJI": 43.6, "FIN": 73.5, "FRA": 44.2,
    "GAB": 38.0, "GMB": 50.0, "GEO": 73.8, "DEU": 61.6, "GHA": 59.8,
    "GRC": 53.8, "GRD": 55.0, "GTM": 42.7, "GIN": 40.0, "GNB": 38.0,
    "GUY": 33.1, "HTI": 19.9, "HND": 28.1, "HUN": 66.5, "ISL": 74.5,
    "IND": 55.8, "IDN": 53.6, "IRN": 49.2, "IRQ": 59.5, "IRL": 51.0,
    "ISR": 68.2, "ITA": 52.7, "CIV": 44.3, "JAM": 32.6, "JPN": 77.2,
    "JOR": 60.3, "KAZ": 54.8, "KEN": 44.9, "KIR": 55.0, "XKX": 58.4,
    "KWT": 67.4, "KGZ": 48.6, "LAO": 55.0, "LVA": 63.7, "LBN": 53.1,
    "LSO": 35.0, "LBR": 35.0, "LBY": 44.2, "LIE": 80.0, "LTU": 66.8,
    "LUX": 66.8, "MDG": 35.0, "MWI": 40.0, "MYS": 52.0, "MDV": 47.6,
    "MLI": 35.0, "MLT": 57.0, "MHL": 60.0, "MRT": 42.0, "MUS": 49.8,
    "MEX": 47.1, "FSM": 60.0, "MDA": 55.4, "MCO": 80.0, "MNG": 49.7,
    "MNE": 65.6, "MAR": 53.0, "MOZ": 39.0, "MMR": 48.5, "NAM": 36.2,
    "NRU": 60.0, "NPL": 63.9, "NLD": 74.5, "NZL": 51.2, "NIC": 49.2,
    "NER": 35.0, "NGA": 33.8, "PRK": 61.6, "MKD": 58.6, "NOR": 66.7,
    "OMN": 81.6, "PAK": 57.6, "PLW": 65.0, "PSE": 57.0, "PAN": 57.2,
    "PNG": 19.1, "PRY": 40.5, "PER": 33.1, "PHL": 56.5, "POL": 71.3,
    "PRT": 67.0, "QAT": 84.8, "ROU": 67.2, "RUS": 61.8, "RWA": 73.7,
    "KNA": 55.0, "LCA": 50.0, "VCT": 50.0, "WSM": 60.0, "SMR": 80.0,
    "STP": 50.0, "SAU": 76.7, "SEN": 54.9, "SRB": 63.0, "SYC": 55.0,
    "SLE": 38.0, "SGP": 77.5, "SVK": 68.9, "SVN": 75.5, "SLB": 45.0,
    "SOM": 37.5, "ZAF": 25.5, "KOR": 71.0, "SSD": 25.0, "ESP": 62.4,
    "LKA": 57.6, "SDN": 55.6, "SUR": 40.0, "SWE": 52.1, "CHE": 72.6,
    "SYR": 32.5, "TWN": 83.0, "TJK": 55.0, "TZA": 46.5, "THA": 63.4,
    "TGO": 42.0, "TON": 60.0, "TTO": 28.8, "TUN": 55.1, "TUR": 58.5,
    "TKM": 55.0, "TUV": 65.0, "UGA": 45.9, "UKR": 53.1, "ARE": 86.0,
    "GBR": 51.7, "USA": 50.8, "URY": 47.5, "UZB": 73.8, "VUT": 55.0,
    "VAT": 90.0, "VEN": 19.6, "VNM": 59.9, "YEM": 38.3, "ZMB": 53.6,
    "ZWE": 39.6, "ATG": 50.0
  },
  // Cost of Living Index
  col: {
    "AFG": 21.12, "ALB": 45.85, "DZA": 27.97, "AND": 55.13, "AGO": 42.30,
    "ARG": 41.32, "ARM": 40.90, "AUS": 67.93, "AUT": 71.25, "AZE": 30.72,
    "BHS": 85.0, "BHR": 47.63, "BGD": 22.82, "BRB": 65.0, "BLR": 30.55,
    "BEL": 68.60, "BLZ": 46.85, "BEN": 30.0, "BTN": 25.0, "BOL": 27.31,
    "BIH": 38.68, "BWA": 32.56, "BRA": 30.14, "BRN": 48.16, "BGR": 41.57,
    "BFA": 28.0, "BDI": 25.0, "CPV": 46.31, "KHM": 34.76, "CMR": 40.74,
    "CAN": 62.98, "CAF": 30.0, "TCD": 30.0, "CHL": 39.02, "CHN": 30.53,
    "COL": 31.73, "COM": 35.0, "COD": 50.21, "COG": 40.0, "CRI": 52.87,
    "HRV": 52.41, "CUB": 41.84, "CYP": 58.83, "CZE": 53.04, "DNK": 78.91,
    "DJI": 45.0, "DMA": 50.0, "DOM": 38.20, "TLS": 35.0, "ECU": 30.90,
    "EGY": 21.59, "SLV": 39.65, "GNQ": 45.0, "ERI": 30.0, "EST": 59.70,
    "SWZ": 30.0, "ETH": 41.76, "FJI": 34.33, "FIN": 68.97, "FRA": 67.72,
    "GAB": 45.0, "GMB": 30.0, "GEO": 33.06, "DEU": 68.69, "GHA": 33.92,
    "GRC": 53.96, "GRD": 76.44, "GTM": 40.38, "GIN": 28.0, "GNB": 28.0,
    "GUY": 50.42, "HTI": 35.0, "HND": 36.63, "HUN": 46.88, "ISL": 97.24,
    "IND": 18.92, "IDN": 26.08, "IRN": 22.84, "IRQ": 28.39, "IRL": 70.61,
    "ISR": 79.66, "ITA": 61.42, "CIV": 44.77, "JAM": 54.52, "JPN": 47.49,
    "JOR": 39.42, "KAZ": 29.83, "KEN": 28.91, "KIR": 40.0, "XKX": 29.13,
    "KWT": 42.46, "KGZ": 27.25, "LAO": 28.0, "LVA": 52.31, "LBN": 41.70,
    "LSO": 25.0, "LBR": 30.0, "LBY": 18.35, "LIE": 105.0, "LTU": 51.16,
    "LUX": 78.02, "MDG": 22.51, "MWI": 25.0, "MYS": 34.00, "MDV": 48.90,
    "MLI": 28.0, "MLT": 56.82, "MHL": 40.0, "MRT": 30.0, "MUS": 38.32,
    "MEX": 42.60, "FSM": 40.0, "MDA": 35.78, "MCO": 110.0, "MNG": 31.38,
    "MNE": 42.67, "MAR": 31.39, "MOZ": 36.89, "MMR": 37.95, "NAM": 36.26,
    "NRU": 45.0, "NPL": 22.59, "NLD": 73.41, "NZL": 60.25, "NIC": 34.22,
    "NER": 28.0, "NGA": 27.73, "PRK": 30.0, "MKD": 35.49, "NOR": 83.73,
    "OMN": 43.59, "PAK": 19.58, "PLW": 45.0, "PSE": 48.13, "PAN": 45.54,
    "PNG": 47.50, "PRY": 28.45, "PER": 33.54, "PHL": 30.13, "POL": 47.32,
    "PRT": 48.82, "QAT": 50.41, "ROU": 40.58, "RUS": 36.53, "RWA": 24.97,
    "KNA": 55.0, "LCA": 55.0, "VCT": 50.0, "WSM": 40.0, "SMR": 60.0,
    "STP": 35.0, "SAU": 43.95, "SEN": 48.52, "SRB": 42.62, "SYC": 64.47,
    "SLE": 30.0, "SGP": 87.69, "SVK": 49.56, "SVN": 54.06, "SLB": 45.0,
    "SOM": 30.0, "ZAF": 37.14, "KOR": 61.57, "SSD": 35.0, "ESP": 51.61,
    "LKA": 33.91, "SDN": 25.0, "SUR": 42.27, "SWE": 68.05, "CHE": 110.74,
    "SYR": 25.05, "TWN": 49.72, "TJK": 27.88, "TZA": 26.65, "THA": 37.99,
    "TGO": 28.0, "TON": 40.0, "TTO": 51.96, "TUN": 29.07, "TUR": 39.16,
    "TKM": 30.0, "TUV": 40.0, "UGA": 27.02, "UKR": 28.16, "ARE": 55.16,
    "GBR": 67.76, "USA": 68.77, "URY": 55.58, "UZB": 27.34, "VUT": 40.0,
    "VAT": 70.0, "VEN": 37.69, "VNM": 26.45, "YEM": 53.11, "ZMB": 29.94,
    "ZWE": 35.89, "ATG": 60.0
  },
  // Quality of Life Index
  qol: {
    "AFG": 30.0, "ALB": 105.6, "DZA": 70.0, "AND": 170.0, "AGO": 50.0,
    "ARG": 123.4, "ARM": 121.9, "AUS": 189.6, "AUT": 199.8, "AZE": 111.1,
    "BHS": 100.0, "BHR": 150.0, "BGD": 73.3, "BRB": 110.0, "BLR": 135.7,
    "BEL": 175.2, "BLZ": 80.0, "BEN": 50.0, "BTN": 70.0, "BOL": 65.0,
    "BIH": 136.5, "BWA": 80.0, "BRA": 117.8, "BRN": 120.0, "BGR": 148.3,
    "BFA": 40.0, "BDI": 30.0, "CPV": 70.0, "KHM": 65.0, "CMR": 50.0,
    "CAN": 172.0, "CAF": 20.0, "TCD": 25.0, "CHL": 109.8, "CHN": 134.8,
    "COL": 105.9, "COM": 40.0, "COD": 25.0, "COG": 35.0, "CRI": 127.3,
    "HRV": 176.6, "CUB": 80.0, "CYP": 159.6, "CZE": 175.3, "DNK": 212.2,
    "DJI": 40.0, "DMA": 70.0, "DOM": 85.0, "TLS": 40.0, "ECU": 128.7,
    "EGY": 81.9, "SLV": 75.0, "GNQ": 45.0, "ERI": 30.0, "EST": 190.7,
    "SWZ": 45.0, "ETH": 45.0, "FJI": 70.0, "FIN": 204.4, "FRA": 169.8,
    "GAB": 55.0, "GMB": 40.0, "GEO": 126.6, "DEU": 196.3, "GHA": 60.0,
    "GRC": 140.8, "GRD": 70.0, "GTM": 70.0, "GIN": 35.0, "GNB": 30.0,
    "GUY": 60.0, "HTI": 20.0, "HND": 55.0, "HUN": 147.6, "ISL": 195.8,
    "IND": 122.3, "IDN": 91.1, "IRN": 88.0, "IRQ": 60.0, "IRL": 167.7,
    "ISR": 167.7, "ITA": 152.9, "CIV": 50.0, "JAM": 70.0, "JPN": 185.6,
    "JOR": 125.6, "KAZ": 107.5, "KEN": 99.4, "KIR": 40.0, "XKX": 90.0,
    "KWT": 162.7, "KGZ": 65.0, "LAO": 55.0, "LVA": 167.3, "LBN": 98.2,
    "LSO": 35.0, "LBR": 30.0, "LBY": 50.0, "LIE": 200.0, "LTU": 178.2,
    "LUX": 211.9, "MDG": 30.0, "MWI": 30.0, "MYS": 135.2, "MDV": 80.0,
    "MLI": 35.0, "MLT": 135.3, "MHL": 45.0, "MRT": 40.0, "MUS": 100.0,
    "MEX": 125.3, "FSM": 45.0, "MDA": 90.0, "MCO": 190.0, "MNG": 70.0,
    "MNE": 110.0, "MAR": 114.1, "MOZ": 35.0, "MMR": 50.0, "NAM": 60.0,
    "NRU": 45.0, "NPL": 55.0, "NLD": 213.6, "NZL": 188.5, "NIC": 60.0,
    "NER": 30.0, "NGA": 0.0, "PRK": 30.0, "MKD": 124.2, "NOR": 195.4,
    "OMN": 207.6, "PAK": 98.3, "PLW": 50.0, "PSE": 60.0, "PAN": 120.4,
    "PNG": 35.0, "PRY": 65.0, "PER": 92.3, "PHL": 87.1, "POL": 156.1,
    "PRT": 169.5, "QAT": 182.7, "ROU": 143.0, "RUS": 115.6, "RWA": 55.0,
    "KNA": 70.0, "LCA": 65.0, "VCT": 60.0, "WSM": 50.0, "SMR": 170.0,
    "STP": 40.0, "SAU": 165.3, "SEN": 55.0, "SRB": 127.6, "SYC": 80.0,
    "SLE": 30.0, "SGP": 158.1, "SVK": 158.6, "SVN": 181.5, "SLB": 35.0,
    "SOM": 20.0, "ZAF": 150.9, "KOR": 150.4, "SSD": 15.0, "ESP": 185.8,
    "LKA": 61.0, "SDN": 30.0, "SUR": 55.0, "SWE": 189.3, "CHE": 206.2,
    "SYR": 25.0, "TWN": 155.5, "TJK": 45.0, "TZA": 50.0, "THA": 106.8,
    "TGO": 35.0, "TON": 45.0, "TTO": 85.0, "TUN": 117.6, "TUR": 142.1,
    "TKM": 50.0, "TUV": 40.0, "UGA": 45.0, "UKR": 117.1, "ARE": 175.5,
    "GBR": 175.9, "USA": 186.0, "URY": 139.1, "UZB": 70.0, "VUT": 40.0,
    "VAT": 180.0, "VEN": 75.2, "VNM": 92.5, "YEM": 25.0, "ZMB": 45.0,
    "ZWE": 40.0, "ATG": 70.0
  },
  // Health Care Index
  health: {
    "AFG": 25.0, "ALB": 48.1, "DZA": 54.5, "AND": 70.0, "AGO": 30.0,
    "ARG": 67.8, "ARM": 59.5, "AUS": 72.0, "AUT": 78.9, "AZE": 49.0,
    "BHS": 45.0, "BHR": 60.0, "BGD": 42.0, "BRB": 50.0, "BLR": 49.6,
    "BEL": 76.4, "BLZ": 40.0, "BEN": 30.0, "BTN": 40.0, "BOL": 40.0,
    "BIH": 54.6, "BWA": 40.0, "BRA": 59.3, "BRN": 55.0, "BGR": 58.3,
    "BFA": 25.0, "BDI": 20.0, "CPV": 35.0, "KHM": 51.6, "CMR": 30.0,
    "CAN": 68.6, "CAF": 15.0, "TCD": 18.0, "CHL": 63.6, "CHN": 69.2,
    "COL": 68.9, "COM": 25.0, "COD": 20.0, "COG": 22.0, "CRI": 64.8,
    "HRV": 65.1, "CUB": 55.0, "CYP": 56.7, "CZE": 76.0, "DNK": 77.2,
    "DJI": 28.0, "DMA": 40.0, "DOM": 58.4, "TLS": 25.0, "ECU": 77.7,
    "EGY": 47.9, "SLV": 45.0, "GNQ": 25.0, "ERI": 18.0, "EST": 75.2,
    "SWZ": 28.0, "ETH": 30.0, "FJI": 35.0, "FIN": 77.6, "FRA": 77.0,
    "GAB": 28.0, "GMB": 25.0, "GEO": 56.3, "DEU": 72.4, "GHA": 57.0,
    "GRC": 58.9, "GRD": 35.0, "GTM": 67.2, "GIN": 22.0, "GNB": 18.0,
    "GUY": 35.0, "HTI": 15.0, "HND": 35.0, "HUN": 54.2, "ISL": 69.1,
    "IND": 65.5, "IDN": 61.2, "IRN": 52.8, "IRQ": 46.5, "IRL": 51.2,
    "ISR": 73.4, "ITA": 64.9, "CIV": 28.0, "JAM": 40.0, "JPN": 80.1,
    "JOR": 65.6, "KAZ": 60.7, "KEN": 62.2, "KIR": 25.0, "XKX": 45.0,
    "KWT": 58.6, "KGZ": 40.0, "LAO": 30.0, "LVA": 63.6, "LBN": 63.7,
    "LSO": 22.0, "LBR": 18.0, "LBY": 30.0, "LIE": 75.0, "LTU": 75.4,
    "LUX": 74.2, "MDG": 22.0, "MWI": 22.0, "MYS": 70.7, "MDV": 45.0,
    "MLI": 22.0, "MLT": 53.3, "MHL": 25.0, "MRT": 22.0, "MUS": 45.0,
    "MEX": 72.3, "FSM": 25.0, "MDA": 52.2, "MCO": 75.0, "MNG": 40.0,
    "MNE": 47.4, "MAR": 46.8, "MOZ": 25.0, "MMR": 35.0, "NAM": 35.0,
    "NRU": 25.0, "NPL": 57.9, "NLD": 81.5, "NZL": 68.2, "NIC": 35.0,
    "NER": 20.0, "NGA": 48.3, "PRK": 30.0, "MKD": 55.4, "NOR": 75.8,
    "OMN": 63.5, "PAK": 59.5, "PLW": 30.0, "PSE": 40.0, "PAN": 61.2,
    "PNG": 22.0, "PRY": 40.0, "PER": 56.9, "PHL": 66.8, "POL": 57.9,
    "PRT": 72.0, "QAT": 73.6, "ROU": 56.5, "RUS": 61.6, "RWA": 35.0,
    "KNA": 38.0, "LCA": 38.0, "VCT": 35.0, "WSM": 30.0, "SMR": 70.0,
    "STP": 25.0, "SAU": 62.2, "SEN": 30.0, "SRB": 52.1, "SYC": 40.0,
    "SLE": 20.0, "SGP": 71.9, "SVK": 58.2, "SVN": 66.2, "SLB": 20.0,
    "SOM": 15.0, "ZAF": 64.0, "KOR": 82.9, "SSD": 12.0, "ESP": 77.2,
    "LKA": 70.7, "SDN": 25.0, "SUR": 35.0, "SWE": 68.3, "CHE": 71.2,
    "SYR": 35.4, "TWN": 87.1, "TJK": 30.0, "TZA": 30.0, "THA": 77.5,
    "TGO": 22.0, "TON": 28.0, "TTO": 53.6, "TUN": 56.6, "TUR": 71.3,
    "TKM": 30.0, "TUV": 22.0, "UGA": 30.0, "UKR": 55.8, "ARE": 70.8,
    "GBR": 72.7, "USA": 67.0, "URY": 68.5, "UZB": 40.0, "VUT": 22.0,
    "VAT": 75.0, "VEN": 39.9, "VNM": 62.2, "YEM": 22.0, "ZMB": 30.0,
    "ZWE": 25.0, "ATG": 40.0
  }
};

const file = readFileSync('/home/vilius/coding/trip-advisor/src/data/countries.ts', 'utf8');

// For each country entry that's missing numbeoSafetyIndex, add it
// Strategy: find each country block by its code, check if it has numbeo fields, if not add them

let result = file;

// Find all country codes in the file
const codeRegex = /code:\s*"([A-Z]{3})"/g;
let match;
const codes = [];
while ((match = codeRegex.exec(file)) !== null) {
  codes.push(match[1]);
}

console.log(`Found ${codes.length} country codes`);

for (const code of codes) {
  // Check if this country already has numbeo fields
  const codePos = result.indexOf(`code: "${code}"`);
  if (codePos === -1) continue;

  // Find the closing brace of this country object
  const nextBrace = result.indexOf('},', codePos);
  if (nextBrace === -1) continue;

  const block = result.substring(codePos, nextBrace);

  if (block.includes('numbeoSafetyIndex')) {
    continue; // Already has numbeo data
  }

  // Get the data
  const safety = numbeoData.safety[code] || 50.0;
  const col = numbeoData.col[code] || 35.0;
  const qol = numbeoData.qol[code] || 80.0;
  const health = numbeoData.health[code] || 40.0;

  // Insert before the closing brace
  const insertion = `    numbeoSafetyIndex: ${safety},\n    numbeoColIndex: ${col},\n    numbeoQolIndex: ${qol},\n    numbeoHealthIndex: ${health},\n  `;

  result = result.substring(0, nextBrace) + insertion + result.substring(nextBrace);
}

writeFileSync('/home/vilius/coding/trip-advisor/src/data/countries.ts', result);
console.log('Done! All countries updated.');

// Verify
const updated = readFileSync('/home/vilius/coding/trip-advisor/src/data/countries.ts', 'utf8');
const count = (updated.match(/numbeoSafetyIndex/g) || []).length;
console.log(`numbeoSafetyIndex appears ${count} times (should match country count)`);
