import cron from "node-cron";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import path from "path";
const schedulerConfig = {
  // Cron schedule: "0 9 * * *" = Every day at 9:00 AM
  // Format: second minute hour day month weekday
  schedule: "0 9 * * *",
  // Daily at 9 AM
  // Enable/disable scheduler (useful for development)
  enabled: process.env.NODE_ENV === "production",
  // Timezone
  timezone: "America/Los_Angeles",
  // Organizations to monitor
  organizations: [
    {
      name: "Bay Area Wildcats Basketball",
      website: "https://bayareawildcats.org",
      checkPatterns: ["tryout", "registration", "schedule"]
    },
    {
      name: "Team Arsenal AAU",
      website: "https://teamarsenalaau.com",
      tryoutPage: "https://teamarsenalaau.com/tryouts",
      checkPatterns: ["tryout", "14U", "15U", "16U", "17U"]
    },
    {
      name: "Bay City Basketball",
      website: "https://www.baycitybasketball.com",
      checkPatterns: ["tryout", "registration", "warriors", "3ssb"]
    },
    {
      name: "Bay Area Mambas AAU",
      website: "https://bayareamambas.com",
      checkPatterns: ["tryout", "14U", "registration"]
    },
    {
      name: "SFBA AAU",
      website: "https://www.sfbasportsperformance.com/sfbaaaubasketballsanfrancisco",
      checkPatterns: ["tryout", "2026", "spring", "summer"]
    },
    {
      name: "LAKESHOW Bay Area AAU",
      website: "https://www.lakeshowhoops.com",
      tryoutPage: "https://www.lakeshowhoops.com/2025-spring-tryouts",
      checkPatterns: ["tryout", "spring", "2025", "high school"]
    },
    {
      name: "NorCal Rush Basketball",
      website: "https://www.norcalrushbasketball.com",
      tryoutPage: "https://www.norcalrushbasketball.com/tryouts",
      checkPatterns: ["tryout", "fall", "2025", "peninsula", "san francisco"]
    },
    {
      name: "Bay Area Lava",
      website: "https://www.bayarealava.com",
      checkPatterns: ["tryout", "december", "high school"]
    }
  ]
};
async function scrapeWebsite(org) {
  const url = org.tryoutPage || org.website;
  try {
    const response = await axios.get(url, {
      timeout: 1e4,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; AAU-Tryouts-Checker/1.0; +https://github.com/nathannam/aau-basketball-tryouts)"
      }
    });
    const html = response.data;
    const $ = cheerio.load(html);
    const bodyText = $("body").text().toLowerCase();
    const foundPatterns = org.checkPatterns.filter(
      (pattern) => bodyText.includes(pattern.toLowerCase())
    );
    const contentHash = createSimpleHash(bodyText);
    return {
      organizationName: org.name,
      website: url,
      contentHash,
      foundPatterns,
      lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
      hasChanges: false
      // Will be determined by comparing with previous hash
    };
  } catch (error) {
    console.error(`Error scraping ${org.name}:`, error);
    return {
      organizationName: org.name,
      website: url,
      contentHash: "",
      foundPatterns: [],
      lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
      hasChanges: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
async function scrapeAllWebsites(organizations) {
  console.log(
    `[Scraper] Starting scrape of ${organizations.length} organizations...`
  );
  const results = await Promise.allSettled(
    organizations.map((org) => scrapeWebsite(org))
  );
  const scraperResults = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        organizationName: organizations[index].name,
        website: organizations[index].website,
        contentHash: "",
        foundPatterns: [],
        lastChecked: (/* @__PURE__ */ new Date()).toISOString(),
        hasChanges: false,
        error: result.reason?.message || "Failed to scrape website"
      };
    }
  });
  console.log(`[Scraper] Completed scraping ${scraperResults.length} websites`);
  return scraperResults;
}
function createSimpleHash(content) {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}
function detectChanges(currentResults, previousResults) {
  return currentResults.map((current) => {
    const previous = previousResults.find(
      (p) => p.organizationName === current.organizationName
    );
    if (!previous) {
      return { ...current, hasChanges: true };
    }
    const hasChanges = previous.contentHash !== current.contentHash;
    return { ...current, hasChanges };
  });
}
const STORAGE_DIR = path.join(process.cwd(), ".scraper-data");
const RESULTS_FILE = path.join(STORAGE_DIR, "latest-results.json");
const HISTORY_FILE = path.join(STORAGE_DIR, "history.json");
async function initializeStorage() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
    console.log(`[Storage] Initialized storage directory: ${STORAGE_DIR}`);
  } catch (error) {
    console.error("[Storage] Failed to initialize storage:", error);
  }
}
async function saveResults(results) {
  try {
    await fs.writeFile(RESULTS_FILE, JSON.stringify(results, null, 2));
    console.log(`[Storage] Saved ${results.length} results to ${RESULTS_FILE}`);
  } catch (error) {
    console.error("[Storage] Failed to save results:", error);
  }
}
async function loadPreviousResults() {
  try {
    const data = await fs.readFile(RESULTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
async function appendToHistory(results) {
  try {
    const changesDetected = results.filter((r) => r.hasChanges).length;
    const historyEntry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      results,
      changesDetected
    };
    let history = [];
    try {
      const existingData = await fs.readFile(HISTORY_FILE, "utf-8");
      history = JSON.parse(existingData);
    } catch {
    }
    history.push(historyEntry);
    const thirtyDaysAgo = /* @__PURE__ */ new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    history = history.filter(
      (entry) => new Date(entry.timestamp) > thirtyDaysAgo
    );
    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log(`[Storage] Appended to history. Total entries: ${history.length}`);
  } catch (error) {
    console.error("[Storage] Failed to append to history:", error);
  }
}
let isRunning = false;
let scheduledTask = null;
async function executeScrapeJob() {
  if (isRunning) {
    console.log("[Scheduler] Job already running, skipping...");
    return {
      success: false,
      message: "Job already running",
      changesCount: 0
    };
  }
  isRunning = true;
  console.log(
    `[Scheduler] Starting scheduled scrape job at ${(/* @__PURE__ */ new Date()).toISOString()}`
  );
  try {
    const previousResults = await loadPreviousResults();
    console.log(`[Scheduler] Loaded ${previousResults.length} previous results`);
    const currentResults = await scrapeAllWebsites(
      schedulerConfig.organizations
    );
    const resultsWithChanges = detectChanges(currentResults, previousResults);
    const changesCount = resultsWithChanges.filter((r) => r.hasChanges).length;
    await saveResults(resultsWithChanges);
    await appendToHistory(resultsWithChanges);
    if (changesCount > 0) {
      console.log(`[Scheduler] 🚨 Detected ${changesCount} changes:`);
      resultsWithChanges.filter((r) => r.hasChanges).forEach((result) => {
        console.log(`  - ${result.organizationName}`);
        console.log(`    Website: ${result.website}`);
        console.log(`    Found patterns: ${result.foundPatterns.join(", ")}`);
      });
    } else {
      console.log("[Scheduler] No changes detected");
    }
    console.log("[Scheduler] Job completed successfully");
    return {
      success: true,
      message: `Scraped ${currentResults.length} websites. ${changesCount} changes detected.`,
      changesCount
    };
  } catch (error) {
    console.error("[Scheduler] Job failed:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
      changesCount: 0
    };
  } finally {
    isRunning = false;
  }
}
async function startScheduler() {
  if (!schedulerConfig.enabled) {
    console.log(
      "[Scheduler] Scheduler is disabled (NODE_ENV !== production)"
    );
    return;
  }
  if (scheduledTask) {
    console.log("[Scheduler] Scheduler already running");
    return;
  }
  await initializeStorage();
  scheduledTask = cron.schedule(
    schedulerConfig.schedule,
    () => {
      executeScrapeJob();
    },
    {
      scheduled: true,
      timezone: schedulerConfig.timezone
    }
  );
  console.log(
    `[Scheduler] ✅ Scheduler started with schedule: ${schedulerConfig.schedule}`
  );
  console.log(`[Scheduler] Timezone: ${schedulerConfig.timezone}`);
  console.log(
    `[Scheduler] Next run: ${scheduledTask.nextDate().toISO()}`
  );
  console.log("[Scheduler] Running initial scrape...");
  await executeScrapeJob();
}
async function initializeServer() {
  console.log("[Server] Initializing server components...");
  await startScheduler();
  console.log("[Server] Server initialization complete");
}
if (typeof window === "undefined") {
  initializeServer().catch((error) => {
    console.error("[Server] Failed to initialize server:", error);
  });
}
export {
  initializeServer
};
