# 🔌 MCP Setup Guide - Google Analytics 4 & Search Console

**Purpose**: Enable automated data collection for weekly GA + GSC reports through Claude Code
**MCPs Required**:
- `surendranb/google-analytics-mcp` (GA4 data)
- `surendranb/google-search-console-mcp` (GSC data)
**Estimated Setup Time**: 30-45 minutes (one-time)

---

## 📋 Prerequisites

Before setting up the MCPs, ensure you have:

### Required Software
- ✅ **Python 3.11 or newer** - Check: `python3 --version`
- ✅ **pip** (Python package manager) - Check: `pip3 --version`
- ✅ **Claude Desktop** or **Claude Code** (MCP client)

### Required Access
- ✅ **Google Analytics 4 Property** - Admin or Editor access
- ✅ **Google Search Console Property** - Owner or Full User access
- ✅ **Google Cloud Project** - For API credentials (we'll create this)

### Required Information
- GA4 Property ID (format: `123456789` - find in GA4 Admin > Property Settings)
- Search Console property URL (e.g., `https://lexopoly.com`)

---

## 🚀 Part 1: Google Cloud Project Setup

Both MCPs use Google APIs, so we need to set up OAuth credentials.

### Step 1.1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Create Project** (top-right dropdown)
3. Name: `Lexopoly Analytics MCP`
4. Click **Create**
5. Wait for project creation (~30 seconds)

### Step 1.2: Enable Required APIs

**Enable Google Analytics Data API:**
1. In Cloud Console, go to **APIs & Services > Library**
2. Search for "Google Analytics Data API"
3. Click on it and click **Enable**
4. Wait for activation

**Enable Google Search Console API:**
1. Still in **APIs & Services > Library**
2. Search for "Google Search Console API"
3. Click on it and click **Enable**
4. Wait for activation

### Step 1.3: Create OAuth 2.0 Credentials

1. Go to **APIs & Services > Credentials**
2. Click **+ Create Credentials** > **OAuth client ID**
3. If prompted to configure OAuth consent screen:
   - User Type: **External**
   - App name: `Lexopoly Analytics MCP`
   - User support email: [your email]
   - Developer contact: [your email]
   - Scopes: Skip for now (we'll add later)
   - Test users: Add your Google account email
   - Click **Save and Continue** through all steps

4. Back to **Create OAuth client ID**:
   - Application type: **Desktop app**
   - Name: `Claude MCP Client`
   - Click **Create**

5. **Download credentials**:
   - Click the download icon (⬇️) next to your new OAuth client
   - Save as `oauth_credentials.json`
   - **IMPORTANT**: Keep this file secure - it's like a password

### Step 1.4: Add Required Scopes

1. Go to **APIs & Services > OAuth consent screen**
2. Click **Edit App**
3. Navigate to **Scopes** section
4. Click **Add or Remove Scopes**
5. Add these scopes:
   - `https://www.googleapis.com/auth/analytics.readonly` (GA4)
   - `https://www.googleapis.com/auth/webmasters.readonly` (GSC)
6. Click **Update** and **Save and Continue**

---

## 🔧 Part 2: Install MCP Servers

### Step 2.1: Install Google Analytics MCP

```bash
# Install from PyPI
pip3 install google-analytics-mcp

# Verify installation
python3 -m google_analytics_mcp --version
```

### Step 2.2: Install Google Search Console MCP

```bash
# Install from PyPI
pip3 install google-search-console-mcp

# Verify installation
python3 -m google_search_console_mcp --version
```

**Alternative (if PyPI packages not available)**: Install from GitHub:

```bash
# GA4 MCP
git clone https://github.com/surendranb/google-analytics-mcp.git
cd google-analytics-mcp
pip3 install -e .

# GSC MCP
git clone https://github.com/surendranb/google-search-console-mcp.git
cd google-search-console-mcp
pip3 install -e .
```

---

## ⚙️ Part 3: Configure Claude for MCPs

### Step 3.1: Locate Claude Configuration

**For Claude Desktop (macOS)**:
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**For Claude Desktop (Windows)**:
```powershell
%APPDATA%\Claude\claude_desktop_config.json
```

**For Claude Code**:
```bash
~/.config/claude-code/mcp.json
```

### Step 3.2: Add MCP Configuration

Open your Claude config file and add the MCP servers:

```json
{
  "mcpServers": {
    "google-analytics": {
      "command": "python3",
      "args": ["-m", "google_analytics_mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/oauth_credentials.json",
        "GA4_PROPERTY_ID": "123456789"
      }
    },
    "google-search-console": {
      "command": "python3",
      "args": ["-m", "google_search_console_mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/oauth_credentials.json",
        "GSC_PROPERTY_URL": "https://lexopoly.com"
      }
    }
  }
}
```

**IMPORTANT**: Replace:
- `/path/to/oauth_credentials.json` with actual path to your downloaded credentials
- `123456789` with your actual GA4 Property ID
- `https://lexopoly.com` with your actual Search Console property URL

**Recommended**: Store credentials in a secure location:
```bash
# Create secure credentials directory
mkdir -p ~/.config/google-mcp-credentials

# Move credentials there
mv ~/Downloads/oauth_credentials.json ~/.config/google-mcp-credentials/

# Update config path to:
"GOOGLE_APPLICATION_CREDENTIALS": "~/.config/google-mcp-credentials/oauth_credentials.json"
```

### Step 3.3: Restart Claude

- **Claude Desktop**: Quit completely and relaunch
- **Claude Code**: Restart VS Code or reload window

---

## ✅ Part 4: Authenticate & Test

### Step 4.1: First-Time OAuth Authentication

When you first use the MCP, you'll be prompted to authenticate:

1. Claude will open a browser window
2. Sign in with your Google account (the one with GA4/GSC access)
3. Review permissions requested:
   - View Google Analytics data
   - View Search Console data
4. Click **Allow**
5. You'll see "Authentication successful" message
6. Return to Claude

**Security Note**: OAuth tokens are stored securely by the MCP and refresh automatically.

### Step 4.2: Test Google Analytics MCP

In Claude, try these queries:

```
Can you fetch last week's session data from Google Analytics?
```

```
Show me the top 10 pages by pageviews for the last 7 days
```

```
What were total users yesterday?
```

**Expected Response**: Claude should return actual GA4 data in table or text format.

### Step 4.3: Test Google Search Console MCP

```
Show me search performance for the last 7 days from Search Console
```

```
What are the top 10 search queries driving traffic to my site?
```

```
How many pages are indexed in Google?
```

**Expected Response**: Claude should return GSC data including clicks, impressions, CTR, position.

---

## 🛠️ Troubleshooting

### Issue: MCP not showing up in Claude

**Solution**:
1. Check config file syntax (must be valid JSON)
2. Verify Python paths: `which python3`
3. Ensure MCPs installed: `pip3 list | grep google`
4. Restart Claude completely
5. Check Claude logs for errors

**Claude Desktop Logs**:
- macOS: `~/Library/Logs/Claude/`
- Windows: `%APPDATA%\Claude\Logs\`

### Issue: "Authentication failed" or "Invalid credentials"

**Solution**:
1. Verify `oauth_credentials.json` path is correct
2. Check file permissions: `ls -l ~/.config/google-mcp-credentials/`
3. Ensure OAuth consent screen configured with correct scopes
4. Try re-downloading credentials from Google Cloud Console
5. Delete cached tokens and re-authenticate:
   ```bash
   rm ~/.config/google-mcp-credentials/token_*.json
   ```

### Issue: "Property ID not found" or "Access denied"

**Solution**:
1. Verify GA4 Property ID is correct (9-digit number)
2. Ensure your Google account has Admin/Editor access to GA4 property
3. For GSC: Verify you're an Owner or Full User of the property
4. Check that APIs are enabled in Google Cloud Console
5. Wait 5-10 minutes after enabling APIs (propagation delay)

### Issue: "Rate limit exceeded"

**Solution**:
1. GA4 API has quotas (25,000 requests/day typically)
2. Batch queries when possible (request multiple metrics at once)
3. If hitting limits, request quota increase in Google Cloud Console

### Issue: Data doesn't match GA4 UI

**Solution**:
1. **Sampling**: API data may be sampled for large datasets
2. **Timezone**: Ensure timezone consistency between API query and GA4 UI
3. **Real-time**: API has slight delay (~24-48 hour lag for some metrics)
4. **Filters**: Check if GA4 property has filters applied

### Issue: Python/pip not found

**Solution**:
```bash
# macOS (using Homebrew)
brew install python3

# Ubuntu/Debian
sudo apt-get install python3 python3-pip

# Windows
# Download from python.org and install
```

---

## 📊 Part 5: Using MCPs for Weekly Reports

### Sample Queries for Data Collection

**Traffic Volume**:
```
From Google Analytics, get sessions, users, and pageviews for Oct 27 - Nov 2, 2025.
Compare to the previous week (Oct 20-26).
```

**Top Pages**:
```
Show me the top 10 pages by sessions for last week (Oct 27 - Nov 2) with week-over-week comparison.
```

**Traffic Sources**:
```
Break down sessions by source/medium for last week, including percentages.
```

**Search Performance**:
```
From Search Console, get total clicks, impressions, average CTR, and average position for Oct 27 - Nov 2.
```

**Top Search Queries**:
```
What are the top 10 search queries driving clicks to my site last week?
```

**Index Status**:
```
How many URLs are indexed in Google Search Console? Any coverage issues?
```

**Product Performance**:
```
Compare sessions for these URL prefixes last week:
/localtranscribe/, /quotecreator/, /compliancelogger/, /revenuerescue/, /familycalc/
```

### Automated Report Generation

Once MCPs are set up, you can ask Claude:

```
Generate my weekly GA + GSC report for Week 44 (Oct 27 - Nov 2, 2025).
Pull data from both Google Analytics and Search Console, then fill out the
template at /docs/analytics/GA_WEEKLY_REPORT_TEMPLATE.md. Save as
GA_WEEKLY_REPORT_2025_W44.md.
```

Claude will:
1. Query both APIs for required metrics
2. Calculate week-over-week changes
3. Fill in the report template
4. Generate insights and recommendations
5. Save the completed report

**Time savings**: ~50 minutes → ~5 minutes per weekly report

---

## 🔐 Security Best Practices

### Credential Storage
- ✅ **DO**: Store credentials outside project directory
- ✅ **DO**: Use restrictive file permissions (600)
  ```bash
  chmod 600 ~/.config/google-mcp-credentials/oauth_credentials.json
  ```
- ❌ **DON'T**: Commit credentials to git
- ❌ **DON'T**: Share credentials files

### Access Control
- ✅ **DO**: Use least-privilege principle (readonly scopes)
- ✅ **DO**: Use OAuth (auto-expiring tokens) not service accounts
- ✅ **DO**: Regularly review authorized apps: https://myaccount.google.com/permissions
- ❌ **DON'T**: Use admin-level credentials for readonly tasks

### Monitoring
- ✅ **DO**: Check Google Cloud Console quota usage monthly
- ✅ **DO**: Review OAuth audit logs for unusual activity
- ✅ **DO**: Revoke and regenerate credentials if compromised

---

## 📚 Additional Resources

### Documentation
- [Google Analytics Data API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Google Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original)
- [MCP Documentation](https://modelcontextprotocol.io/)

### MCP GitHub Repositories
- [google-analytics-mcp](https://github.com/surendranb/google-analytics-mcp)
- [google-search-console-mcp](https://github.com/surendranb/google-search-console-mcp)

### Support
- **MCP Issues**: GitHub Issues on respective repositories
- **API Issues**: Google Cloud Console Support
- **Setup Help**: See troubleshooting section above

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] Google Cloud Project created
- [ ] Google Analytics Data API enabled
- [ ] Google Search Console API enabled
- [ ] OAuth 2.0 credentials downloaded
- [ ] OAuth consent screen configured with test users
- [ ] Required scopes added (analytics.readonly, webmasters.readonly)
- [ ] Both MCPs installed (`pip3 list | grep google`)
- [ ] Claude config file updated with both MCPs
- [ ] Credentials path correct in config
- [ ] GA4 Property ID correct
- [ ] GSC property URL correct
- [ ] Claude restarted
- [ ] First OAuth authentication completed
- [ ] Test query successful for GA4
- [ ] Test query successful for GSC
- [ ] Data returned matches expected property

**All checked?** ✅ You're ready to generate automated weekly reports!

---

**Last Updated**: 2025-11-04
**MCP Versions**:
- google-analytics-mcp: Latest (check PyPI)
- google-search-console-mcp: Latest (check PyPI)
**Tested With**: Claude Desktop 1.0+, Claude Code (VS Code extension)
**Status**: ✅ PRODUCTION READY
