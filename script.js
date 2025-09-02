// DOM elements
const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrSection = document.getElementById('qrSection');
const qrCanvas = document.getElementById('qrCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const copyImageBtn = document.getElementById('copyImageBtn');
const copyBtn = document.getElementById('copyBtn');
const errorMessage = document.getElementById('errorMessage');
// i18n elements
const titleText = document.getElementById('titleText');
const subtitleText = document.getElementById('subtitleText');
const urlLabel = document.getElementById('urlLabel');
const sizeLabel = document.getElementById('sizeLabel');
const eccLabel = document.getElementById('eccLabel');
const optionHint = document.getElementById('optionHint');
const qrTitle = document.getElementById('qrTitle');
const qrDesc = document.getElementById('qrDesc');
const downloadText = document.getElementById('downloadText');
const copyImageText = document.getElementById('copyImageText');
const copyUrlText = document.getElementById('copyUrlText');
const feat1Title = document.getElementById('feat1Title');
const feat1Desc = document.getElementById('feat1Desc');
const feat2Title = document.getElementById('feat2Title');
const feat2Desc = document.getElementById('feat2Desc');
const feat3Title = document.getElementById('feat3Title');
const feat3Desc = document.getElementById('feat3Desc');
const footerText = document.getElementById('footerText');
const langSelect = document.getElementById('langSelect');
const langLabel = document.getElementById('langLabel');
const qrColorLabel = document.getElementById('qrColorLabel');
const bgColorLabel = document.getElementById('bgColorLabel');
// Option elements
const sizeInput = document.getElementById('sizeInput');
const sizeValue = document.getElementById('sizeValue');
const colorDarkInput = document.getElementById('colorDarkInput');
const colorLightInput = document.getElementById('colorLightInput');
const eccLevelSelect = document.getElementById('eccLevelSelect');

// State
let currentUrl = '';
let currentQRInstance = null;
let currentOptions = {
    size: sizeInput ? parseInt(sizeInput.value, 10) : 256,
    colorDark: colorDarkInput ? colorDarkInput.value : '#000000',
    colorLight: colorLightInput ? colorLightInput.value : '#FFFFFF',
    ecc: eccLevelSelect ? eccLevelSelect.value : 'M'
};

// i18n dictionary and helpers
const i18n = {
    en: {
        title: 'URL to QR Code Converter',
        subtitle: "Convert any web URL into a scannable QR code instantly",
        urlLabel: 'Enter Website URL',
        size: 'Size',
        ecc: 'Error Correction',
        hint: 'Typing auto-generates a preview when URL is valid.',
        qrTitle: 'Your QR Code',
        qrDesc: "Scan this QR code with your phone's camera or any QR code scanner app",
        btnGenerate: 'Generate QR Code',
        btnGenerating: 'Generating...',
        btnLoadingLib: 'Loading QR Library...',
        btnDownload: 'Download PNG',
        btnCopyImage: 'Copy Image',
        btnCopyUrl: 'Copy URL',
        tipCopyImage: 'Copy QR image to clipboard',
        lang: 'Language',
        qrColor: 'QR Code Color',
        bgColor: 'Background Color',
        downloaded: 'Downloaded!',
        copied: 'Copied!',
        footer: '© 2024 URL to QR Code Converter. Built with ❤️',
        feat1Title: 'Instant Generation',
        feat1Desc: 'Create QR codes in real-time as you type',
        feat2Title: 'Mobile Friendly',
        feat2Desc: 'Optimized for all devices and screen sizes',
        feat3Title: 'High Quality',
        feat3Desc: 'Crystal clear QR codes for easy scanning',
        eccL: 'L (Low)',
        eccM: 'M (Medium)',
        eccQ: 'Q (Quartile)',
        eccH: 'H (High)',
        errEmptyUrl: 'Please enter a URL',
        errInvalidUrl: 'Please enter a valid URL (e.g., https://example.com)',
        errLibLoading: 'QR Code library is still loading. Please wait a moment and try again.',
        errFormatInvalid: 'The URL format is invalid. Please check and try again.',
        errGenTryDifferent: 'Failed to generate QR code. Please try a different URL.',
        errGenFailed: 'Failed to generate QR code.',
        errNoQRDownload: 'No QR code available to download',
        errDownloadFailed: 'Failed to download QR code. Please try again.',
        errNoQRCopy: 'No QR code available to copy',
        errCopyUrlFailed: 'Failed to copy URL. Please copy manually.',
        errCopyImgSecure: 'Image copy requires a secure context (HTTPS or localhost). Please open this page via a local server.',
        errCopyImgUnsupported: 'Your browser does not support image clipboard API. Try Chrome/Edge latest, or use Download instead.',
        errCopyImgFallback: 'Failed to copy image. Please try Download or open via localhost.'
    },
    zh: {
        title: '网址转二维码工具',
        subtitle: '将任意网址即时转换为可扫码的二维码',
        urlLabel: '请输入网站链接',
        size: '尺寸',
        ecc: '纠错级别',
        hint: '当输入有效 URL 时自动预览。',
        qrTitle: '你的二维码',
        qrDesc: '使用手机相机或任意扫码应用扫描二维码',
        btnGenerate: '生成二维码',
        btnGenerating: '正在生成...',
        btnLoadingLib: '正在加载二维码库...',
        btnDownload: '下载 PNG',
        btnCopyImage: '复制图片',
        btnCopyUrl: '复制链接',
        tipCopyImage: '将二维码图片复制到剪贴板',
        lang: '语言',
        qrColor: '二维码颜色',
        bgColor: '背景颜色',
        downloaded: '已下载！',
        copied: '已复制！',
        footer: '© 2024 网址转二维码工具 · 用 ❤️ 构建',
        feat1Title: '即时生成',
        feat1Desc: '输入时实时创建二维码',
        feat2Title: '移动友好',
        feat2Desc: '适配各类设备与屏幕尺寸',
        feat3Title: '高品质',
        feat3Desc: '清晰锐利，易于扫码',
        eccL: 'L（低）',
        eccM: 'M（中）',
        eccQ: 'Q（较高）',
        eccH: 'H（高）',
        errEmptyUrl: '请输入 URL',
        errInvalidUrl: '请输入有效的 URL（例如：https://example.com）',
        errLibLoading: '二维码库仍在加载中，请稍候重试。',
        errFormatInvalid: 'URL 格式不正确，请检查后重试。',
        errGenTryDifferent: '生成二维码失败，请尝试不同的链接。',
        errGenFailed: '生成二维码失败。',
        errNoQRDownload: '暂无可下载的二维码',
        errDownloadFailed: '下载二维码失败，请重试。',
        errNoQRCopy: '暂无可复制的二维码',
        errCopyUrlFailed: '复制失败，请手动复制。',
        errCopyImgSecure: '复制图片需要安全环境（HTTPS 或 localhost），请通过本地服务器打开页面。',
        errCopyImgUnsupported: '你的浏览器不支持图片剪贴板，建议使用最新版 Chrome/Edge 或改用下载。',
        errCopyImgFallback: '复制图片失败，请尝试下载或通过 localhost 打开。'
    }
};

let currentLang = localStorage.getItem('lang') || (((navigator.language || '').toLowerCase().startsWith('zh')) ? 'zh' : 'en');

function t(key) {
    const dict = i18n[currentLang] || i18n.en;
    return dict[key] || (i18n.en[key] || key);
}

function applyTranslations() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    if (titleText) titleText.textContent = t('title');
    if (subtitleText) subtitleText.textContent = t('subtitle');
    if (urlLabel) urlLabel.textContent = t('urlLabel');
    if (sizeLabel) sizeLabel.textContent = t('size');
    if (eccLabel) eccLabel.textContent = t('ecc');
    if (optionHint) optionHint.textContent = t('hint');
    if (qrTitle) qrTitle.textContent = t('qrTitle');
    if (qrDesc) qrDesc.textContent = t('qrDesc');
    if (downloadText) downloadText.textContent = t('btnDownload');
    if (copyImageText) copyImageText.textContent = t('btnCopyImage');
    if (copyUrlText) copyUrlText.textContent = t('btnCopyUrl');
    if (langLabel) langLabel.textContent = t('lang');
    if (qrColorLabel) qrColorLabel.textContent = t('qrColor');
    if (bgColorLabel) bgColorLabel.textContent = t('bgColor');
    if (copyImageBtn) copyImageBtn.title = t('tipCopyImage');
    if (feat1Title) feat1Title.textContent = t('feat1Title');
    if (feat1Desc) feat1Desc.textContent = t('feat1Desc');
    if (feat2Title) feat2Title.textContent = t('feat2Title');
    if (feat2Desc) feat2Desc.textContent = t('feat2Desc');
    if (feat3Title) feat3Title.textContent = t('feat3Title');
    if (feat3Desc) feat3Desc.textContent = t('feat3Desc');
    if (footerText) footerText.textContent = t('footer');

    // Generate button label
    if (generateBtn) {
        const isDisabled = generateBtn.disabled;
        const isLoading = generateBtn.classList.contains('loading');
        if (isDisabled && !window.qrCodeReady) {
            generateBtn.innerHTML = `<span class="btn-text">${t('btnLoadingLib')}</span>`;
        } else if (isLoading) {
            generateBtn.innerHTML = `<span class="btn-text">${t('btnGenerating')}</span>`;
        } else {
            generateBtn.innerHTML = `<span class="btn-text">${t('btnGenerate')}</span><span class="btn-icon">→</span>`;
        }
    }

    // ECC option labels
    const eccSelectEl = document.getElementById('eccLevelSelect');
    if (eccSelectEl) {
        [...eccSelectEl.options].forEach(opt => {
            const lvl = (opt.getAttribute('data-level') || opt.value || '').toUpperCase();
            if (lvl === 'L') opt.textContent = t('eccL');
            if (lvl === 'M') opt.textContent = t('eccM');
            if (lvl === 'Q') opt.textContent = t('eccQ');
            if (lvl === 'H') opt.textContent = t('eccH');
        });
    }
}

// Try to apply translations early as well (in case load event is delayed)
try { applyTranslations(); } catch (_) {}

// Check if QRCode library is available
function isQRCodeAvailable() {
    return window.qrCodeReady === true && typeof QRCode !== 'undefined';
}

// Event listeners
generateBtn.addEventListener('click', () => generateQRCode({ trigger: 'manual' }));
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode({ trigger: 'manual' });
    }
});
downloadBtn.addEventListener('click', downloadQRCode);
if (copyImageBtn) copyImageBtn.addEventListener('click', copyImageToClipboard);
copyBtn.addEventListener('click', copyURL);

// Debounce helper
function debounce(fn, delay = 400) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(null, args), delay);
    };
}

// Auto-generate on valid input with debounce
const debouncedAutoGenerate = debounce(() => {
    const url = urlInput.value.trim();
    if (!url) return;
    if (!isValidURL(url)) return;
    if (!isQRCodeAvailable()) return;
    generateQRCode({ trigger: 'auto' });
}, 500);

// Generate QR code function
async function generateQRCode({ trigger } = { trigger: 'manual' }) {
    console.log('Generate QR code called');
    const url = urlInput.value.trim();
    
    // Clear previous error
    clearError();
    
    // Validate URL
    if (!url) {
        showError(t('errEmptyUrl'));
        return;
    }
    
    if (!isValidURL(url)) {
        showError(t('errInvalidUrl'));
        return;
    }
    
    // Check if QRCode library is available
    if (!isQRCodeAvailable()) {
        showError(t('errLibLoading'));
        return;
    }
    
    // Set loading state (only for manual triggers)
    if (trigger === 'manual') setLoading(true);
    
    try {
        console.log('Attempting to generate QR code for:', url);
        console.log('QRCode library details:', typeof QRCode, QRCode);
        console.log('Canvas element:', qrCanvas);
        
        // Clear any existing QR code
        qrCanvas.innerHTML = '';
        
        // Use the real QR code library
        if (typeof QRCode === 'function') {
            console.log('Creating QRCode instance');
            
            // Create QR code using the real library
            const opts = resolveOptions();
            currentQRInstance = new QRCode(qrCanvas, {
                text: url,
                width: opts.size,
                height: opts.size,
                colorDark: opts.colorDark,
                colorLight: opts.colorLight,
                correctLevel: mapECC(opts.ecc)
            });
            
            console.log('QR code generated successfully using QRCode');
            console.log('Canvas content after generation:', qrCanvas.innerHTML);
            console.log('Canvas children:', qrCanvas.children.length);
            
        } else {
            throw new Error('QRCode library not available');
        }
        
        // Store current URL
        currentUrl = url;
        currentOptions = resolveOptions();
        
        // Show QR section
        qrSection.style.display = 'block';
        
        // Scroll to QR section smoothly
        qrSection.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error generating QR code:', error);
        console.error('Error details:', error.message, error.stack);
        
        // More specific error messages
        if (error.message.includes('Invalid URL')) {
            showError(t('errFormatInvalid'));
        } else if (error.message.includes('QR Code')) {
            showError(t('errGenTryDifferent'));
        } else {
            showError(t('errGenFailed'));
        }
    } finally {
        if (trigger === 'manual') setLoading(false);
    }
}

// Validate URL function
function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Clear error message
function clearError() {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

// Set loading state
function setLoading(loading) {
    if (loading) {
        generateBtn.classList.add('loading');
        generateBtn.disabled = true;
        generateBtn.innerHTML = `<span class="btn-text">${t('btnGenerating')}</span>`;
    } else {
        generateBtn.classList.remove('loading');
        generateBtn.disabled = false;
        generateBtn.innerHTML = `<span class="btn-text">${t('btnGenerate')}</span><span class="btn-icon">→</span>`;
    }
}

// Download QR code function
function downloadQRCode() {
    try {
        if (currentQRInstance) {
            // Try canvas first
            const canvas = qrCanvas.querySelector('canvas');
            if (canvas) {
                performCanvasDownload(canvas);
            } else {
                // Fallback: some implementations render an <img>
                const img = qrCanvas.querySelector('img');
                if (img && img.naturalWidth) {
                    const off = document.createElement('canvas');
                    const size = currentOptions.size || img.naturalWidth || 256;
                    off.width = size;
                    off.height = size;
                    const ctx = off.getContext('2d');
                    ctx.fillStyle = currentOptions.colorLight || '#FFFFFF';
                    ctx.fillRect(0, 0, size, size);
                    ctx.drawImage(img, 0, 0, size, size);
                    performCanvasDownload(off);
                } else {
                    showError('No QR code available to download');
                }
            }
        } else {
            showError(t('errNoQRDownload'));
        }
        
    } catch (error) {
        console.error('Error downloading QR code:', error);
        showError(t('errDownloadFailed'));
    }
}

function performCanvasDownload(canvas) {
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showDownloadSuccess();
}

// Copy QR image to clipboard
async function copyImageToClipboard() {
    try {
        if (!currentQRInstance) {
            showError(t('errNoQRCopy'));
            return;
        }
        const targetCanvas = getCurrentQRAsCanvas();
        if (!targetCanvas) {
            showError(t('errNoQRCopy'));
            return;
        }

        // If secure context and API supported, use modern Clipboard API
        const hasModern = !!(navigator.clipboard && window.ClipboardItem);
        if (window.isSecureContext && hasModern) {
            const blob = await new Promise((resolve) => targetCanvas.toBlob(resolve, 'image/png'));
            if (!blob) throw new Error('Failed generating image blob');
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            showCopyImageSuccess();
            return;
        }

        // Fallback 1: execCommand via contentEditable image selection
        const dataUrl = targetCanvas.toDataURL('image/png');
        const execOk = fallbackCopyImageWithExecCommand(dataUrl);
        if (execOk) {
            showCopyImageSuccess();
            return;
        }

        // Fallback 2: copy data URL text
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(dataUrl);
            showCopyImageSuccess();
            return;
        }

        // Fallback 3: legacy text copy
        fallbackCopyTextToClipboard(dataUrl);
        showCopyImageSuccess();
    } catch (err) {
        console.error('Error copying image:', err);
        // Provide targeted guidance
        if (!window.isSecureContext) {
            showError(t('errCopyImgSecure'));
            return;
        }
        if (!(navigator.clipboard && window.ClipboardItem)) {
            showError(t('errCopyImgUnsupported'));
            return;
        }
        showError(t('errCopyImgFallback'));
    }
}

function getCurrentQRAsCanvas() {
    const canvas = qrCanvas.querySelector('canvas');
    if (canvas) return canvas;
    const img = qrCanvas.querySelector('img');
    if (img && img.naturalWidth) {
        const off = document.createElement('canvas');
        const size = currentOptions.size || img.naturalWidth || 256;
        off.width = size;
        off.height = size;
        const ctx = off.getContext('2d');
        ctx.fillStyle = currentOptions.colorLight || '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        return off;
    }
    return null;
}

function fallbackCopyImageWithExecCommand(dataUrl) {
    try {
        const host = document.createElement('div');
        host.contentEditable = 'true';
        host.style.position = 'fixed';
        host.style.left = '-99999px';
        host.style.top = '0';
        const img = document.createElement('img');
        img.src = dataUrl;
        img.alt = 'qr';
        host.appendChild(img);
        document.body.appendChild(host);

        const range = document.createRange();
        range.selectNodeContents(host);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        const ok = document.execCommand && document.execCommand('copy');

        selection.removeAllRanges();
        document.body.removeChild(host);
        return !!ok;
    } catch (e) {
        console.warn('execCommand image copy fallback failed:', e);
        return false;
    }
}

// Copy URL function
async function copyURL() {
    try {
        await navigator.clipboard.writeText(currentUrl);
        showCopySuccess();
    } catch (error) {
        console.error('Error copying URL:', error);
        // Fallback for older browsers
        fallbackCopyTextToClipboard(currentUrl);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (error) {
        console.error('Fallback copy failed:', error);
        showError(t('errCopyUrlFailed'));
    }
    
    document.body.removeChild(textArea);
}

// Show download success feedback
function showDownloadSuccess() {
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = `<span class="btn-icon">✅</span> ${t('downloaded')}`;
    downloadBtn.style.background = '#28a745';
    
    setTimeout(() => {
        downloadBtn.innerHTML = originalText;
        downloadBtn.style.background = '';
    }, 2000);
}

// Show copy success feedback
function showCopySuccess() {
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = `<span class="btn-icon">✅</span> ${t('copied')}`;
    copyBtn.style.background = '#28a745';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

function showCopyImageSuccess() {
    if (!copyImageBtn) return;
    const originalText = copyImageBtn.innerHTML;
    copyImageBtn.innerHTML = `<span class="btn-icon">✅</span> ${t('copied')}`;
    copyImageBtn.style.background = '#28a745';
    setTimeout(() => {
        copyImageBtn.innerHTML = originalText;
        copyImageBtn.style.background = '';
    }, 2000);
}

// Auto-focus URL input on page load
window.addEventListener('load', () => {
    console.log('Page loaded, checking QRCode library...');
    console.log('QRCode available:', isQRCodeAvailable());
    urlInput.focus();
    // Initialize language selection and apply UI translations
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', () => {
            currentLang = langSelect.value;
            localStorage.setItem('lang', currentLang);
            applyTranslations();
        });
    }
    applyTranslations();
    // Re-apply translations when QR library becomes ready (in case inline script overwrote labels)
    const watchReady = setInterval(() => {
        if (window.qrCodeReady) {
            applyTranslations();
            clearInterval(watchReady);
        }
    }, 200);
});

// Add some nice animations and interactions
urlInput.addEventListener('input', () => {
    // Clear error when user starts typing
    if (errorMessage.style.display === 'block') {
        clearError();
    }
    
    // Hide QR section if URL is cleared
    if (!urlInput.value.trim() && qrSection.style.display === 'block') {
        qrSection.style.display = 'none';
    }

    // Update debounced auto generation
    debouncedAutoGenerate();

    // Live validation styles
    const val = urlInput.value.trim();
    urlInput.classList.remove('valid', 'invalid');
    if (val.length === 0) return;
    if (isValidURL(val)) {
        urlInput.classList.add('valid');
    } else {
        urlInput.classList.add('invalid');
    }
});

// Add hover effect to QR code
qrCanvas.addEventListener('mouseenter', () => {
    qrCanvas.style.transform = 'scale(1.05)';
    qrCanvas.style.transition = 'transform 0.3s ease';
});

qrCanvas.addEventListener('mouseleave', () => {
    qrCanvas.style.transform = 'scale(1)';
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate QR code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateQRCode();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        urlInput.value = '';
        qrSection.style.display = 'none';
        clearError();
        urlInput.focus();
    }
});

// Options interactions
if (sizeInput && sizeValue) {
    sizeInput.addEventListener('input', () => {
        sizeValue.textContent = `${sizeInput.value} px`;
        currentOptions.size = parseInt(sizeInput.value, 10);
        debouncedAutoGenerate();
    });
}

if (colorDarkInput) {
    colorDarkInput.addEventListener('input', () => {
        currentOptions.colorDark = colorDarkInput.value;
        debouncedAutoGenerate();
    });
}

if (colorLightInput) {
    colorLightInput.addEventListener('input', () => {
        currentOptions.colorLight = colorLightInput.value;
        debouncedAutoGenerate();
    });
}

if (eccLevelSelect) {
    eccLevelSelect.addEventListener('change', () => {
        currentOptions.ecc = eccLevelSelect.value;
        debouncedAutoGenerate();
    });
}

function resolveOptions() {
    return {
        size: sizeInput ? parseInt(sizeInput.value, 10) || 256 : 256,
        colorDark: colorDarkInput ? colorDarkInput.value || '#000000' : '#000000',
        colorLight: colorLightInput ? colorLightInput.value || '#FFFFFF' : '#FFFFFF',
        ecc: eccLevelSelect ? eccLevelSelect.value || 'M' : 'M'
    };
}

function mapECC(val) {
    const v = (val || 'M').toUpperCase();
    const map = {
        L: QRCode.CorrectLevel.L,
        M: QRCode.CorrectLevel.M,
        Q: QRCode.CorrectLevel.Q,
        H: QRCode.CorrectLevel.H,
    };
    return map[v] || QRCode.CorrectLevel.M;
}
