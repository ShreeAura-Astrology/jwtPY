from pathlib import Path

import pandas as pd

places_file = Path(__file__).with_name("Geo.xlsx")
places_data = pd.read_excel(places_file).to_dict(orient="records")


def search_places_logic(query_str: str):
    query = query_str.strip().casefold()
    if not query:
        return []

    matches = []

    for row in places_data:
        place_name = str(row.get("Place", "")).casefold()
        keywords = str(row.get("Keywords", "")).casefold()

        if query in place_name or query in keywords:
            matches.append({
                "place": row.get("Place"),
                "latitude": row.get("Latitude"),
                "longitude": row.get("Longitude"),
                "keywords": row.get("Keywords"),
            })

        if len(matches) >= 10:
            break

    return matches