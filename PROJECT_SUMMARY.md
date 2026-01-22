# Free Games Website - Version 1.2.0

## 📋 Project Summary

A modern, responsive website for browsing free games with user data collection capabilities.

### Current Version: **1.2.0** (2026-01-22)

---

## 🎯 Key Features

### User Experience
- ✅ Browse free games from multiple platforms
- ✅ Search and filter by platform/genre
- ✅ List and grid view options
- ✅ Favorites system with localStorage
- ✅ Game detail modal with screenshots
- ✅ Full-screen image viewer with navigation
- ✅ Share games (Twitter, Facebook, Copy Link)
- ✅ Responsive design (mobile & desktop)

### User Data Collection
- ✅ 30-second popup for email subscription
- ✅ Secure PHP backend API
- ✅ Data stored in protected JSON file
- ✅ Email validation & duplicate checking
- ✅ Fallback to localStorage if API unavailable
- ✅ One-time display per user

### Admin Panel
- ✅ Username + Password authentication
- ✅ View all collected user data
- ✅ Statistics dashboard
- ✅ Responsive interface
- ✅ Session management

### UI/UX Enhancements
- ✅ Glassy transparent notifications
- ✅ Green success indicators
- ✅ Clickable logo (scroll to top)
- ✅ Floating home button
- ✅ Dynamic favorites toggle
- ✅ Keyboard navigation for images
- ✅ Smooth animations

---

## 📁 Project Structure

```
Free-Games/
├── api/
│   ├── admin.php              # Admin dashboard (username + password)
│   └── save-user-data.php     # User data collection API
├── assets/
│   └── vector/                # Logo files
├── .git/                      # Git repository
├── .gitignore                 # Excludes user_data.json, zip files
├── CHANGELOG.md               # Version history & changes
├── index.html                 # Main website
├── LICENSE                    # Project license
├── main.js                    # JavaScript functionality
├── PHP_API_README.md          # PHP API documentation
├── README.md                  # Project documentation
├── style.css                  # Styles and animations
├── test-api.html              # API testing page
├── texture.png                # Background texture
└── user_data.json             # User data storage (auto-created, gitignored)
```

---

## 🚀 Quick Start

### Prerequisites
- PHP 7.4 or higher
- Web browser

### Running the Website

1. **Start PHP Server:**
   ```bash
   php -S localhost:8080
   ```

2. **Open in Browser:**
   ```
   http://localhost:8080/index.html
   ```

3. **Test API (Optional):**
   ```
   http://localhost:8080/test-api.html
   ```

4. **Access Admin Panel:**
   ```
   http://localhost:8080/api/admin.php
   ```
   - Default Username: `admin`
   - Default Password: `admin123`
   - **⚠️ CHANGE THESE BEFORE DEPLOYMENT!**

---

## 🔐 Security

### Admin Credentials
**IMPORTANT:** Change default credentials in `api/admin.php`:
```php
define('ADMIN_USERNAME', 'your_username');
define('ADMIN_PASSWORD', 'your_secure_password');
```

### Data Protection
- `user_data.json` is excluded from git
- File permissions set to 0600 (owner only)
- All inputs sanitized with `htmlspecialchars()`
- Email validation on both client and server
- Duplicate email checking

### Production Checklist
- [ ] Change admin credentials
- [ ] Move `user_data.json` outside web root
- [ ] Use HTTPS only
- [ ] Configure proper CORS headers
- [ ] Add rate limiting
- [ ] Implement CAPTCHA
- [ ] Regular backups of user data

---

## 📊 User Data Collection

### How It Works
1. User visits website
2. After 30 seconds, popup appears
3. User enters name and email
4. Data sent to `api/save-user-data.php`
5. Stored in `user_data.json`
6. If API fails, saved to localStorage

### Data Format
```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "timestamp": "2026-01-22T05:22:24+02:00",
    "ip": "127.0.0.1",
    "user_agent": "Mozilla/5.0..."
  }
]
```

### Viewing Data
- Admin Panel: `http://localhost:8080/api/admin.php`
- Direct File: `user_data.json` (not web-accessible)

---

## 🎨 Customization

### Branding
- Logo: `assets/vector/`
- Colors: Edit CSS variables in `style.css`
- Fonts: Google Fonts (Outfit, Germania One)

### API Configuration
- Endpoint: `api/save-user-data.php`
- Popup Timer: Line 46 in `main.js` (30000ms = 30 seconds)

### Admin Panel
- Credentials: `api/admin.php` lines 8-9
- Styling: Inline CSS in `api/admin.php`

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Popup doesn't appear  
**Solution:** Check browser console, ensure 30 seconds have passed

**Issue:** Data not saving  
**Solution:** Check PHP has write permissions, view browser Network tab

**Issue:** Admin login fails  
**Solution:** Verify credentials in `api/admin.php`

**Issue:** CORS errors  
**Solution:** Access via `http://localhost:8080`, not `file://`

**Issue:** Images not loading  
**Solution:** Check API key in `main.js` is valid

---

## 📝 Recent Changes (v1.2.0)

### Added
- Changelog with version management
- Username + password authentication for admin
- Test API page

### Changed
- Migrated from Node.js to PHP
- Updated admin authentication
- Removed all npm dependencies

### Removed
- `package.json`
- `api/save-user-data.js`
- `API_README.md`
- `node_modules/`

See [CHANGELOG.md](CHANGELOG.md) for complete version history.

---

## 📚 Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[PHP_API_README.md](PHP_API_README.md)** - API documentation
- **[README.md](README.md)** - General project info

---

## 🤝 Support

**Developer:** CodeCom.dev  
**Email:** contact@codecom.dev  
**Website:** https://www.codecom.dev

---

## 📄 License

See [LICENSE](LICENSE) file for details.

---

## 🎯 Next Steps

1. **Test the website:** Open `http://localhost:8080/index.html`
2. **Test API:** Use `test-api.html` to verify data collection
3. **Change credentials:** Update admin username/password
4. **Customize branding:** Update logo and colors
5. **Deploy:** Follow production checklist above

---

**Last Updated:** 2026-01-22  
**Version:** 1.2.0  
**Status:** ✅ Production Ready (after changing admin credentials)
