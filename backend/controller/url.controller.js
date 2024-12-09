import axios from 'axios';
import crypto from 'crypto';

export const scanURL = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        // Parallel API calls for better performance
        const [virusTotalResults, safeBrowsingResults] = await Promise.all([
            checkVirusTotal(url),
            checkGoogleSafeBrowsing(url)
        ]);

        res.json({
            url,
            virusTotal: virusTotalResults,
            googleSafeBrowsing: safeBrowsingResults
        });
    } catch (error) {
        console.error('Error scanning URL:', error);
        res.status(500).json({
            message: 'Error scanning URL',
            error: error.message
        });
    }
};

async function checkVirusTotal(url) {
    try {
        // Step 1: Submit URL for scanning
        const submitResponse = await axios.post('https://www.virustotal.com/vtapi/v2/url/scan', null, {
            params: {
                apikey: process.env.VIRUSTOTAL_API_KEY,
                url: url
            }
        });

        // Wait a few seconds for analysis
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Step 2: Get scan results
        const resource = submitResponse.data.scan_id;
        const resultResponse = await axios.get('https://www.virustotal.com/vtapi/v2/url/report', {
            params: {
                apikey: process.env.VIRUSTOTAL_API_KEY,
                resource: resource
            }
        });

        const results = resultResponse.data;
        const positives = results.positives || 0;
        const total = results.total || 0;

        return {
            status: positives > 0 ? 'malicious' : 'clean',
            detectRatio: `${positives}/${total}`,
            threats: Object.entries(results.scans || {})
                .filter(([_, scan]) => scan.detected)
                .map(([vendor, scan]) => `${vendor}: ${scan.result}`)
        };
    } catch (error) {
        console.error('VirusTotal API error:', error);
        throw new Error('Error checking VirusTotal');
    }
}

async function checkGoogleSafeBrowsing(url) {
    try {
        const response = await axios.post(
            `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`,
            {
                client: {
                    clientId: "your-client-id",
                    clientVersion: "1.0.0"
                },
                threatInfo: {
                    threatTypes: [
                        "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"
                    ],
                    platformTypes: ["ANY_PLATFORM"],
                    threatEntryTypes: ["URL"],
                    threatEntries: [{ url: url }]
                }
            }
        );

        const threats = response.data.matches || [];
        return {
            status: threats.length > 0 ? 'malicious' : 'clean',
            threats: threats.map(threat => threat.threatType)
        };
    } catch (error) {
        console.error('Google Safe Browsing API error:', error);
        throw new Error('Error checking Google Safe Browsing');
    }
}