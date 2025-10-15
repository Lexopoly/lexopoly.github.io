/**
 * Exit-Intent Popup System
 * Detects when users are about to leave and shows targeted value proposition
 * Following elite company patterns (Stripe, Vercel minimal overlays)
 *
 * TEMPORARILY DISABLED - 2025-10-15
 */

/* COMMENTED OUT - Remove popup per user request
(function() {
    'use strict';

    // Configuration
    const config = {
        sessionStorageKey: 'exit_intent_shown',
        mouseLeaveThreshold: 30, // pixels from top before triggering
        delay: 500, // ms delay before showing popup
        pages: {
            pricing: {
                headline: "Wait! Lock in Founding Member Pricing",
                subheadline: "Join 23 remaining spots for lifetime rate guarantee",
                cta: "Claim My Spot - Start Free",
                ctaLink: "/signup/",
                benefit: "✓ Lifetime pricing lock\n✓ 30-day money-back guarantee\n✓ No credit card required"
            },
            default: {
                headline: "Before You Go...",
                subheadline: "Get instant access to our free transcription trial + case study",
                cta: "Start Free Trial",
                ctaLink: "/signup/",
                benefit: "✓ 5 minutes free monthly\n✓ See real accuracy results\n✓ No credit card needed"
            }
        }
    };

    // Check if already shown in this session
    if (sessionStorage.getItem(config.sessionStorageKey)) {
        return; // Already shown, don't show again
    }

    // Track if mouse left viewport from top (exit intent detected)
    let exitIntentDetected = false;
    let popupTimeout = null;

    // Determine which page we're on
    function getPageType() {
        if (window.location.pathname.includes('/pricing')) return 'pricing';
        return 'default';
    }

    // Create popup HTML
    function createPopup() {
        const pageType = getPageType();
        const content = config.pages[pageType];

        const popup = document.createElement('div');
        popup.id = 'exit-intent-popup';
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;

        popup.innerHTML = `
            <div style="
                background: white;
                border-radius: 16px;
                padding: 3rem;
                max-width: 500px;
                width: 90%;
                position: relative;
                box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                animation: slideUp 0.4s ease-out;
            ">
                <!-- Close button -->
                <button id="exit-popup-close" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #999;
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s;
                " onmouseover="this.style.background='#f0f0f0'; this.style.color='#333'" onmouseout="this.style.background='none'; this.style.color='#999'">
                    ×
                </button>

                <!-- Content -->
                <div style="text-align: center;">
                    <h2 style="
                        font-size: 2rem;
                        margin-bottom: 0.5rem;
                        color: #1a365d;
                        font-weight: 700;
                    ">${content.headline}</h2>

                    <p style="
                        font-size: 1.1rem;
                        color: #4a5568;
                        margin-bottom: 2rem;
                        line-height: 1.5;
                    ">${content.subheadline}</p>

                    <!-- Benefits list -->
                    <div style="
                        background: #f7fafc;
                        border-radius: 8px;
                        padding: 1.5rem;
                        margin-bottom: 2rem;
                        text-align: left;
                    ">
                        <pre style="
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            font-size: 1rem;
                            color: #2d3748;
                            line-height: 1.8;
                            margin: 0;
                            white-space: pre-line;
                        ">${content.benefit}</pre>
                    </div>

                    <!-- CTA Button -->
                    <a href="${content.ctaLink}" id="exit-popup-cta" style="
                        display: inline-block;
                        background: linear-gradient(135deg, #2c5aa0 0%, #1a365d 100%);
                        color: white;
                        padding: 1rem 2.5rem;
                        border-radius: 8px;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 1.1rem;
                        transition: transform 0.2s, box-shadow 0.2s;
                        box-shadow: 0 4px 15px rgba(44,90,160,0.3);
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(44,90,160,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(44,90,160,0.3)'">
                        ${content.cta} →
                    </a>

                    <!-- No thanks link -->
                    <div style="margin-top: 1.5rem;">
                        <button id="exit-popup-dismiss" style="
                            background: none;
                            border: none;
                            color: #999;
                            font-size: 0.9rem;
                            cursor: pointer;
                            text-decoration: underline;
                        " onmouseover="this.style.color='#666'" onmouseout="this.style.color='#999'">
                            No thanks, I'll pay full price later
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
        `;

        document.body.appendChild(popup);
        return popup;
    }

    // Show popup
    function showPopup() {
        if (exitIntentDetected) return; // Already shown

        exitIntentDetected = true;
        sessionStorage.setItem(config.sessionStorageKey, 'true');

        const popup = createPopup();

        // Delay showing popup slightly for better UX
        popupTimeout = setTimeout(() => {
            popup.style.display = 'flex';

            // Track analytics
            if (typeof trackEvent === 'function') {
                const pageType = getPageType();
                trackEvent('exit_intent', 'popup_shown', pageType);
            }
        }, config.delay);

        // Setup close handlers
        const closeBtn = document.getElementById('exit-popup-close');
        const dismissBtn = document.getElementById('exit-popup-dismiss');
        const ctaBtn = document.getElementById('exit-popup-cta');

        function closePopup() {
            popup.style.display = 'none';
            popup.remove();
            if (popupTimeout) clearTimeout(popupTimeout);

            // Track dismiss
            if (typeof trackEvent === 'function') {
                trackEvent('exit_intent', 'popup_dismissed', getPageType());
            }
        }

        closeBtn.addEventListener('click', closePopup);
        dismissBtn.addEventListener('click', closePopup);

        // Close when clicking outside
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Track CTA click
        ctaBtn.addEventListener('click', () => {
            if (typeof trackEvent === 'function') {
                trackEvent('exit_intent', 'cta_clicked', getPageType());
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    // Detect exit intent
    function handleMouseLeave(e) {
        // Only trigger if mouse is moving toward top of page (y < threshold)
        if (e.clientY < config.mouseLeaveThreshold && !exitIntentDetected) {
            showPopup();
        }
    }

    // Mobile detection (exit intent less effective on mobile, use different trigger)
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        // Desktop: Use mouse leave detection
        document.addEventListener('mouseleave', handleMouseLeave);
    } else {
        // Mobile: Show after 30 seconds of inactivity or on scroll-up gesture
        let inactivityTimeout = setTimeout(() => {
            if (!exitIntentDetected) {
                showPopup();
            }
        }, 30000); // 30 seconds

        // Reset inactivity timer on user interaction
        ['touchstart', 'scroll'].forEach(event => {
            document.addEventListener(event, () => {
                clearTimeout(inactivityTimeout);
                inactivityTimeout = setTimeout(() => {
                    if (!exitIntentDetected) {
                        showPopup();
                    }
                }, 30000);
            });
        });
    }

    // Track initial page view for exit intent system
    if (typeof trackEvent === 'function') {
        trackEvent('exit_intent', 'system_loaded', getPageType());
    }

})();
END COMMENTED OUT SECTION */
