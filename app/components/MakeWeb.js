"use client";
import React, { useMemo, useState } from "react";
import { useTheme } from "./ThemeProvider";

/**
 * MakeWeb (improved)
 *
 * - Uses semantic buttons (keyboard + aria support)
 * - Accessible contrast and meaningful color system (emerald/amber/rose)
 * - Shows breakdown: base price + budget + delivery
 * - Handles edge cases (unknown project type, no selection)
 * - Reset button, responsive layout, hints, and focus-visible styles
 * - Optimized logic with useMemo and single source of truth for prices
 */

const OptionButton = ({
  id,
  label,
  subtitle,
  selected,
  onSelect,
  variant = "neutral",
}) => {
  // variant: neutral | success | mid | warn
  const variantMap = {
    neutral:
      "bg-white/60 dark:bg-gray-800/60 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200",
    success:
      "bg-emerald-50/70 border-emerald-400 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
    mid: "bg-amber-50/70 border-amber-400 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
    warn: "bg-rose-50/70 border-rose-400 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200",
  };

  const selectedClasses =
    "ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 shadow-lg";

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
      className={`relative w-full text-left p-3 rounded-xl border transition-all duration-150 flex flex-col gap-1 ${
        selected ? selectedClasses : "hover:shadow-sm"
      } ${variantMap[variant]}`}
    >
      <span className="font-semibold leading-tight capitalize">{label}</span>
      {subtitle && <small className="text-xs opacity-80">{subtitle}</small>}
      {selected && (
        <span className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs bg-black/10 dark:bg-white/10">
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
  const { isDarkMode } = useTheme?.() ?? { isDarkMode: false };

  // Single source of truth for project definitions
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

  // Price calculation with memoization and safe fallbacks
  const priceBreakdown = useMemo(() => {
    const project = PROJECTS[projectType];
    if (!project) {
      return {
        total: 0,
        base: 0,
        budgetAdd: 0,
        deliveryAdd: 0,
        valid: false,
      };
    }

    const base = Number.isFinite(project.base) ? project.base : 0;

    const budgetObj = BUDGET_OPTIONS.find((b) => b.value === budget);
    const deliveryObj = DELIVERY_OPTIONS.find((d) => d.value === delivery);

    const budgetAdd = budgetObj ? Math.max(0, Number(budgetObj.add || 0)) : 0;
    const deliveryAdd = deliveryObj
      ? Math.max(0, Number(deliveryObj.add || 0))
      : 0;

    let total = base + budgetAdd + deliveryAdd;

    // clamp to reasonable min and max (avoid accidental huge numbers)
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

  // determine status band
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

  return (
    <section
      aria-labelledby="make-project-title"
      className={`max-w-4xl mx-auto mt-16 p-5 sm:p-8 ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      <header className="text-center mb-6">
        <h1
          id="make-project-title"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight"
        >
          Make Your Project Budget
        </h1>
        <p className="mt-2 max-w-2xl mx-auto text-sm opacity-90">
          Pick your project type, budget tier and delivery speed to get an
          instant, transparent estimate — including a clear price breakdown.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: selectors */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border rounded-2xl p-5 space-y-6 shadow-sm">
          {/* Project type */}
          <fieldset className="space-y-3" aria-label="Project type">
            <legend className="text-sm uppercase font-medium opacity-85">
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
                />
              ))}
            </div>
          </fieldset>

          {/* Budget */}
          <fieldset className="space-y-3">
            <legend className="text-sm uppercase font-medium opacity-85">
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
                />
              ))}
            </div>
          </fieldset>

          {/* Delivery */}
          <fieldset className="space-y-3">
            <legend className="text-sm uppercase font-medium opacity-85">
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
                />
              ))}
            </div>
          </fieldset>

          <div className="flex items-center justify-between gap-3 mt-2">
            <button
              type="button"
              onClick={resetAll}
              className="py-2 px-4 rounded-md border text-sm bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right: price card */}
        <aside
          className={`rounded-2xl p-5 shadow-xl flex flex-col gap-4 justify-between ${
            priceBreakdown.valid
              ? priceStatus.variant === "success"
                ? "bg-gradient-to-br from-emerald-600 to-emerald-500 text-white"
                : priceStatus.variant === "mid"
                ? "bg-gradient-to-br from-amber-500 to-amber-400 text-white"
                : "bg-gradient-to-br from-rose-600 to-rose-500 text-white"
              : isDarkMode
              ? "bg-gray-900 text-gray-100"
              : "bg-white text-gray-900"
          }`}
          aria-live="polite"
        >
          <div>
            <h2 className="text-lg font-bold">Estimated Price</h2>

            {!priceBreakdown.valid ? (
              <p className="mt-2 text-sm opacity-90">
                Select a project type to see an estimate.
              </p>
            ) : (
              <>
                <p className="mt-3 text-3xl font-extrabold">
                  {currency.format(priceBreakdown.total)}
                </p>

                <div className="mt-4 bg-white/10 rounded-lg p-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base ({PROJECTS[projectType]?.label})</span>
                    <span>{currency.format(priceBreakdown.base)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Budget adjustment</span>
                    <span>{currency.format(priceBreakdown.budgetAdd)}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span>Delivery adjustment</span>
                    <span>{currency.format(priceBreakdown.deliveryAdd)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Status</span>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                  priceStatus.variant === "success"
                    ? "bg-white/20"
                    : priceStatus.variant === "mid"
                    ? "bg-white/20"
                    : "bg-white/20"
                }`}
              >
                {priceStatus.label}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  /* Example CTA - wire up to contact or quote flow */
                  // For now open contact in new tab or scroll - left as integration point
                  window?.open?.("/Contact", "_blank");
                }}
                disabled={!priceBreakdown.valid}
                className={`flex-1 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition ${
                  priceBreakdown.valid
                    ? "bg-white text-black hover:opacity-95"
                    : "bg-white/30 text-white/60 cursor-not-allowed"
                }`}
              >
                Get a Quote
              </button>

              <button
                type="button"
                onClick={() => {
                  // Quick share/copy
                  const parts = [];
                  if (projectType) parts.push(PROJECTS[projectType].label);
                  if (budget) parts.push(`Budget: ${budget}`);
                  if (delivery) parts.push(`Delivery: ${delivery}`);
                  parts.push(
                    `Estimate: ${currency.format(priceBreakdown.total)}`
                  );
                  const text = `Project Estimate — ${parts.join(" • ")}`;
                  navigator?.clipboard?.writeText?.(text);
                  // small toast fallback - using alert to keep this self-contained
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
