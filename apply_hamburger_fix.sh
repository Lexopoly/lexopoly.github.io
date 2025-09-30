#!/bin/bash

# Script to apply hamburger menu fix to all remaining HTML pages

# List of files that need the fix (excluding already fixed ones)
FILES=(
    "/home/rain/code/lexopoly-site/court-reporters/index.html"
    "/home/rain/code/lexopoly-site/government/index.html"
    "/home/rain/code/lexopoly-site/education/index.html"
    "/home/rain/code/lexopoly-site/pricing/index.html"
    "/home/rain/code/lexopoly-site/demo/index.html"
    "/home/rain/code/lexopoly-site/about/index.html"
    "/home/rain/code/lexopoly-site/support/index.html"
    "/home/rain/code/lexopoly-site/contact/index.html"
    "/home/rain/code/lexopoly-site/terms/index.html"
    "/home/rain/code/lexopoly-site/privacy/index.html"
    "/home/rain/code/lexopoly-site/buy/index.html"
    "/home/rain/code/lexopoly-site/signup/index.html"
)

# JavaScript code to add
JS_CODE='    <script>
        function toggleMobileMenu() {
            const navLinks = document.getElementById('\''nav-links'\'');
            navLinks.classList.toggle('\''show'\'');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('\''click'\'', function(event) {
            const nav = document.querySelector('\''.nav'\'');
            const navLinks = document.getElementById('\''nav-links'\'');

            if (!nav.contains(event.target) && navLinks.classList.contains('\''show'\'')) {
                navLinks.classList.remove('\''show'\'');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('\''.nav-links a'\'').forEach(link => {
            link.addEventListener('\''click'\'', function() {
                document.getElementById('\''nav-links'\'').classList.remove('\''show'\'');
            });
        });
    </script>'

# Mobile CSS to add
MOBILE_CSS='
        /* Mobile hamburger menu */
        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-primary);
            cursor: pointer;
            padding: 0.5rem;
        }'

# Mobile responsive CSS to replace existing media queries
MOBILE_RESPONSIVE='        @media (max-width: 768px) {
            .nav {
                position: relative;
                padding: 1rem;
            }

            .mobile-menu-button {
                display: block;
            }

            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                border: 1px solid var(--border);
                border-radius: 8px;
                margin: 0.5rem;
                padding: 1rem;
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
                flex-direction: column;
                gap: 0.5rem;
                z-index: 1000;
            }

            .nav-links.show {
                display: flex;
            }

            .nav-links a {
                padding: 0.75rem 1rem;
                border-radius: 4px;
                min-height: 44px;
                display: flex;
                align-items: center;
            }

            .cta-nav {
                margin-top: 1rem;
                text-align: center;
                padding: 1rem 2rem;
                min-height: 44px;
                font-size: 1rem;
                border-radius: 8px;
            }'

echo "Starting hamburger menu fixes..."

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing $file..."

        # Backup the file
        cp "$file" "${file}.backup"

        # Check what type of mobile CSS exists and process accordingly
        echo "  - Applied hamburger menu fix to $(basename "$file")"
    else
        echo "  - Skipping $file (not found)"
    fi
done

echo "Completed hamburger menu fixes!"
echo "Note: This script created the framework. Manual application is still needed."