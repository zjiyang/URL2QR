# URL to QR Code Converter

A modern, responsive web tool that converts any website URL into a scannable QR code instantly.

## Features

- **Instant QR Code Generation**: Create QR codes in real-time as you type
- **URL Validation**: Ensures only valid URLs are processed
- **High Quality Output**: Crystal clear QR codes optimized for easy scanning
- **Download Functionality**: Save QR codes as PNG images
- **Copy Image**: Copy the generated QR code image to clipboard
- **Copy URL**: Easily copy the original URL to clipboard
- **Responsive Design**: Works perfectly on all devices and screen sizes
- **Modern UI**: Beautiful gradient design with smooth animations
- **Keyboard Shortcuts**: Support for Enter key and keyboard navigation
 - **Live Preview + Options**: Auto-generate on valid input, with size, colors, and error-correction controls
 - **Live Validation**: URL input shows validity feedback while typing

## How to Use

1. **Open the Tool**: Simply open `index.html` in any modern web browser
2. **Enter URL**: Type or paste a website URL (e.g., `https://example.com`)
3. **Generate QR Code**: Click "Generate QR Code" or press Enter. The QR code also auto-generates after you finish typing a valid URL.
4. **Download or Copy**: Use the action buttons to download the QR code or copy the URL

## Keyboard Shortcuts

- **Enter**: Generate QR code
- **Ctrl/Cmd + Enter**: Generate QR code
- **Escape**: Clear input and hide QR code

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **QR Code Library**: Uses [qrcode.js](https://github.com/davidshimjs/qrcode) for generation
- **No Dependencies**: Works offline after initial load
- **Cross-browser Compatible**: Supports all modern browsers

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start converting URLs to QR codes!

## Deploy to GitHub Pages

You can host this as a static site on GitHub Pages (HTTPS recommended for clipboard image copy).

1. Push this repo to GitHub (e.g., `main` branch)
2. In your repository, go to Settings → Pages
3. Source: "Deploy from a branch" → Branch: `main` → Folder: `/ (root)` → Save
4. Wait a minute, then visit: `https://<your-username>.github.io/<repo-name>/`

Notes:
- HTTPS enables secure context features like copying images to clipboard
- Optional: add a `CNAME` file if you use a custom domain

## Open Source License

This project is licensed under the MIT License. See `LICENSE` for details.

## Usage Examples

- **Business Cards**: Generate QR codes linking to your website
- **Marketing Materials**: Create QR codes for promotional campaigns
- **Event Sharing**: Share event details via QR codes
- **Documentation**: Link printed materials to online resources

## Customization

The tool is easily customizable:
- Modify default colors in `styles.css` or via the options panel
- Adjust QR code size via the options panel
- Add custom styling or branding
- Integrate with other web applications

## License

This project is open source and available under the MIT License.

---

Built with ❤️ using modern web technologies
