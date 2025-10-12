/**
 * LocalTranscribe Analytics & Conversion Tracking
 * GDPR-compliant analytics with cookie consent
 */

class LocalTranscribeAnalytics {
    constructor() {
        this.consentGiven = false;
        this.sessionId = this.generateSessionId();
        this.events = [];

        this.init();
    }

    init() {
        // Capture UTM parameters BEFORE anything else
        this.captureUTMParameters();

        // Check for existing consent
        this.consentGiven = localStorage.getItem('lt-analytics-consent') === 'true';

        if (!this.consentGiven) {
            this.showCookieConsent();
        } else {
            this.initializeTracking();
        }

        // Track page views
        this.trackPageView();

        // Set up event listeners
        this.setupEventListeners();
    }

    generateSessionId() {
        return 'lt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    captureUTMParameters() {
        const params = new URLSearchParams(window.location.search);
        const utm = {
            source: params.get('utm_source'),
            medium: params.get('utm_medium'),
            campaign: params.get('utm_campaign'),
            content: params.get('utm_content'),
            term: params.get('utm_term')
        };

        // Only proceed if we have at least a source
        if (!utm.source) {
            // Try to get existing attribution data
            this.attribution = this.getStoredAttribution();
            return;
        }

        // Store current UTM (last-touch attribution)
        sessionStorage.setItem('lt-utm-current', JSON.stringify({
            ...utm,
            timestamp: Date.now(),
            landing_page: window.location.pathname
        }));

        // Store first-touch attribution (only if not already set)
        if (!localStorage.getItem('lt-utm-first')) {
            localStorage.setItem('lt-utm-first', JSON.stringify({
                ...utm,
                timestamp: Date.now(),
                landing_page: window.location.pathname
            }));
        }

        // Update attribution object
        this.attribution = {
            firstTouch: JSON.parse(localStorage.getItem('lt-utm-first') || '{}'),
            lastTouch: JSON.parse(sessionStorage.getItem('lt-utm-current') || '{}'),
            current: utm
        };

        // Track attribution capture
        if (this.consentGiven) {
            this.trackEvent('attribution', 'utm_captured', utm.source, null);
        }
    }

    getStoredAttribution() {
        return {
            firstTouch: JSON.parse(localStorage.getItem('lt-utm-first') || '{}'),
            lastTouch: JSON.parse(sessionStorage.getItem('lt-utm-current') || '{}'),
            current: {}
        };
    }

    showCookieConsent() {
        // Create subtle cookie consent popup
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 1.5rem; right: 1.5rem; background: white; color: #2d3748; padding: 1.25rem; z-index: 10000; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius: 12px; max-width: 420px; border: 1px solid #e2e8f0;">
                <div style="margin-bottom: 1rem;">
                    <p style="margin: 0; font-size: 0.9rem; line-height: 1.5; color: #4a5568;">
                        We use cookies to improve your experience and measure site performance.
                        <a href="/privacy/" style="color: #2c5aa0; text-decoration: underline; font-weight: 500;">Privacy Policy</a>
                    </p>
                </div>
                <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                    <button onclick="localTranscribeAnalytics.rejectCookies()"
                            style="background: transparent; border: 1px solid #cbd5e0; color: #4a5568; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s;">
                        Decline
                    </button>
                    <button onclick="localTranscribeAnalytics.acceptCookies()"
                            style="background: #2c5aa0; border: none; color: white; padding: 0.5rem 1.25rem; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s;">
                        Accept
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);
    }

    acceptCookies() {
        localStorage.setItem('lt-analytics-consent', 'true');
        this.consentGiven = true;
        this.removeCookieBanner();
        this.initializeTracking();
        this.trackEvent('cookie_consent', 'accepted');
    }

    rejectCookies() {
        localStorage.setItem('lt-analytics-consent', 'false');
        this.consentGiven = false;
        this.removeCookieBanner();
        this.trackEvent('cookie_consent', 'declined');
    }

    removeCookieBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.remove();
        }
    }

    initializeTracking() {
        if (!this.consentGiven) return;

        // Initialize Google Analytics 4
        const GA4_MEASUREMENT_ID = 'G-N29Z7B6T5T';

        if (typeof gtag !== 'undefined') {
            gtag('config', GA4_MEASUREMENT_ID, {
                'send_page_view': false // We'll send pageviews manually with attribution
            });

            // Send initial pageview with attribution
            this.sendGA4PageView();
        }

        // Initialize any other tracking tools
        console.log('Analytics initialized for session:', this.sessionId);
    }

    sendGA4PageView() {
        if (typeof gtag === 'undefined') return;

        const attribution = this.attribution || this.getStoredAttribution();

        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title,
            // First-touch attribution
            first_source: attribution.firstTouch.source || 'direct',
            first_medium: attribution.firstTouch.medium || 'none',
            first_campaign: attribution.firstTouch.campaign || '(not set)',
            // Last-touch attribution
            last_source: attribution.lastTouch.source || attribution.firstTouch.source || 'direct',
            last_medium: attribution.lastTouch.medium || attribution.firstTouch.medium || 'none',
            last_campaign: attribution.lastTouch.campaign || attribution.firstTouch.campaign || '(not set)'
        });
    }

    trackPageView(path = window.location.pathname) {
        const event = {
            type: 'page_view',
            path: path,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            referrer: document.referrer,
            userAgent: navigator.userAgent
        };

        this.events.push(event);

        if (this.consentGiven) {
            this.sendEvent(event);
        }

        // Track conversion funnel steps
        this.trackFunnelStep(path);
    }

    trackFunnelStep(path) {
        const funnelSteps = {
            '/': 'homepage_view',
            '/lawyers/': 'vertical_lawyers',
            '/journalists/': 'vertical_journalists',
            '/pricing/': 'pricing_view',
            '/demo/': 'demo_view',
            '/signup/': 'signup_start',
            '/contact/': 'contact_view'
        };

        const step = funnelSteps[path];
        if (step) {
            this.trackEvent('funnel', step);
        }
    }

    trackEvent(category, action, label = null, value = null) {
        const event = {
            type: 'event',
            category: category,
            action: action,
            label: label,
            value: value,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            path: window.location.pathname
        };

        this.events.push(event);

        if (this.consentGiven) {
            this.sendEvent(event);
        }
    }

    trackConversion(conversionType, value = null) {
        // Track conversion event with attribution
        this.trackEvent('conversion', conversionType, null, value);

        // Also send as dedicated GA4 conversion event if available
        if (typeof gtag !== 'undefined') {
            const attribution = this.attribution || this.getStoredAttribution();

            gtag('event', 'conversion', {
                conversion_type: conversionType,
                value: value,
                currency: 'USD',
                // Attribution context for conversion
                first_source: attribution.firstTouch.source || 'direct',
                first_medium: attribution.firstTouch.medium || 'none',
                first_campaign: attribution.firstTouch.campaign || '(not set)',
                last_source: attribution.lastTouch.source || attribution.firstTouch.source || 'direct',
                last_medium: attribution.lastTouch.medium || attribution.firstTouch.medium || 'none',
                last_campaign: attribution.lastTouch.campaign || attribution.firstTouch.campaign || '(not set)',
                // Time to conversion (if first-touch exists)
                time_to_conversion: attribution.firstTouch.timestamp
                    ? Math.round((Date.now() - attribution.firstTouch.timestamp) / 1000)
                    : null
            });
        }

        // Store conversion with full attribution for later analysis
        const conversionData = {
            type: conversionType,
            timestamp: Date.now(),
            value: value,
            attribution: this.attribution || this.getStoredAttribution()
        };

        localStorage.setItem('lt-last-conversion', JSON.stringify(conversionData));
    }

    setupEventListeners() {
        // Track CTA clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            // Track CTA buttons
            if (target.classList.contains('btn-primary') ||
                target.classList.contains('cta-nav') ||
                target.textContent.includes('Start Free') ||
                target.textContent.includes('Try Free')) {
                this.trackEvent('cta', 'click', target.textContent.trim());
            }

            // Track pricing tier interest
            if (target.closest('.tier-card')) {
                const tierName = target.closest('.tier-card').querySelector('.tier-name')?.textContent;
                this.trackEvent('pricing', 'tier_click', tierName);
            }

            // Track external links
            if (target.href && target.hostname !== window.location.hostname) {
                this.trackEvent('external_link', 'click', target.href);
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'signup-form') {
                this.trackConversion('signup_submit');
            } else if (e.target.id === 'contact-form') {
                this.trackConversion('contact_submit');
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
                maxScroll = scrollPercent;
                this.trackEvent('engagement', 'scroll_depth', `${scrollPercent}%`);
            }
        });

        // Track time on page
        let startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            this.trackEvent('engagement', 'time_on_page', null, timeOnPage);
        });
    }

    sendEvent(event) {
        // Send to Google Analytics with attribution if available
        if (typeof gtag !== 'undefined') {
            const attribution = this.attribution || this.getStoredAttribution();

            gtag('event', event.action, {
                event_category: event.category,
                event_label: event.label,
                value: event.value,
                // Include attribution context
                first_source: attribution.firstTouch.source || 'direct',
                first_medium: attribution.firstTouch.medium || 'none',
                first_campaign: attribution.firstTouch.campaign || '(not set)',
                last_source: attribution.lastTouch.source || attribution.firstTouch.source || 'direct',
                last_medium: attribution.lastTouch.medium || attribution.firstTouch.medium || 'none',
                last_campaign: attribution.lastTouch.campaign || attribution.firstTouch.campaign || '(not set)'
            });
        }

        console.log('Analytics Event:', event);
    }

    // Utility methods for business intelligence
    getConversionData() {
        return this.events.filter(e => e.category === 'conversion');
    }

    getFunnelData() {
        return this.events.filter(e => e.category === 'funnel');
    }

    exportSessionData() {
        return {
            sessionId: this.sessionId,
            events: this.events,
            consentGiven: this.consentGiven,
            timestamp: Date.now()
        };
    }
}

// Initialize analytics
const localTranscribeAnalytics = new LocalTranscribeAnalytics();

// Global tracking functions for easy use
function trackConversion(type, value) {
    localTranscribeAnalytics.trackConversion(type, value);
}

function trackEvent(category, action, label, value) {
    localTranscribeAnalytics.trackEvent(category, action, label, value);
}

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocalTranscribeAnalytics;
}