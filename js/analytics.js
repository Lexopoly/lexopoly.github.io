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

        // Try to sync any offline events
        this.syncOfflineEvents();
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
        // Create cookie consent banner
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a365d; color: white; padding: 1rem; z-index: 10000; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                    <div style="flex: 1; min-width: 300px;">
                        <p style="margin: 0; font-size: 0.9rem;">
                            🍪 We use essential cookies to improve your experience and understand how our site performs.
                            <a href="/privacy/" style="color: #a0d5f7; text-decoration: underline;">Learn more</a>
                        </p>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button onclick="localTranscribeAnalytics.rejectCookies()"
                                style="background: transparent; border: 1px solid white; color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">
                            Decline
                        </button>
                        <button onclick="localTranscribeAnalytics.acceptCookies()"
                                style="background: white; border: none; color: #1a365d; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                            Accept
                        </button>
                    </div>
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
        const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your GA4 measurement ID

        if (typeof gtag !== 'undefined' && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
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
        // Send to local Flask backend
        const analyticsEndpoint = '/api/track';  // Adjust URL for production

        fetch(analyticsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        }).catch(error => {
            console.warn('Analytics tracking failed:', error);
            // Store locally as fallback
            this.storeOfflineEvent(event);
        });

        // Also send to Google Analytics with attribution if available
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

    storeOfflineEvent(event) {
        // Store events locally if backend is unavailable
        const offlineEvents = JSON.parse(localStorage.getItem('lt-offline-events') || '[]');
        offlineEvents.push(event);

        // Keep only last 100 events to prevent storage bloat
        if (offlineEvents.length > 100) {
            offlineEvents.splice(0, offlineEvents.length - 100);
        }

        localStorage.setItem('lt-offline-events', JSON.stringify(offlineEvents));
    }

    syncOfflineEvents() {
        const offlineEvents = JSON.parse(localStorage.getItem('lt-offline-events') || '[]');
        if (offlineEvents.length === 0) return;

        const analyticsEndpoint = '/api/track';

        // Try to send each offline event
        offlineEvents.forEach(async (event, index) => {
            try {
                await fetch(analyticsEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(event)
                });

                // Remove successful events
                offlineEvents.splice(index, 1);
            } catch (error) {
                console.warn('Failed to sync offline event:', error);
            }
        });

        // Update localStorage
        localStorage.setItem('lt-offline-events', JSON.stringify(offlineEvents));
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