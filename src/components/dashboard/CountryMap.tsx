import { useEffect, useState } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import useUtilsStore from "../../stores/useUtilsStore";

interface CountryMapProps {
  mapColor?: string;
}

const regionCoordinates: { [key: string]: { lat: number, lng: number, name: string } } = {
  "AF": { lat: 33.93911, lng: 67.709953, name: "Afghanistan" },
  "AL": { lat: 41.1533, lng: 20.1683, name: "Albania" },
  "DZ": { lat: 28.0339, lng: 1.6596, name: "Algeria" },
  "AS": { lat: -14.270972, lng: -170.132217, name: "American Samoa" },
  "AD": { lat: 42.5, lng: 1.6, name: "Andorra" },
  "AO": { lat: -11.2027, lng: 17.8739, name: "Angola" },
  "AI": { lat: 18.2206, lng: -63.1687, name: "Anguilla" },
  "AG": { lat: 17.05, lng: -61.8, name: "Antigua and Barbuda" },
  "AR": { lat: -38.4161, lng: -63.6167, name: "Argentina" },
  "AM": { lat: 40.1499, lng: 44.9432, name: "Armenia" },
  "AW": { lat: 12.5211, lng: -69.9683, name: "Aruba" },
  "AU": { lat: -25.2744, lng: 133.7751, name: "Australia" },
  "AT": { lat: 47.5162, lng: 14.5501, name: "Austria" },
  "AZ": { lat: 40.1431, lng: 47.5769, name: "Azerbaijan" },
  "BS": { lat: 25.0343, lng: -77.3963, name: "Bahamas" },
  "BH": { lat: 25.9304, lng: 50.6378, name: "Bahrain" },
  "BD": { lat: 23.685, lng: 90.3563, name: "Bangladesh" },
  "BB": { lat: 13.1939, lng: -59.5432, name: "Barbados" },
  "BY": { lat: 53.9, lng: 27.5667, name: "Belarus" },
  "BE": { lat: 50.8503, lng: 4.3517, name: "Belgium" },
  "BZ": { lat: 17.1899, lng: -88.4976, name: "Belize" },
  "BJ": { lat: 9.3075, lng: 2.3158, name: "Benin" },
  "BM": { lat: 32.3213, lng: -64.7574, name: "Bermuda" },
  "BT": { lat: 27.5142, lng: 90.4336, name: "Bhutan" },
  "BO": { lat: -16.2902, lng: -63.5887, name: "Bolivia" },
  "BA": { lat: 43.9159, lng: 17.6791, name: "Bosnia and Herzegovina" },
  "BW": { lat: -22.3285, lng: 24.4689, name: "Botswana" },
  "BR": { lat: -14.235, lng: -51.9253, name: "Brazil" },
  "IO": { lat: -6.3432, lng: 71.8765, name: "British Indian Ocean Territory" },
  "BN": { lat: 4.5353, lng: 114.7277, name: "Brunei" },
  "BG": { lat: 42.7333, lng: 25.4858, name: "Bulgaria" },
  "BF": { lat: 12.2383, lng: -1.5616, name: "Burkina Faso" },
  "BI": { lat: -3.3731, lng: 29.9189, name: "Burundi" },
  "KH": { lat: 12.5657, lng: 104.9910, name: "Cambodia" },
  "CM": { lat: 3.8480, lng: 11.5021, name: "Cameroon" },
  "CA": { lat: 56.1304, lng: -106.3468, name: "Canada" },
  "CV": { lat: 16.0021, lng: -24.0132, name: "Cape Verde" },
  "KY": { lat: 19.3131, lng: -81.2546, name: "Cayman Islands" },
  "CF": { lat: 6.6111, lng: 20.9394, name: "Central African Republic" },
  "TD": { lat: 15.4542, lng: 18.7322, name: "Chad" },
  "CL": { lat: -35.6751, lng: -71.5430, name: "Chile" },
  "CN": { lat: 35.8617, lng: 104.1954, name: "China" },
  "CX": { lat: -10.4475, lng: 105.3563, name: "Christmas Island" },
  "CC": { lat: -12.1642, lng: 96.8702, name: "Cocos (Keeling) Islands" },
  "CO": { lat: 4.5709, lng: -74.2973, name: "Colombia" },
  "KM": { lat: -11.8750, lng: 43.8722, name: "Comoros" },
  "CG": { lat: -0.2280, lng: 15.8270, name: "Congo" },
  "CD": { lat: -4.0383, lng: 21.7587, name: "Democratic Republic of the Congo" },
  "CK": { lat: -21.2367, lng: -159.7777, name: "Cook Islands" },
  "CR": { lat: 9.7489, lng: -83.7534, name: "Costa Rica" },
  "HR": { lat: 45.1, lng: 15.2, name: "Croatia" },
  "CU": { lat: 21.5218, lng: -77.7812, name: "Cuba" },
  "CY": { lat: 35.1264, lng: 33.4299, name: "Cyprus" },
  "CZ": { lat: 49.8175, lng: 15.4730, name: "Czech Republic" },
  "DK": { lat: 56.2639, lng: 9.5018, name: "Denmark" },
  "DJ": { lat: 11.8251, lng: 42.5903, name: "Djibouti" },
  "DM": { lat: 15.414999, lng: -61.3704, name: "Dominica" },
  "DO": { lat: 18.7357, lng: -70.1627, name: "Dominican Republic" },
  "EC": { lat: -1.8312, lng: -78.1834, name: "Ecuador" },
  "EG": { lat: 26.8206, lng: 30.8025, name: "Egypt" },
  "SV": { lat: 13.7942, lng: -88.8965, name: "El Salvador" },
  "GQ": { lat: 1.6508, lng: 10.2679, name: "Equatorial Guinea" },
  "ER": { lat: 15.1794, lng: 39.7823, name: "Eritrea" },
  "EE": { lat: 58.5953, lng: 25.0136, name: "Estonia" },
  "ET": { lat: 9.145, lng: 40.4897, name: "Ethiopia" },
  "FK": { lat: -51.7963, lng: -59.5236, name: "Falkland Islands" },
  "FO": { lat: 61.8926, lng: -6.9118, name: "Faroe Islands" },
  "FJ": { lat: -16.5782, lng: 179.4144, name: "Fiji" },
  "FI": { lat: 61.9241, lng: 25.7482, name: "Finland" },
  "FR": { lat: 46.6034, lng: 1.8883, name: "France" },
  "GF": { lat: 3.9339, lng: -53.1258, name: "French Guiana" },
  "PF": { lat: -17.6797, lng: -149.4068, name: "French Polynesia" },
  "TF": { lat: -49.2804, lng: 69.3485, name: "French Southern and Antarctic Lands" },
  "GA": { lat: -0.8037, lng: 11.6094, name: "Gabon" },
  "GM": { lat: 13.4432, lng: -15.3101, name: "Gambia" },
  "GE": { lat: 42.3154, lng: 43.3569, name: "Georgia" },
  "DE": { lat: 51.1657, lng: 10.4515, name: "Germany" },
  "GH": { lat: 7.9465, lng: -1.0232, name: "Ghana" },
  "GI": { lat: 36.1375, lng: -5.3454, name: "Gibraltar" },
  "GR": { lat: 39.0742, lng: 21.8243, name: "Greece" },
  "GL": { lat: 71.2092, lng: -42.6043, name: "Greenland" },
  "GD": { lat: 12.2628, lng: -61.6042, name: "Grenada" },
  "GP": { lat: 16.9950, lng: -62.1312, name: "Guadeloupe" },
  "GU": { lat: 13.4443, lng: -144.7937, name: "Guam" },
  "GT": { lat: 15.7835, lng: -90.2308, name: "Guatemala" },
  "GG": { lat: 49.4657, lng: -2.5852, name: "Guernsey" },
  "GN": { lat: 9.9456, lng: -9.6966, name: "Guinea" },
  "GW": { lat: 11.8037, lng: -15.1804, name: "Guinea-Bissau" },
  "GY": { lat: 4.8604, lng: -58.9302, name: "Guyana" },
  "HT": { lat: 18.9712, lng: -72.2852, name: "Haiti" },
  "HM": { lat: -53.0818, lng: 73.5047, name: "Heard Island and McDonald Islands" },
  "VA": { lat: 41.9029, lng: 12.4534, name: "Vatican City" },
  "HN": { lat: 13.9094, lng: -83.7077, name: "Honduras" },
  "HK": { lat: 22.3193, lng: 114.1694, name: "Hong Kong" },
  "HU": { lat: 47.1625, lng: 19.5033, name: "Hungary" },
  "IS": { lat: 64.9631, lng: -19.0208, name: "Iceland" },
  "IN": { lat: 20.5937, lng: 78.9629, name: "India" },
  "ID": { lat: -0.7893, lng: 113.9213, name: "Indonesia" },
  "IR": { lat: 32.4279, lng: 53.6880, name: "Iran" },
  "IQ": { lat: 33.2232, lng: 43.6793, name: "Iraq" },
  "IE": { lat: 53.4129, lng: -8.2439, name: "Ireland" },
  "IL": { lat: 31.0461, lng: 34.8516, name: "Israel" },
  "IT": { lat: 41.9028, lng: 12.4964, name: "Italy" },
  "JM": { lat: 18.1096, lng: -77.2975, name: "Jamaica" },
  "JP": { lat: 36.2048, lng: 138.2529, name: "Japan" },
  "JE": { lat: 49.2144, lng: -2.1312, name: "Jersey" },
  "JO": { lat: 30.5852, lng: 36.2384, name: "Jordan" },
  "KZ": { lat: 48.0196, lng: 66.9237, name: "Kazakhstan" },
  "KE": { lat: -1.2921, lng: 36.8219, name: "Kenya" },
  "KI": { lat: -3.3704, lng: -168.734, name: "Kiribati" },
  "KW": { lat: 29.3759, lng: 47.9774, name: "Kuwait" },
  "KG": { lat: 41.2044, lng: 74.7661, name: "Kyrgyzstan" },
  "LA": { lat: 19.8563, lng: 102.4955, name: "Laos" },
  "LV": { lat: 56.8796, lng: 24.6032, name: "Latvia" },
  "LB": { lat: 33.8547, lng: 35.8623, name: "Lebanon" },
  "LS": { lat: -29.609, lng: 28.2336, name: "Lesotho" },
  "LR": { lat: 6.4281, lng: -9.4295, name: "Liberia" },
  "LY": { lat: 26.3351, lng: 17.2283, name: "Libya" },
  "LI": { lat: 47.166, lng: 9.5554, name: "Liechtenstein" },
  "LT": { lat: 55.1694, lng: 23.8813, name: "Lithuania" },
  "LU": { lat: 49.6117, lng: 6.13, name: "Luxembourg" },
  "MO": { lat: 22.1987, lng: 113.5439, name: "Macau" },
  "MK": { lat: 41.6086, lng: 21.7453, name: "North Macedonia" },
  "MG": { lat: -18.7669, lng: 46.8691, name: "Madagascar" },
  "MW": { lat: -13.2543, lng: 34.3015, name: "Malawi" },
  "MY": { lat: 4.2105, lng: 101.9758, name: "Malaysia" },
  "MV": { lat: 3.2028, lng: 73.2207, name: "Maldives" },
  "ML": { lat: 17.5707, lng: -3.9962, name: "Mali" },
  "MT": { lat: 35.9375, lng: 14.3754, name: "Malta" },
  "MH": { lat: 7.1315, lng: 171.1845, name: "Marshall Islands" },
  "MQ": { lat: 14.6415, lng: -61.0242, name: "Martinique" },
  "MR": { lat: 21.0079, lng: -10.9400, name: "Mauritania" },
  "MU": { lat: -20.348404, lng: 57.5522, name: "Mauritius" },
  "YT": { lat: -12.8275, lng: 45.1662, name: "Mayotte" },
  "MX": { lat: 23.6345, lng: -102.5528, name: "Mexico" },
  "FM": { lat: 6.9166, lng: 158.2491, name: "Micronesia" },
  "MD": { lat: 47.4116, lng: 28.3699, name: "Moldova" },
  "MC": { lat: 43.7333, lng: 7.4167, name: "Monaco" },
  "MN": { lat: 46.8625, lng: 103.8467, name: "Mongolia" },
  "ME": { lat: 42.7087, lng: 19.3744, name: "Montenegro" },
  "MS": { lat: 16.7425, lng: -62.1874, name: "Montserrat" },
  "MA": { lat: 31.7917, lng: -7.0926, name: "Morocco" },
  "MZ": { lat: -18.6657, lng: 35.5296, name: "Mozambique" },
  "MM": { lat: 21.9139, lng: 95.9560, name: "Myanmar" },
  "NA": { lat: -22.9576, lng: 18.4904, name: "Namibia" },
  "NR": { lat: -0.5228, lng: 166.9315, name: "Nauru" },
  "NP": { lat: 28.3949, lng: 84.1240, name: "Nepal" },
  "NL": { lat: 52.1326, lng: 5.2913, name: "Netherlands" },
  "NC": { lat: -20.9043, lng: 165.6180, name: "New Caledonia" },
  "NZ": { lat: -40.9006, lng: 174.8860, name: "New Zealand" },
  "NI": { lat: 12.8654, lng: -85.2072, name: "Nicaragua" },
  "NE": { lat: 17.6078, lng: 8.0817, name: "Niger" },
  "NG": { lat: 9.081999, lng: 8.6753, name: "Nigeria" },
  "NU": { lat: -19.0332, lng: -169.8672, name: "Niue" },
  "NF": { lat: -29.0408, lng: 167.9547, name: "Norfolk Island" },
  "KP": { lat: 40.3399, lng: 127.5101, name: "North Korea" },
  "MP": { lat: 17.3308, lng: 145.3847, name: "Northern Mariana Islands" },
  "NO": { lat: 60.4720, lng: 8.4689, name: "Norway" },
  "OM": { lat: 21.5126, lng: 55.9232, name: "Oman" },
  "PK": { lat: 30.3753, lng: 69.3451, name: "Pakistan" },
  "PW": { lat: 7.5149, lng: 134.5825, name: "Palau" },
  "PA": { lat: 8.5380, lng: -80.7821, name: "Panama" },
  "PG": { lat: -6.314993, lng: 143.9555, name: "Papua New Guinea" },
  "PY": { lat: -23.4425, lng: -58.4438, name: "Paraguay" },
  "PE": { lat: -9.19, lng: -75.0152, name: "Peru" },
  "PH": { lat: 12.8797, lng: 121.7740, name: "Philippines" },
  "PL": { lat: 51.9194, lng: 19.1451, name: "Poland" },
  "PT": { lat: 39.3999, lng: -8.2245, name: "Portugal" },
  "PR": { lat: 18.2208, lng: -66.5901, name: "Puerto Rico" },
  "QA": { lat: 25.3548, lng: 51.1839, name: "Qatar" },
  "RE": { lat: -21.1151, lng: 55.5364, name: "Réunion" },
  "RO": { lat: 45.9432, lng: 24.9668, name: "Romania" },
  "RU": { lat: 55.7558, lng: 37.6173, name: "Russia" },
  "RW": { lat: -1.9403, lng: 29.3470, name: "Rwanda" },
  "BL": { lat: 17.90, lng: -62.85, name: "Saint Barthélemy" },
  "SH": { lat: -24.7808, lng: -13.3623, name: "Saint Helena" },
  "KN": { lat: 17.3575, lng: -62.7820, name: "Saint Kitts and Nevis" },
  "LC": { lat: 13.9094, lng: -60.9780, name: "Saint Lucia" },
  "MF": { lat: 18.0787, lng: -63.8804, name: "Saint Martin" },
  "SX": { lat: 18.0425, lng: -63.0548, name: "Sint Maarten" },
  "SD": { lat: 12.8628, lng: 30.8025, name: "Sudan" },
  "SR": { lat: 3.9193, lng: -56.0278, name: "Suriname" },
  "SS": { lat: 6.8770, lng: 31.3070, name: "South Sudan" },
  "SE": { lat: 60.1282, lng: 18.6435, name: "Sweden" },
  "SJ": { lat: 77.5535, lng: 23.6707, name: "Svalbard and Jan Mayen" },
  "SY": { lat: 34.8021, lng: 38.9968, name: "Syria" },
  "TW": { lat: 23.6978, lng: 120.9605, name: "Taiwan" },
  "TJ": { lat: 38.8610, lng: 71.2761, name: "Tajikistan" },
  "TH": { lat: 15.8700, lng: 100.9925, name: "Thailand" },
  "TL": { lat: -8.8742, lng: 125.7275, name: "Timor-Leste" },
  "TM": { lat: 38.9697, lng: 59.5563, name: "Turkmenistan" },
  "TR": { lat: 38.9637, lng: 35.2433, name: "Turkey" },
  "TT": { lat: 10.6918, lng: -61.2225, name: "Trinidad and Tobago" },
  "TN": { lat: 33.8869, lng: 9.5375, name: "Tunisia" }
}


const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  let coordinates = useUtilsStore((state) => state.coordinates);
  const { setCoordinates } = useUtilsStore();

  const [mapKey, setMapKey] = useState(0);

  // Update the key when coordinates change
  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [coordinates]); // When coordinates change, update the key

  // Marker data
  const markers = [
    {
      latLng: [coordinates.lat, coordinates.lng],
      name: coordinates.name,
      style: {
        fill: "#465FFF",
        borderWidth: 1,
        borderColor: "white",
        stroke: "#383f47",
      },
    },
  ];

  return (
    <VectorMap
    key={mapKey}
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 4,
        } as any,
      }}
      markersSelectable={true}
      markers={markers} // Usa il marker dinamico
      zoomOnScroll={true}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465FFF",
          stroke: "none",
        },
        selected: {
          fill: "#1A3380", // Cambia colore per la regione selezionata
        },
      }}
      onRegionClick={(e, code) => {
        const region = regionCoordinates[code];

        if (region) {
          console.log(region);

          setCoordinates({
            lat: region.lat,
            lng: region.lng,
            name: region.name,
          });
        }
      }}
    />
  );
};

export default CountryMap;
