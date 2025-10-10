/**
 * Live Chat Integration - Tawk.to
 * Professional customer support widget with analytics tracking
 * Free tier: Unlimited chats, no credit card required
 *
 * SETUP REQUIRED:
 * 1. Sign up at https://www.tawk.to (100% free forever)
 * 2. Get your Property ID and Widget ID from dashboard
 * 3. Replace TAWK_PROPERTY_ID and TAWK_WIDGET_ID below
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        // TODO: Replace with actual Tawk.to IDs after signup
        // Sign up at: https://www.tawk.to
        propertyId: 'TAWK_PROPERTY_ID', // Get from Tawk.to dashboard
        widgetId: 'TAWK_WIDGET_ID',     // Get from Tawk.to dashboard

        // Customization (matches Lexopoly brand)
        customization: {
            backgroundColor: '#2c5aa0',   // Lexopoly accent color
            bubbleBackground: '#1a365d',  // Lexopoly primary
            bubbleText: '#ffffff',
            headerText: 'Chat with us!',
            offlineMessage: 'Leave us a message',
            position: 'bottom-right',     // 'bottom-right' or 'bottom-left'
            showOnMobile: true,
            showOnPages: ['pricing', 'demo', 'signup', 'contact', 'index'] // Key conversion pages
        },

        // Analytics tracking
        analytics: {
            enabled: true,
            trackChatStart: true,
            trackChatEnd: true,
            trackOfflineMessage: true
        }
    };

    // Check if we should show chat on current page
    function shouldShowChat() {
        const currentPath = window.location.pathname;

        // Show on configured pages
        for (const page of config.customization.showOnPages) {
            if (currentPath.includes(page) || currentPath === '/' + page + '/' || currentPath === '/') {
                return true;
            }
        }

        return false;
    }

    // Don't load if not on specified pages
    if (!shouldShowChat()) {
        console.log('[Live Chat] Not loading on this page');
        return;
    }

    // Check if Tawk IDs are configured
    if (config.propertyId === 'TAWK_PROPERTY_ID' || config.widgetId === 'TAWK_WIDGET_ID') {
        console.warn('[Live Chat] Tawk.to IDs not configured. Please sign up at https://www.tawk.to and update live-chat.js');

        // Show temporary "contact us" button as fallback
        showFallbackButton();
        return;
    }

    // Load Tawk.to script asynchronously
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    // Setup Tawk API handlers before loading script
    Tawk_API.onLoad = function() {
        console.log('[Live Chat] Tawk.to loaded successfully');

        // Customize appearance
        Tawk_API.setAttributes({
            name: 'Website Visitor',
            email: ''
        }, function(error) {
            if (error) {
                console.error('[Live Chat] Error setting attributes:', error);
            }
        });

        // Track analytics
        if (config.analytics.enabled && typeof trackEvent === 'function') {
            trackEvent('live_chat', 'widget_loaded', window.location.pathname);
        }
    };

    Tawk_API.onChatStarted = function() {
        console.log('[Live Chat] Chat started');

        if (config.analytics.trackChatStart && typeof trackEvent === 'function') {
            trackEvent('live_chat', 'chat_started', window.location.pathname);
        }
    };

    Tawk_API.onChatEnded = function() {
        console.log('[Live Chat] Chat ended');

        if (config.analytics.trackChatEnd && typeof trackEvent === 'function') {
            trackEvent('live_chat', 'chat_ended', window.location.pathname);
        }
    };

    Tawk_API.onOfflineSubmit = function(data) {
        console.log('[Live Chat] Offline message submitted');

        if (config.analytics.trackOfflineMessage && typeof trackEvent === 'function') {
            trackEvent('live_chat', 'offline_message_sent', window.location.pathname);
        }
    };

    // Load Tawk.to widget script
    (function() {
        var s1 = document.createElement("script");
        var s0 = document.getElementsByTagName("script")[0];

        s1.async = true;
        s1.src = `https://embed.tawk.to/${config.propertyId}/${config.widgetId}`;
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');

        // Error handling
        s1.onerror = function() {
            console.error('[Live Chat] Failed to load Tawk.to script');
            showFallbackButton();
        };

        s0.parentNode.insertBefore(s1, s0);
    })();

    // Fallback: Show simple "Contact Us" button if Tawk.to fails or not configured
    function showFallbackButton() {
        // Only show fallback on key conversion pages
        if (!shouldShowChat()) return;

        const fallbackBtn = document.createElement('a');
        fallbackBtn.href = '/contact/';
        fallbackBtn.id = 'chat-fallback-btn';
        fallbackBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Contact Us</span>
        `;

        fallbackBtn.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: linear-gradient(135deg, #2c5aa0 0%, #1a365d 100%);
            color: white;
            padding: 14px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 8px 24px rgba(44, 90, 160, 0.4);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        fallbackBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 12px 32px rgba(44, 90, 160, 0.5)';
        };

        fallbackBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 24px rgba(44, 90, 160, 0.4)';
        };

        // Track fallback button click
        fallbackBtn.onclick = function() {
            if (typeof trackEvent === 'function') {
                trackEvent('live_chat', 'fallback_contact_clicked', window.location.pathname);
            }
        };

        document.body.appendChild(fallbackBtn);
        console.log('[Live Chat] Fallback contact button displayed');
    }

    // Mobile optimization: hide chat widget on very small screens if configured
    if (!config.customization.showOnMobile && window.innerWidth < 480) {
        console.log('[Live Chat] Hidden on mobile per configuration');
        return;
    }

    console.log('[Live Chat] Tawk.to integration loaded');
})();


/**
 * SETUP INSTRUCTIONS:
 *
 * 1. Create Tawk.to Account (Free):
 *    - Go to https://www.tawk.to
 *    - Sign up (100% free forever)
 *    - Create a property for Lexopoly
 *
 * 2. Get Your Widget Code:
 *    - Dashboard → Administration → Chat Widget
 *    - Copy your Property ID and Widget ID
 *    - They look like: "5f1234567890abcdef123456" and "1a2b3c4d5e"
 *
 * 3. Update This File:
 *    - Replace TAWK_PROPERTY_ID with your Property ID
 *    - Replace TAWK_WIDGET_ID with your Widget ID
 *
 * 4. Customize (Optional):
 *    - Update config.customization colors to match brand
 *    - Adjust showOnPages array to control where chat appears
 *    - Enable/disable analytics tracking
 *
 * 5. Test:
 *    - Open pricing page (or other configured pages)
 *    - Chat widget should appear in bottom-right corner
 *    - Test both online and offline message functionality
 *
 * FALLBACK BEHAVIOR:
 * - If Tawk.to IDs not configured: Shows "Contact Us" button
 * - If Tawk.to script fails to load: Shows "Contact Us" button
 * - Links to /contact/ page as fallback
 *
 * ANALYTICS TRACKING:
 * - widget_loaded: Chat widget successfully loaded
 * - chat_started: User initiated chat conversation
 * - chat_ended: Chat conversation ended
 * - offline_message_sent: User sent offline message
 * - fallback_contact_clicked: Fallback contact button clicked
 */
