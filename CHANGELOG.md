# Changelog

All notable changes to the Free Games website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-01-22

### Added
- **Changelog file** with version management and detailed change tracking
- **Username + Password authentication** for admin panel (previously password-only)
- **Test API page** (`test-api.html`) for testing user data collection endpoint

### Changed
- **Migrated from Node.js to PHP** for user data collection API
  - Replaced `api/save-user-data.js` with `api/save-user-data.php`
  - Updated `main.js` to call PHP endpoint instead of Node.js
  - No npm dependencies required anymore
- **Admin panel authentication** now requires both username and password
- **Updated `.gitignore`** to exclude npm files and add security notes

### Removed
- **All Node.js/npm files:**
  - `package.json`
  - `package-lock.json` (if existed)
  - `api/save-user-data.js`
  - `node_modules/` directory (if existed)
  - `API_README.md` (replaced with `PHP_API_README.md`)

### Fixed
- None in this version

---

## [1.1.0] - 2026-01-22

### Added
- **Glassy transparent notification system** with green color for success states
- **Favorite notifications** - Shows toast when adding/removing games from favorites
- **Home button clears favorites filter** - Clicking home now resets favorites view
- **Dynamic favorites toggle UI:**
  - Shows "Return" with house icon when favorites filter is active
  - Shows "❤️ Favorites" when filter is inactive
- **Full-screen image navigation:**
  - Left/Right arrow buttons in image viewer
  - Keyboard navigation (←/→ arrow keys, Escape to close)
  - Navigation between all screenshots in game details
- **Image viewer improvements:**
  - Stores screenshots globally for navigation
  - Disables buttons at first/last image
  - Smooth transitions between images

### Changed
- **Notification style** - Changed from solid gradient to glassmorphism with backdrop blur
- **Notification color** - Changed from pink/red to green (#10b981) for success states
- **Copy link notification** - Replaced browser alert with custom toast notification
- **Home button behavior** - Now intelligently clears favorites filter before scrolling

### Fixed
- **Mobile list view** - Items now properly stack vertically on mobile devices
- **Mobile grid view** - Single column layout on screens ≤768px
- **List view responsiveness** - Fixed image container width on mobile
- **Favorites filter persistence** - Home button now properly resets filter state

---

## [1.0.0] - 2026-01-22

### Added
- **Initial release** of Free Games website
- **User data collection system:**
  - 30-second popup for email subscription
  - Name and email validation
  - Secure storage in `user_data.json`
  - Fallback to localStorage if API unavailable
  - One-time display (uses localStorage to prevent repeated popups)
- **Admin panel** (`api/admin.php`):
  - Password-protected dashboard
  - View all collected user data
  - Statistics (total subscribers, today's signups)
  - Clean, responsive interface
- **Security features:**
  - `.gitignore` for sensitive files
  - File permissions (0600) for user data
  - XSS protection with htmlspecialchars
  - Email validation and duplicate checking
  - IP address and user agent tracking
- **UI/UX features:**
  - Clickable logo that scrolls to top
  - Floating home button (bottom-right)
  - Clickable developer contact details (phone, email, location)
  - Notification toast system
  - Responsive design for mobile and desktop
- **Game browsing features:**
  - List and grid view toggle
  - Search functionality
  - Platform and genre filters
  - Favorites system with localStorage
  - Pagination
  - Game detail modal with screenshots
  - Share functionality (Twitter, Facebook, Copy Link)
- **Visual design:**
  - Glassmorphism effects
  - Gradient backgrounds
  - Smooth animations and transitions
  - Custom scrollbar styling
  - Skeleton loaders for content

### Changed
- N/A (Initial release)

### Fixed
- N/A (Initial release)

---

## Version History Summary

| Version | Date | Key Features |
|---------|------|--------------|
| 1.2.0 | 2026-01-22 | PHP migration, username+password auth, changelog |
| 1.1.0 | 2026-01-22 | Glassy notifications, image navigation, mobile fixes |
| 1.0.0 | 2026-01-22 | Initial release with user data collection |

---

## Upcoming Features (Roadmap)

### Planned for v1.3.0
- [ ] Email export functionality (CSV/Excel)
- [ ] Advanced filtering in admin panel
- [ ] Email verification system
- [ ] CAPTCHA integration for bot protection
- [ ] Rate limiting for API requests

### Planned for v2.0.0
- [ ] Database integration (MySQL/PostgreSQL)
- [ ] User authentication system
- [ ] Newsletter sending functionality
- [ ] Analytics dashboard
- [ ] Multi-language support

---

## Notes

- **Breaking Changes:** Version 1.2.0 removes all Node.js dependencies. If you were using the Node.js API, you must migrate to PHP.
- **Security:** Always change the default admin credentials before deploying to production.
- **Backup:** The `user_data.json` file is not backed up automatically. Implement your own backup strategy.

---

## Contributing

When making changes:
1. Update this changelog under "Unreleased" section
2. Follow the format: Added, Changed, Deprecated, Removed, Fixed, Security
3. Move changes to a new version section when releasing
4. Update version number in project files

---

## Contact

For questions or support:
- Developer: CodeCom.dev
- Email: contact@codecom.dev
- Website: https://www.codecom.dev
