# 🪐 Horoscope Appwrite Function

A serverless Python function for Appwrite that serves astrology-related HTML/JS resources and provides Google OAuth2 JWT token generation for Google Drive and Sheets API access.

---

## 🚀 Features

- **Static File Serving**: Serves astrology web apps and scripts (`horoscope.html`, `BNN.html`, `BNN_Comb.js`, `transit.js`, `significator.js`) via HTTP endpoints.
- **Google OAuth2 JWT**: Generates and exchanges a signed JWT for a Google OAuth2 access token (for Drive and Sheets API).
- **Appwrite Integration**: Uses Appwrite SDK for user and function management.
- **CORS Support**: Adds CORS headers for cross-origin requests.

---

## 🧰 Usage

### Endpoints

- `GET /ping`  
  Returns a simple "Pong" message.

- `GET /horoscope`  
  Serves the `horoscope.html` astrology web app.

- `GET /bnn`  
  Serves the `BNN.html` astrology web app.

- `GET /BNN_Comb.js`  
  Serves the `BNN_Comb.js` script.

- `GET /transit.js`  
  Serves the `transit.js` script.

- `GET /significator.js`  
  Serves the `significator.js` script.

- `POST /`  
  Returns a Google OAuth2 JWT assertion and access token as JSON.

---

## 🛠️ Project Structure

```
src/
  main.py
  horoscope.html
  BNN.html
  BNN_Comb.js
  transit.js
  significator.js
  private.key
  ...
requirements.txt
README.md
```

---

## ⚙️ Configuration

| Setting           | Value                             |
| ----------------- | --------------------------------- |
| Runtime           | Python (3.9)                      |
| Entrypoint        | `src/main.py`                     |
| Build Commands    | `pip install -r requirements.txt` |
| Permissions       | `any`                             |
| Timeout (Seconds) | 15                                |

### Environment Variables

- `APPWRITE_FUNCTION_API_ENDPOINT`
- `APPWRITE_FUNCTION_PROJECT_ID`
- (Appwrite function key is passed via request headers)

---

## 🔒 Security

- The Google service account private key (`private.key`) is required for JWT signing.
- Do **not** commit your real private key to public repositories.

---

## 📦 Installation

1. Clone the repository.
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Deploy to Appwrite Functions with the required environment variables.

---

## 📄 License

MIT License

---

## 🙏 Credits

- [Appwrite](https://appwrite.io/)
- Astrology logic and UI by ShreeAura-Astrology

---

## 🗨️ Support

- [Appwrite Discord](https://appwrite.io/discord)