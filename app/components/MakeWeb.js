"use client";
import React, { useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";

/* Utility: safe className joiner */
const css = (...parts) => parts.filter(Boolean).join(" ");

const isOldiOSSafari = (() => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  return /iP(hone|od|ad)/i.test(platform) && /OS 15[_\d]*/i.test(ua);
})();

/* TrafficLight: bigger, more saturated colors for light mode; outlines to avoid washout */
const TrafficLight = ({ variant = "neutral", size = 12, activeLabel }) => {
  const map = {
    success: { active: "#059669", inactive: "#d1d5db" }, // emerald-600, gray-300
    mid: { active: "#b45309", inactive: "#d1d5db" }, // amber-700
    warn: { active: "#be185d", inactive: "#d1d5db" }, // rose-600
    neutral: { active: "#374151", inactive: "#e5e7eb" }, // gray-700 / gray-200
  };

  const colors = map[variant] || map.neutral;

  // for old Safari we use inline styles; for modern browsers we keep Tailwind classes
  const dotStyle = (active) =>
    isOldiOSSafari
      ? {
          width: size,
          height: size,
          borderRadius: "9999px",
          backgroundColor: active ? colors.active : colors.inactive,
          boxShadow: active ? "0 1px 3px rgba(0,0,0,0.15)" : undefined,
          border: active
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid rgba(0,0,0,0.04)",
        }
      : undefined;

  const commonClass = `inline-block rounded-full`;
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2"
      title={activeLabel}
    >
      <span
        style={dotStyle(variant === "success")}
        className={
          isOldiOSSafari
            ? undefined
            : `${commonClass} w-3 h-3 ${
                variant === "success" ? "bg-emerald-600" : "bg-gray-300"
              } shadow-sm`
        }
        aria-hidden
      />
      <span
        style={dotStyle(variant === "mid")}
        className={
          isOldiOSSafari
            ? undefined
            : `${commonClass} w-3 h-3 ${
                variant === "mid" ? "bg-amber-700" : "bg-gray-300"
              } shadow-sm`
        }
        aria-hidden
      />
      <span
        style={dotStyle(variant === "warn")}
        className={
          isOldiOSSafari
            ? undefined
            : `${commonClass} w-3 h-3 ${
                variant === "warn" ? "bg-rose-600" : "bg-gray-300"
              } shadow-sm`
        }
        aria-hidden
      />
    </span>
  );
};

const OptionButton = ({
  id,
  label,
  subtitle,
  selected,
  onSelect,
  variant = "neutral",
  isDarkMode,
}) => {
  // stronger light-mode classes: remove translucent whites and use solid backgrounds / stronger text
  const variantMap = {
    neutral: isDarkMode
      ? "bg-gray-800 border-gray-600 text-gray-200"
      : "bg-gray-100 border-gray-300 text-gray-900",
    success: isDarkMode
      ? "bg-emerald-900/30 text-emerald-200 border-emerald-400"
      : "bg-emerald-300 text-emerald-900 border-emerald-600",
    mid: isDarkMode
      ? "bg-amber-900/30 text-amber-200 border-amber-400"
      : "bg-amber-300 text-amber-900 border-amber-600",
    warn: isDarkMode
      ? "bg-rose-900/30 text-rose-200 border-rose-400"
      : "bg-rose-300 text-rose-900 border-rose-600",
  };

  /* Fallback styles for old Safari or inline style overrides */
  const fallbackMap = {
    neutral: {
      backgroundColor: isDarkMode ? "#111827" : "#f3f4f6", // gray-100
      borderColor: isDarkMode ? "#374151" : "#d1d5db", // gray-300
      color: isDarkMode ? "#e5e7eb" : "#111827", // text-gray-900
    },
    success: {
      backgroundColor: isDarkMode ? "rgba(4,120,87,0.18)" : "#34d399", // stronger emerald
      borderColor: "#059669",
      color: isDarkMode ? "#d1fae5" : "#065f46", // dark green text
    },
    mid: {
      backgroundColor: isDarkMode ? "rgba(120,53,15,0.18)" : "#fbbf24", // amber-400
      borderColor: "#b45309",
      color: isDarkMode ? "#fef3c7" : "#78350f", // dark amber text
    },
    warn: {
      backgroundColor: isDarkMode ? "rgba(153,27,39,0.18)" : "#f43f5e", // rose-500
      borderColor: "#be185d",
      color: isDarkMode ? "#fecdd3" : "#831843", // dark rose text
    },
  };

  const selectedClasses =
    "ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 shadow-lg";

  const baseClasses = css(
    "relative w-full text-left p-3 rounded-xl border transition-all duration-150 flex flex-col gap-1",
    selected
      ? "ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 shadow-lg"
      : "hover:shadow-sm",
    variantMap[variant]
  );

  const styleFallback = isOldiOSSafari ? fallbackMap[variant] : undefined;

  return (
    <button
      id={id}
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect(id);
        }
      }}
      className={baseClasses}
      style={styleFallback}
    >
      <span className="font-semibold leading-tight capitalize text-sm">
        {label}
      </span>
      {subtitle && <small className="text-xs opacity-90">{subtitle}</small>}
      {selected && (
        <span
          className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs"
          style={
            isOldiOSSafari
              ? {
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                }
              : {}
          }
        >
          ✓
        </span>
      )}
    </button>
  );
};

const MakeWeb = () => {
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [delivery, setDelivery] = useState("");

  const theme = typeof useTheme === "function" ? useTheme() : undefined;
  const isDarkMode = theme?.isDarkMode ?? false;

  const PROJECTS = useMemo(
    () => ({
      website: {
        label: "Website",
        base: 145,
        hint: "Marketing or business site",
      },
      reactnative: {
        label: "React Native",
        base: 270,
        hint: "Cross-platform mobile app",
      },
      ecommerce: {
        label: "E-commerce",
        base: 215,
        hint: "Online store with product pages",
      },
      portfolio: { label: "Portfolio", base: 70, hint: "Simple personal site" },
      api: { label: "API + Backend", base: 125, hint: "Server / API work" },
    }),
    []
  );

  const BUDGET_OPTIONS = [
    {
      value: "low",
      label: "Low",
      add: 0,
      variant: "success",
      hint: "Cost-conscious",
    },
    {
      value: "medium",
      label: "Medium",
      add: 50,
      variant: "mid",
      hint: "Good balance",
    },
    {
      value: "high",
      label: "High",
      add: 100,
      variant: "warn",
      hint: "Premium expectations",
    },
  ];

  const DELIVERY_OPTIONS = [
    { value: "normal", label: "Normal", add: 0, hint: "7–10 days" },
    { value: "fast", label: "Fast", add: 75, hint: "3–5 days" },
    { value: "superfast", label: "Super Fast", add: 150, hint: "24–48 hrs" },
  ];

  const priceBreakdown = useMemo(() => {
    const project = PROJECTS[projectType];
    if (!project)
      return { total: 0, base: 0, budgetAdd: 0, deliveryAdd: 0, valid: false };
    const base = Number.isFinite(project.base) ? project.base : 0;
    const budgetObj = BUDGET_OPTIONS.find((b) => b.value === budget);
    const deliveryObj = DELIVERY_OPTIONS.find((d) => d.value === delivery);
    const budgetAdd = budgetObj ? Math.max(0, Number(budgetObj.add || 0)) : 0;
    const deliveryAdd = deliveryObj
      ? Math.max(0, Number(deliveryObj.add || 0))
      : 0;
    let total = base + budgetAdd + deliveryAdd;
    total = Math.max(0, Math.round(total));
    return {
      total,
      base,
      budgetAdd,
      deliveryAdd,
      valid: true,
      budgetLabel: budgetObj ? budgetObj.label : null,
      deliveryLabel: deliveryObj ? deliveryObj.label : null,
    };
  }, [projectType, budget, delivery, PROJECTS]);

  const resetAll = () => {
    setProjectType("");
    setBudget("");
    setDelivery("");
  };

  const currency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const priceStatus = useMemo(() => {
    if (!priceBreakdown.valid) return { label: "—", variant: "neutral" };
    const base = priceBreakdown.base || 1;
    const p = priceBreakdown.total;
    const greenLimit = base * 1.4;
    const yellowLimit = base * 1.8;
    if (p <= greenLimit)
      return { label: "Budget-Friendly", variant: "success" };
    if (p <= yellowLimit) return { label: "Mid-Range", variant: "mid" };
    return { label: "Premium", variant: "warn" };
  }, [priceBreakdown]);

  // stronger fallback gradient for old Safari (keeps contrast high)
  const asideFallbackBg =
    isOldiOSSafari && priceBreakdown.valid
      ? priceStatus.variant === "success"
        ? { background: "linear-gradient(135deg,#059669,#047857)" }
        : priceStatus.variant === "mid"
        ? { background: "linear-gradient(135deg,#b45309,#d97706)" }
        : { background: "linear-gradient(135deg,#be185d,#fb7185)" }
      : undefined;

  return (
    <section
      aria-labelledby="make-project-title"
      className={css(
        "max-w-4xl mx-auto mt-16 p-5 sm:p-8",
        isDarkMode ? "text-gray-100" : "text-gray-900"
      )}
    >
      <header className="text-center mb-6">
        <h1
          id="make-project-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
        >
          Make Your Project Budget
        </h1>
        <p
          className="mt-2 max-w-2xl mx-auto text-sm"
          style={{ color: isDarkMode ? undefined : "#374151" }}
        >
          Pick your project type, budget tier and delivery speed to get an
          instant, transparent estimate — including a clear price breakdown.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div
          className={css(
            "lg:col-span-2 border rounded-2xl p-5 space-y-6 shadow-sm",
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          )}
        >
          <fieldset className="space-y-3" aria-label="Project type">
            <legend
              className={css(
                "text-sm uppercase font-medium",
                isDarkMode ? "text-white" : "text-gray-700"
              )}
            >
              Project Type
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(PROJECTS).map(([key, { label, hint }]) => (
                <OptionButton
                  key={key}
                  id={key}
                  label={label}
                  subtitle={hint}
                  selected={projectType === key}
                  onSelect={(id) => setProjectType(id)}
                  variant="neutral"
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend
              className={css(
                "text-sm uppercase font-medium",
                isDarkMode ? "text-white" : "text-gray-700"
              )}
            >
              Budget Range
            </legend>
            <div className="grid grid-cols-3 gap-3">
              {BUDGET_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  id={opt.value}
                  label={opt.label}
                  subtitle={opt.hint}
                  selected={budget === opt.value}
                  onSelect={(id) => setBudget(id)}
                  variant={opt.variant}
                  isDarkMode={isDarkMode}
                  // Force stronger light mode colors
                  lightModeOverride={
                    {
                      success: {
                        bg: "bg-emerald-300",
                        text: "text-emerald-900",
                      },
                      mid: { bg: "bg-amber-300", text: "text-amber-900" },
                      warn: { bg: "bg-rose-300", text: "text-rose-900" },
                      neutral: { bg: "bg-gray-200", text: "text-gray-900" },
                    }[opt.variant]
                  }
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend
              className={css(
                "text-sm uppercase font-medium",
                isDarkMode ? "text-white" : "text-gray-700"
              )}
            >
              Delivery Time
            </legend>
            <div className="grid grid-cols-3 gap-3">
              {DELIVERY_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  id={opt.value}
                  label={opt.label}
                  subtitle={opt.hint}
                  selected={delivery === opt.value}
                  onSelect={(id) => setDelivery(id)}
                  variant="neutral"
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex items-center justify-between gap-3 mt-2">
            <button
              type="button"
              onClick={resetAll}
              className="py-2 px-4 rounded-md border text-sm bg-transparent hover:bg-gray-100 transition"
            >
              Reset
            </button>
          </div>
        </div>

        <aside
          className={css(
            "rounded-2xl p-5 shadow-xl flex flex-col gap-4 justify-between",
            priceBreakdown.valid
              ? priceStatus.variant === "success"
                ? "bg-gradient-to-br from-emerald-600 to-emerald-500 text-white"
                : priceStatus.variant === "mid"
                ? "bg-gradient-to-br from-amber-600 to-amber-500 text-white"
                : "bg-gradient-to-br from-rose-600 to-rose-500 text-white"
              : isDarkMode
              ? "bg-gray-900 text-gray-100"
              : "bg-white text-gray-900"
          )}
          aria-live="polite"
          style={asideFallbackBg}
        >
          <div>
            <h2 className="text-lg font-bold">Estimated Price</h2>

            {!priceBreakdown.valid ? (
              <p className="mt-2 text-sm">
                Select a project type to see an estimate.
              </p>
            ) : (
              <>
                <p className="mt-3 text-3xl font-extrabold">
                  {currency.format(priceBreakdown.total)}
                </p>

                <div className="mt-4 bg-white/10 rounded-lg p-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: isDarkMode ? undefined : "#ffffff" }}>
                      Base ({PROJECTS[projectType]?.label})
                    </span>
                    <span>{currency.format(priceBreakdown.base)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span style={{ color: isDarkMode ? undefined : "#ffffff" }}>
                      Budget adjustment
                    </span>
                    <span>{currency.format(priceBreakdown.budgetAdd)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span style={{ color: isDarkMode ? undefined : "#ffffff" }}>
                      Delivery adjustment
                    </span>
                    <span>{currency.format(priceBreakdown.deliveryAdd)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="font-medium">Status</span>
                <TrafficLight
                  variant={priceStatus.variant}
                  activeLabel={priceStatus.label}
                />
              </div>

              <span
                className={css(
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase"
                )}
                style={
                  isOldiOSSafari
                    ? {
                        backgroundColor: "rgba(255,255,255,0.18)",
                        color: isDarkMode ? "#fff" : "#000",
                      }
                    : undefined
                }
              >
                {priceStatus.label}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  window?.open?.("/Contact", "_blank");
                }}
                disabled={!priceBreakdown.valid}
                className={css(
                  "flex-1 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition",
                  priceBreakdown.valid
                    ? "bg-white text-black hover:opacity-95"
                    : "bg-white/30 text-white/60 cursor-not-allowed"
                )}
              >
                Get a Quote
              </button>

              <button
                type="button"
                onClick={() => {
                  const parts = [];
                  if (projectType) parts.push(PROJECTS[projectType].label);
                  if (budget) parts.push(`Budget: ${budget}`);
                  if (delivery) parts.push(`Delivery: ${delivery}`);
                  parts.push(
                    `Estimate: ${currency.format(priceBreakdown.total)}`
                  );
                  const text = `Project Estimate — ${parts.join(" • ")}`;
                  navigator?.clipboard?.writeText?.(text);
                  alert("Estimate copied to clipboard!");
                }}
                className="py-2 px-3 rounded-md border bg-transparent text-sm"
                disabled={!priceBreakdown.valid}
              >
                Copy Estimate
              </button>
            </div>
          </div>
        </aside>
      </main>

      <footer className="mt-4 text-center text-xs opacity-80">
        * This is only an estimate — final pricing depends on precise feature
        list, integrations and scope. For a firm quote, contact us with feature
        details.
      </footer>
    </section>
  );
};

export default MakeWeb;
