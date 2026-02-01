"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import type { Country } from "@/data/countries";
import { countryMap } from "@/data/countries";
import { MetricType, getScore } from "@/data/scoring";
import {
  scoreToColor,
  ORIGIN_COLOR,
  DEFAULT_COLOR,
  HOVER_STROKE,
  DEFAULT_STROKE,
} from "@/lib/colors";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  origin: Country | null;
  metric: MetricType;
  onCountryClick: (country: Country) => void;
  onCountryHover: (country: Country | null, event?: React.MouseEvent) => void;
}

// Map from numeric country codes in topojson to ISO alpha-3
const numericToAlpha3: Record<string, string> = {
  "4": "AFG", "8": "ALB", "12": "DZA", "20": "AND", "24": "AGO",
  "28": "ATG", "32": "ARG", "51": "ARM", "36": "AUS", "40": "AUT",
  "31": "AZE", "44": "BHS", "48": "BHR", "50": "BGD", "52": "BRB",
  "112": "BLR", "56": "BEL", "84": "BLZ", "204": "BEN", "64": "BTN",
  "68": "BOL", "70": "BIH", "72": "BWA", "76": "BRA", "96": "BRN",
  "100": "BGR", "854": "BFA", "108": "BDI", "132": "CPV", "116": "KHM",
  "120": "CMR", "124": "CAN", "140": "CAF", "148": "TCD", "152": "CHL",
  "156": "CHN", "170": "COL", "174": "COM", "180": "COD", "178": "COG",
  "188": "CRI", "191": "HRV", "192": "CUB", "196": "CYP", "203": "CZE",
  "208": "DNK", "262": "DJI", "212": "DMA", "214": "DOM", "626": "TLS",
  "218": "ECU", "818": "EGY", "222": "SLV", "226": "GNQ", "232": "ERI",
  "233": "EST", "748": "SWZ", "231": "ETH", "242": "FJI", "246": "FIN",
  "250": "FRA", "266": "GAB", "270": "GMB", "268": "GEO", "276": "DEU",
  "288": "GHA", "300": "GRC", "308": "GRD", "320": "GTM", "324": "GIN",
  "624": "GNB", "328": "GUY", "332": "HTI", "340": "HND", "348": "HUN",
  "352": "ISL", "356": "IND", "360": "IDN", "364": "IRN", "368": "IRQ",
  "372": "IRL", "376": "ISR", "380": "ITA", "384": "CIV", "388": "JAM",
  "392": "JPN", "400": "JOR", "398": "KAZ", "404": "KEN", "296": "KIR",
  "-99": "XKX", "414": "KWT", "417": "KGZ", "418": "LAO", "428": "LVA",
  "422": "LBN", "426": "LSO", "430": "LBR", "434": "LBY", "438": "LIE",
  "440": "LTU", "442": "LUX", "450": "MDG", "454": "MWI", "458": "MYS",
  "462": "MDV", "466": "MLI", "470": "MLT", "584": "MHL", "478": "MRT",
  "480": "MUS", "484": "MEX", "583": "FSM", "498": "MDA", "492": "MCO",
  "496": "MNG", "499": "MNE", "504": "MAR", "508": "MOZ", "104": "MMR",
  "516": "NAM", "520": "NRU", "524": "NPL", "528": "NLD", "554": "NZL",
  "558": "NIC", "562": "NER", "566": "NGA", "408": "PRK", "807": "MKD",
  "578": "NOR", "512": "OMN", "586": "PAK", "585": "PLW", "275": "PSE",
  "591": "PAN", "598": "PNG", "600": "PRY", "604": "PER", "608": "PHL",
  "616": "POL", "620": "PRT", "634": "QAT", "642": "ROU", "643": "RUS",
  "646": "RWA", "659": "KNA", "662": "LCA", "670": "VCT", "882": "WSM",
  "674": "SMR", "678": "STP", "682": "SAU", "686": "SEN", "688": "SRB",
  "690": "SYC", "694": "SLE", "702": "SGP", "703": "SVK", "705": "SVN",
  "90": "SLB", "706": "SOM", "710": "ZAF", "410": "KOR", "728": "SSD",
  "724": "ESP", "144": "LKA", "729": "SDN", "740": "SUR", "752": "SWE",
  "756": "CHE", "760": "SYR", "158": "TWN", "762": "TJK", "834": "TZA",
  "764": "THA", "768": "TGO", "776": "TON", "780": "TTO", "788": "TUN",
  "792": "TUR", "795": "TKM", "798": "TUV", "800": "UGA", "804": "UKR",
  "784": "ARE", "826": "GBR", "840": "USA", "858": "URY", "860": "UZB",
  "548": "VUT", "336": "VAT", "862": "VEN", "704": "VNM", "887": "YEM",
  "894": "ZMB", "716": "ZWE",
};

export default function WorldMap({
  origin,
  metric,
  onCountryClick,
  onCountryHover,
}: WorldMapProps) {
  const [hoveredGeo, setHoveredGeo] = useState<string | null>(null);

  const scores = useMemo(() => {
    if (!origin) return {};
    const result: Record<string, number> = {};
    for (const code of Object.keys(countryMap)) {
      if (code === origin.code) continue;
      result[code] = getScore(metric, origin, countryMap[code]);
    }
    return result;
  }, [origin, metric]);

  const getCountryColor = useCallback(
    (geoId: string) => {
      const alpha3 = numericToAlpha3[geoId];
      if (!alpha3) return DEFAULT_COLOR;
      if (origin && alpha3 === origin.code) return ORIGIN_COLOR;
      if (!origin) return DEFAULT_COLOR;
      const score = scores[alpha3];
      if (score === undefined) return DEFAULT_COLOR;
      return scoreToColor(score);
    },
    [origin, scores]
  );

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 150,
        }}
        className="w-full h-full"
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoId = geo.id;
                const alpha3 = numericToAlpha3[geoId];
                const country = alpha3 ? countryMap[alpha3] : null;
                const isHovered = hoveredGeo === geoId;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getCountryColor(geoId)}
                    stroke={isHovered ? HOVER_STROKE : DEFAULT_STROKE}
                    strokeWidth={isHovered ? 1.5 : 0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", cursor: country ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(e) => {
                      setHoveredGeo(geoId);
                      if (country) {
                        onCountryHover(country, e as unknown as React.MouseEvent);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredGeo(null);
                      onCountryHover(null);
                    }}
                    onClick={() => {
                      if (country) onCountryClick(country);
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
