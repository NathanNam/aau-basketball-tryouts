import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
function SchedulerDashboard() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState(null);
  const fetchStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/scheduler/status");
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error("Failed to fetch status:", error);
      setMessage("Failed to load scheduler status");
    } finally {
      setLoading(false);
    }
  };
  const triggerCheck = async () => {
    setChecking(true);
    setMessage(null);
    try {
      const response = await fetch("/api/scheduler/check");
      const data = await response.json();
      setMessage(data.success ? `✅ ${data.message}` : `❌ Check failed: ${data.message}`);
      await fetchStatus();
    } catch (error) {
      console.error("Failed to trigger check:", error);
      setMessage("❌ Failed to trigger check");
    } finally {
      setChecking(false);
    }
  };
  useState(() => {
    fetchStatus();
  });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white shadow rounded-lg p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Scheduler Dashboard" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx("button", { onClick: fetchStatus, disabled: loading, className: "px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50", children: loading ? "Loading..." : "Refresh Status" }),
          /* @__PURE__ */ jsx("button", { onClick: triggerCheck, disabled: checking, className: "px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 disabled:opacity-50", children: checking ? "Checking..." : "Run Check Now" })
        ] })
      ] }),
      message && /* @__PURE__ */ jsx("div", { className: `mb-6 p-4 rounded ${message.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: message }),
      status && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Scheduler Status" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Status" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: status.scheduler.enabled ? /* @__PURE__ */ jsx("span", { className: "text-green-600", children: "✓ Enabled" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Disabled (Dev Mode)" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Running" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: status.scheduler.running ? /* @__PURE__ */ jsx("span", { className: "text-green-600", children: "Yes" }) : /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "No" }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Schedule" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: status.scheduler.schedule }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Daily at 9 AM PT" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Next Run" }),
              /* @__PURE__ */ jsx("div", { className: "text-lg font-semibold", children: status.scheduler.nextRun || "N/A" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Total Checks" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: status.summary.totalChecks })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Last Check" }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: status.summary.lastCheck ? new Date(status.summary.lastCheck).toLocaleString() : "Never" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border rounded p-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: "Recent Changes" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-orange-600", children: status.summary.recentChanges.length })
            ] })
          ] })
        ] }),
        status.summary.recentChanges.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: "Recent Changes" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: status.summary.recentChanges.map((change) => /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-orange-500 bg-orange-50 p-4 rounded", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold text-gray-900", children: change.organizationName }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600", children: change.website }),
            change.foundPatterns.length > 0 && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 mt-2", children: [
              "Found: ",
              change.foundPatterns.join(", ")
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400 mt-1", children: [
              "Last checked: ",
              new Date(change.lastChecked).toLocaleString()
            ] })
          ] }, change.organizationName)) })
        ] })
      ] }),
      !status && !loading && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500 py-8", children: 'Click "Refresh Status" to load scheduler information' })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary hover:text-primary-600 font-medium", children: "← Back to Tryouts" }) })
  ] }) });
}
export {
  SchedulerDashboard as component
};
