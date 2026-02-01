#!/usr/bin/env python3
"""Script to add Numbeo data fields to countries.ts"""

# Numbeo data mappings
numbeo_col_index = {
    "Switzerland": 110.74, "Singapore": 87.69, "Norway": 83.73, "Israel": 79.66,
    "Denmark": 78.91, "Luxembourg": 78.02, "Netherlands": 73.41, "Austria": 71.25,
    "Ireland": 70.61, "Finland": 68.97, "United States": 68.77, "Germany": 68.69,
    "Belgium": 68.60, "Sweden": 68.05, "Australia": 67.93, "United Kingdom": 67.76,
    "France": 67.72, "Seychelles": 64.47, "Canada": 62.98, "South Korea": 61.57,
    "Italy": 61.42, "New Zealand": 60.25, "Estonia": 59.70, "Cyprus": 58.83,
    "Malta": 56.82, "Uruguay": 55.58, "United Arab Emirates": 55.16, "Andorra": 55.13,
    "Jamaica": 54.52, "Slovenia": 54.06, "Greece": 53.96, "Yemen": 53.11,
    "Czech Republic": 53.04, "Costa Rica": 52.87, "Croatia": 52.41, "Latvia": 52.31,
    "Trinidad and Tobago": 51.96, "Spain": 51.61, "Lithuania": 51.16, "Guyana": 50.42,
    "Qatar": 50.41, "Congo (DRC)": 50.21, "Taiwan": 49.72, "Slovakia": 49.56,
    "Maldives": 48.90, "Portugal": 48.82, "Senegal": 48.52, "Brunei": 48.16,
    "Palestine": 48.13, "Bahrain": 47.63, "Papua New Guinea": 47.50, "Japan": 47.49,
    "Poland": 47.32, "Hungary": 46.88, "Belize": 46.85, "Cabo Verde": 46.31,
    "Albania": 45.85, "Panama": 45.54, "Ivory Coast": 44.77, "Saudi Arabia": 43.95,
    "Oman": 43.59, "Montenegro": 42.67, "Serbia": 42.62, "Mexico": 42.60,
    "Kuwait": 42.46, "Angola": 42.30, "Suriname": 42.27, "Cuba": 41.84,
    "Ethiopia": 41.76, "Lebanon": 41.70, "Bulgaria": 41.57, "Argentina": 41.32,
    "Armenia": 40.90, "Cameroon": 40.74, "Romania": 40.58, "Guatemala": 40.38,
    "El Salvador": 39.65, "Jordan": 39.42, "Turkey": 39.16, "Chile": 39.02,
    "Bosnia and Herzegovina": 38.68, "Mauritius": 38.32, "Dominican Republic": 38.20,
    "Thailand": 37.99, "Myanmar": 37.95, "Venezuela": 37.69, "South Africa": 37.14,
    "Mozambique": 36.89, "Honduras": 36.63, "Russia": 36.53, "Namibia": 36.26,
    "Zimbabwe": 35.89, "Moldova": 35.78, "North Macedonia": 35.49, "Cambodia": 34.76,
    "Fiji": 34.33, "Nicaragua": 34.22, "Malaysia": 34.00, "Ghana": 33.92,
    "Sri Lanka": 33.91, "Peru": 33.54, "Georgia": 33.06, "Botswana": 32.56,
    "Colombia": 31.73, "Morocco": 31.39, "Mongolia": 31.38, "Ecuador": 30.90,
    "Azerbaijan": 30.72, "Belarus": 30.55, "China": 30.53, "Brazil": 30.14,
    "Philippines": 30.13, "Zambia": 29.94, "Kazakhstan": 29.83, "Kosovo": 29.13,
    "Tunisia": 29.07, "Kenya": 28.91, "Paraguay": 28.45, "Iraq": 28.39,
    "Ukraine": 28.16, "Algeria": 27.97, "Tajikistan": 27.88, "Nigeria": 27.73,
    "Uzbekistan": 27.34, "Bolivia": 27.31, "Kyrgyzstan": 27.25, "Uganda": 27.02,
    "Tanzania": 26.65, "Vietnam": 26.45, "Indonesia": 26.08, "Syria": 25.05,
    "Rwanda": 24.97, "Iran": 22.84, "Bangladesh": 22.82, "Nepal": 22.59,
    "Madagascar": 22.51, "Egypt": 21.59, "Afghanistan": 21.12, "Pakistan": 19.58,
    "India": 18.92, "Libya": 18.35
}

numbeo_safety_index = {
    "United Arab Emirates": 86.0, "Qatar": 84.8, "Andorra": 84.8, "Taiwan": 83.0,
    "Oman": 81.6, "Armenia": 77.9, "Bahrain": 77.7, "Singapore": 77.5, "Japan": 77.2,
    "China": 76.9, "Saudi Arabia": 76.7, "Estonia": 76.8, "Croatia": 75.7,
    "Slovenia": 75.5, "Netherlands": 74.5, "Iceland": 74.5, "Denmark": 73.8,
    "Uzbekistan": 73.8, "Georgia": 73.8, "Rwanda": 73.7, "Czech Republic": 73.6,
    "Finland": 73.5, "Switzerland": 72.6, "Poland": 71.3, "Austria": 71.5,
    "South Korea": 71.0, "Brunei": 70.6, "Slovakia": 68.9, "Azerbaijan": 68.4,
    "Israel": 68.2, "Kuwait": 67.4, "Romania": 67.2, "Portugal": 67.0,
    "Lithuania": 66.8, "Luxembourg": 66.8, "Cyprus": 66.7, "Norway": 66.7,
    "Hungary": 66.5, "Montenegro": 65.6, "Bulgaria": 64.5, "Nepal": 63.9,
    "Latvia": 63.7, "Thailand": 63.4, "Serbia": 63.0, "Spain": 62.4, "Russia": 61.8,
    "Germany": 61.6, "Jordan": 60.3, "Cuba": 61.2, "Vietnam": 59.9, "Ghana": 59.8,
    "Iraq": 59.5, "North Macedonia": 58.6, "Bosnia and Herzegovina": 58.7,
    "Turkey": 58.5, "Kosovo": 58.4, "Sri Lanka": 57.6, "Pakistan": 57.6,
    "Panama": 57.2, "Malta": 57.0, "Palestine": 57.0, "Philippines": 56.5,
    "Albania": 55.9, "India": 55.8, "Sudan": 55.6, "Moldova": 55.4, "Senegal": 54.9,
    "Kazakhstan": 54.8, "Canada": 54.4, "Tunisia": 55.1, "Greece": 53.8,
    "Zambia": 53.6, "Egypt": 53.6, "Indonesia": 53.6, "Ukraine": 53.1,
    "Morocco": 53.0, "Lebanon": 53.1, "Italy": 52.7, "Australia": 52.5,
    "Sweden": 52.1, "Malaysia": 52.0, "United Kingdom": 51.7, "Belarus": 51.5,
    "New Zealand": 51.2, "Ireland": 51.0, "Belgium": 50.8, "United States": 50.8,
    "Cambodia": 50.3, "Mauritius": 49.8, "Mongolia": 49.7, "Ethiopia": 49.6,
    "Iran": 49.2, "Nicaragua": 49.2, "Kyrgyzstan": 48.6, "Myanmar": 48.5,
    "Botswana": 48.3, "Belize": 48.2, "Mexico": 47.1, "Algeria": 47.0,
    "Tanzania": 46.5, "Uganda": 45.9, "Costa Rica": 46.1, "Kenya": 44.9,
    "Ivory Coast": 44.3, "Libya": 44.2, "France": 44.2, "Fiji": 43.6,
    "El Salvador": 43.6, "Bahamas": 43.1, "Guatemala": 42.7, "Dominican Republic": 40.0,
    "Paraguay": 40.5, "Zimbabwe": 39.6, "Chile": 39.3, "Mozambique": 39.0,
    "Colombia": 38.7, "Bangladesh": 38.4, "Yemen": 38.3, "Ecuador": 38.1,
    "Somalia": 37.5, "Argentina": 36.8, "Namibia": 36.2, "Brazil": 36.0,
    "Bolivia": 35.8, "Cameroon": 34.3, "Angola": 34.5, "Nigeria": 33.8,
    "Congo (DRC)": 33.3, "Guyana": 33.1, "Peru": 33.1, "Jamaica": 32.6, "Syria": 32.5,
    "Trinidad and Tobago": 28.8, "Honduras": 28.1, "South Africa": 25.5,
    "Afghanistan": 25.2, "Haiti": 19.9, "Venezuela": 19.6, "Papua New Guinea": 19.1
}

numbeo_qol_index = {
    "Netherlands": 213.6, "Denmark": 212.2, "Luxembourg": 211.9, "Oman": 207.6,
    "Switzerland": 206.2, "Finland": 204.4, "Austria": 199.8, "Germany": 196.3,
    "Iceland": 195.8, "Norway": 195.4, "Estonia": 190.7, "Australia": 189.6,
    "Sweden": 189.3, "New Zealand": 188.5, "United States": 186.0, "Spain": 185.8,
    "Japan": 185.6, "Qatar": 182.7, "Slovenia": 181.5, "Lithuania": 178.2,
    "Croatia": 176.6, "United Kingdom": 175.9, "United Arab Emirates": 175.5,
    "Czech Republic": 175.3, "Belgium": 175.2, "Canada": 172.0, "France": 169.8,
    "Portugal": 169.5, "Ireland": 167.7, "Israel": 167.7, "Latvia": 167.3,
    "Saudi Arabia": 165.3, "Kuwait": 162.7, "Cyprus": 159.6, "Slovakia": 158.6,
    "Singapore": 158.1, "Poland": 156.1, "Taiwan": 155.5, "Italy": 152.9,
    "South Africa": 150.9, "South Korea": 150.4, "Bulgaria": 148.3, "Hungary": 147.6,
    "Romania": 143.0, "Turkey": 142.1, "Greece": 140.8, "Uruguay": 139.1,
    "Bosnia and Herzegovina": 136.5, "Belarus": 135.7, "Malta": 135.3, "Malaysia": 135.2,
    "China": 134.8, "Ecuador": 128.7, "Serbia": 127.6, "Costa Rica": 127.3,
    "Georgia": 126.6, "Jordan": 125.6, "Mexico": 125.3, "North Macedonia": 124.2,
    "Argentina": 123.4, "India": 122.3, "Armenia": 121.9, "Panama": 120.4,
    "Brazil": 117.8, "Tunisia": 117.6, "Ukraine": 117.1, "Russia": 115.6,
    "Morocco": 114.1, "Azerbaijan": 111.1, "Chile": 109.8, "Kazakhstan": 107.5,
    "Thailand": 106.8, "Colombia": 105.9, "Albania": 105.6, "Kenya": 99.4,
    "Pakistan": 98.3, "Lebanon": 98.2, "Vietnam": 92.5, "Peru": 92.3, "Indonesia": 91.1,
    "Iran": 88.0, "Philippines": 87.1, "Egypt": 81.9, "Venezuela": 75.2,
    "Bangladesh": 73.3, "Sri Lanka": 61.0, "Nigeria": 0.0
}

numbeo_health_index = {
    "Taiwan": 87.1, "South Korea": 82.9, "Netherlands": 81.5, "Japan": 80.1,
    "Austria": 78.9, "Ecuador": 77.7, "Finland": 77.6, "Thailand": 77.5,
    "Denmark": 77.2, "Spain": 77.2, "France": 77.0, "Belgium": 76.4,
    "Czech Republic": 76.0, "Norway": 75.8, "Lithuania": 75.4, "Estonia": 75.2,
    "Luxembourg": 74.2, "Qatar": 73.6, "Israel": 73.4, "United Kingdom": 72.7,
    "Germany": 72.4, "Mexico": 72.3, "Portugal": 72.0, "Australia": 72.0,
    "Singapore": 71.9, "Turkey": 71.3, "Switzerland": 71.2, "United Arab Emirates": 70.8,
    "Malaysia": 70.7, "Sri Lanka": 70.7, "China": 69.2, "Iceland": 69.1,
    "Colombia": 68.9, "Canada": 68.6, "Uruguay": 68.5, "Sweden": 68.3,
    "New Zealand": 68.2, "Argentina": 67.8, "Guatemala": 67.2, "United States": 67.0,
    "Philippines": 66.8, "Slovenia": 66.2, "Jordan": 65.6, "India": 65.5,
    "Croatia": 65.1, "Italy": 64.9, "Costa Rica": 64.8, "South Africa": 64.0,
    "Lebanon": 63.7, "Chile": 63.6, "Latvia": 63.6, "Oman": 63.5, "Saudi Arabia": 62.2,
    "Kenya": 62.2, "Vietnam": 62.2, "Russia": 61.6, "Indonesia": 61.2,
    "Panama": 61.2, "Kazakhstan": 60.7, "Armenia": 59.5, "Pakistan": 59.5,
    "Brazil": 59.3, "Greece": 58.9, "Kuwait": 58.6, "Dominican Republic": 58.4,
    "Bulgaria": 58.3, "Slovakia": 58.2, "Poland": 57.9, "Nepal": 57.9, "Ghana": 57.0,
    "Peru": 56.9, "Cyprus": 56.7, "Tunisia": 56.6, "Romania": 56.5, "Georgia": 56.3,
    "Ukraine": 55.8, "North Macedonia": 55.4, "Bosnia and Herzegovina": 54.6,
    "Algeria": 54.5, "Hungary": 54.2, "Trinidad and Tobago": 53.6, "Malta": 53.3,
    "Iran": 52.8, "Moldova": 52.2, "Serbia": 52.1, "Cambodia": 51.6, "Ireland": 51.2,
    "Belarus": 49.6, "Azerbaijan": 49.0, "Nigeria": 48.3, "Albania": 48.1,
    "Egypt": 47.9, "Montenegro": 47.4, "Morocco": 46.8, "Iraq": 46.5,
    "Bangladesh": 42.0, "Venezuela": 39.9, "Syria": 35.4
}

def estimate_numbeo_values(country_name, region, gdp_per_capita):
    """Estimate Numbeo values for countries not in the dataset"""

    # Regional averages for estimation
    regional_defaults = {
        "Europe": {"safety": 65, "col": 50, "qol": 150, "health": 65},
        "Asia": {"safety": 60, "col": 35, "qol": 110, "health": 60},
        "Africa": {"safety": 45, "col": 30, "qol": 90, "health": 50},
        "South America": {"safety": 40, "col": 38, "qol": 110, "health": 60},
        "Central America": {"safety": 45, "col": 42, "qol": 115, "health": 62},
        "Caribbean": {"safety": 50, "col": 60, "qol": 130, "health": 60},
        "Middle East": {"safety": 65, "col": 50, "qol": 155, "health": 63},
        "Oceania": {"safety": 55, "col": 65, "qol": 160, "health": 65},
        "North America": {"safety": 52, "col": 65, "qol": 175, "health": 68}
    }

    defaults = regional_defaults.get(region, {"safety": 50, "col": 40, "qol": 100, "health": 55})

    # Adjust based on GDP
    if gdp_per_capita > 40000:
        defaults["safety"] += 10
        defaults["col"] += 15
        defaults["qol"] += 30
        defaults["health"] += 10
    elif gdp_per_capita > 20000:
        defaults["safety"] += 5
        defaults["col"] += 10
        defaults["qol"] += 15
        defaults["health"] += 5
    elif gdp_per_capita < 2000:
        defaults["safety"] -= 10
        defaults["col"] -= 5
        defaults["qol"] -= 20
        defaults["health"] -= 10

    return defaults

def process_file():
    with open('/home/vilius/coding/trip-advisor/src/data/countries.ts', 'r') as f:
        lines = f.readlines()

    output_lines = []
    i = 0
    current_country = None
    current_region = None
    current_gdp = 0
    in_country_block = False
    country_lines = []

    while i < len(lines):
        line = lines[i]
        output_lines.append(line)

        # Check if we're starting a new country block
        if '  {' in line and i > 0 and 'export const countries' in lines[i-1]:
            in_country_block = True
            country_lines = [line]
        elif in_country_block:
            country_lines.append(line)

            # Extract country name
            if 'name: "' in line:
                current_country = line.split('name: "')[1].split('"')[0]

            # Extract region
            if 'region: "' in line:
                current_region = line.split('region: "')[1].split('"')[0]

            # Extract GDP
            if 'gdpPerCapita:' in line:
                try:
                    current_gdp = int(line.split('gdpPerCapita:')[1].strip().rstrip(','))
                except:
                    current_gdp = 0

            # Check if we've reached the end of a country block
            if '  },' in line or '  }' in line:
                in_country_block = False

                # Check if this country already has Numbeo data
                has_numbeo = any('numbeoSafetyIndex' in l for l in country_lines)

                if not has_numbeo and current_country:
                    # Get Numbeo data or estimate
                    safety = numbeo_safety_index.get(current_country)
                    col = numbeo_col_index.get(current_country)
                    qol = numbeo_qol_index.get(current_country)
                    health = numbeo_health_index.get(current_country)

                    # If any are missing, estimate all
                    if None in [safety, col, qol, health]:
                        estimates = estimate_numbeo_values(current_country, current_region, current_gdp)
                        if safety is None:
                            safety = estimates["safety"]
                        if col is None:
                            col = estimates["col"]
                        if qol is None:
                            qol = estimates["qol"]
                        if health is None:
                            health = estimates["health"]

                    # Remove the closing brace line
                    output_lines.pop()

                    # Add Numbeo fields
                    indent = "    "
                    output_lines.append(f"{indent}numbeoSafetyIndex: {safety},\n")
                    output_lines.append(f"{indent}numbeoColIndex: {col},\n")
                    output_lines.append(f"{indent}numbeoQolIndex: {qol},\n")
                    output_lines.append(f"{indent}numbeoHealthIndex: {health}\n")

                    # Add back the closing brace
                    output_lines.append(line)

                # Reset for next country
                current_country = None
                current_region = None
                current_gdp = 0
                country_lines = []

        i += 1

    # Write the updated file
    with open('/home/vilius/coding/trip-advisor/src/data/countries.ts', 'w') as f:
        f.writelines(output_lines)

    print("File updated successfully!")

if __name__ == "__main__":
    process_file()
