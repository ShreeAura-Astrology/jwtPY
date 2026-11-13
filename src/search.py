# src/search.py
import pandas as pd

# Load your Excel file into memory on startup (cold start optimization)
try:
  df = pd.read_excel("places.xlsx")
  places_data = df.to_dict(orient="records")
except Exception:
  places_data = []


def search_places_logic(query_str: str):
  if not query_str:
    return []

  query = query_str.lower()
  matches = []

  for row in places_data:
    place_name = str(row.get("Place", "")).lower()
    keywords = str(row.get("Keywords", "")).lower()

    if query in place_name or query in keywords:
      matches.append({
          "place": row.get("Place"),
          "latitude": row.get("Latitude"),
          "longitude": row.get("Longitude"),
          "keywords": row.get("Keywords"),
      })

    if len(matches) >= 10:  # Limit results for dropdown performance
      break

  return matches