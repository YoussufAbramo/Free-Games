# Free Games Website - PHP API Setup

## User Data Collection API (PHP Version)

This website includes a secure PHP backend API to collect user data (name and email) after 30 seconds of browsing.

### Setup Instructions

**No installation required!** The PHP API works with your existing PHP server.

1. **Ensure PHP Server is Running**
   ```bash
   php -S localhost:8080
   ```
   (You already have this running!)

2. **Open the Website**
   - Navigate to `http://localhost:8080/index.html`
   - The API will automatically work

### How It Works

- After 30 seconds, a popup appears requesting user information
- Data is sent to `api/save-user-data.php`
- Information is stored in `user_data.json` (secure, not web-accessible)
- If the API fails, data is saved to browser localStorage as fallback

### Features

- ✅ User data popup appears after 30 seconds
- ✅ Data stored securely in `user_data.json`
- ✅ Email validation and duplicate checking
- ✅ IP address and user agent tracking
- ✅ Fallback to localStorage if API unavailable
- ✅ Green glassy notification for user feedback
- ✅ XSS protection with htmlspecialchars
- ✅ CORS enabled for local development

### Security Features

1. **File Protection**
   - `user_data.json` is stored outside web root when possible
   - File permissions set to 0600 (owner read/write only)
   - Added to `.gitignore` to prevent commits

2. **Input Validation**
   - Email format validation
   - Name length validation
   - XSS protection on all inputs
   - Duplicate email checking

3. **Data Sanitization**
   - All user inputs are sanitized with `htmlspecialchars()`
   - JSON encoding prevents injection attacks

### API Endpoint

**URL:** `api/save-user-data.php`  
**Method:** POST  
**Content-Type:** application/json

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "timestamp": "2026-01-22T03:03:15.000Z"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User data saved successfully"
}
```

**Error Responses:**
- `400` - Invalid input (missing fields, invalid email, invalid name)
- `405` - Method not allowed (must use POST)
- `409` - Email already registered
- `500` - Server error (failed to save)

### Data Storage Format

User data is stored in `user_data.json`:
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "timestamp": "2026-01-22T03:03:15+02:00",
    "ip": "127.0.0.1",
    "user_agent": "Mozilla/5.0..."
  }
]
```

### Testing the API

You can test the API using curl:

```bash
curl -X POST http://localhost:8080/api/save-user-data.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

### Viewing Collected Data

To view collected user data, you can create a simple admin page or access the file directly:

```bash
# View the data file
cat user_data.json

# Or on Windows
type user_data.json
```

**Note:** For production, create a password-protected admin panel to view this data.

### Production Deployment

For production deployment:

1. **Move data file outside web root:**
   ```php
   $dataFile = '/var/secure/user_data.json';
   ```

2. **Disable error display:**
   ```php
   ini_set('display_errors', 0);
   ```

3. **Configure CORS properly:**
   ```php
   header('Access-Control-Allow-Origin: https://yourdomain.com');
   ```

4. **Use HTTPS only**

5. **Consider using a database** (MySQL, PostgreSQL) instead of JSON file

6. **Add rate limiting** to prevent spam

7. **Implement email verification**

8. **Add CAPTCHA** for bot protection

### Advantages of PHP Version

- ✅ No npm dependencies
- ✅ Works with existing PHP server
- ✅ Simpler deployment
- ✅ Lower resource usage
- ✅ Easier to integrate with existing PHP projects
- ✅ Built-in security features

### Files Structure

```
Free-Games/
├── api/
│   └── save-user-data.php    # PHP API endpoint
├── user_data.json             # Data storage (auto-created)
├── index.html                 # Main website
├── main.js                    # JavaScript (calls PHP API)
└── .gitignore                 # Excludes user_data.json
```

### Troubleshooting

**Issue:** API returns 500 error  
**Solution:** Check file permissions on the api directory

**Issue:** Data not saving  
**Solution:** Ensure PHP has write permissions to create `user_data.json`

**Issue:** CORS errors  
**Solution:** Make sure you're accessing via `http://localhost:8080`, not `file://`

**Issue:** Duplicate entries  
**Solution:** The API checks for duplicate emails automatically

### Support

For issues or questions, check:
- PHP error log
- Browser console for JavaScript errors
- Network tab in DevTools for API responses
