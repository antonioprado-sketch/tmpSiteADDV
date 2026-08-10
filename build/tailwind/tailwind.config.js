const path = require("path");

module.exports = {
  content: [path.join(__dirname, "..", "..", "*.html")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#7c839b", "surface-bright": "#f7f9fb", "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e0e3e5", "on-primary-fixed": "#131b2e", "error-container": "#ffdad6",
        "background": "#f7f9fb", "inverse-surface": "#2d3133", "surface-tint": "#565e74",
        "secondary-fixed-dim": "#adc6ff", "surface-variant": "#e0e3e5", "on-surface": "#191c1e",
        "tertiary-fixed": "#d3e4fe", "on-primary-fixed-variant": "#3f465c", "primary": "#03285B",
        "outline": "#76777d", "on-tertiary": "#ffffff", "on-error-container": "#93000a",
        "surface": "#f7f9fb", "tertiary-container": "#0b1c30", "on-secondary-container": "#fefcff",
        "on-error": "#ffffff", "on-tertiary-fixed": "#0b1c30", "surface-dim": "#d8dadc",
        "primary-container": "#131b2e", "surface-container-low": "#f2f4f6", "on-tertiary-fixed-variant": "#38485d",
        "on-secondary": "#ffffff", "on-background": "#191c1e", "on-primary": "#ffffff",
        "on-secondary-fixed": "#001a42", "secondary": "#0058be", "on-surface-variant": "#45464d",
        "on-tertiary-container": "#75859d", "inverse-primary": "#bec6e0", "on-secondary-fixed-variant": "#004395",
        "inverse-on-surface": "#eff1f3", "tertiary": "#03285B", "surface-container-high": "#e6e8ea",
        "surface-container": "#eceef0", "tertiary-fixed-dim": "#b7c8e1", "error": "#ba1a1a",
        "primary-fixed-dim": "#bec6e0", "primary-fixed": "#dae2fd", "outline-variant": "#c6c6cd",
        "secondary-container": "#2170e4", "secondary-fixed": "#d8e2ff"
      },
      borderRadius: { DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem" },
      spacing: {
        "margin-desktop": "48px", base: "4px", xs: "4px", sm: "8px", lg: "24px",
        gutter: "24px", xl: "32px", md: "16px", "margin-mobile": "16px"
      },
      fontFamily: {
        "headline-lg": ["Lato"], "headline-xl": ["Lato"], "label-sm": ["Lato"], "headline-md": ["Lato"],
        "headline-lg-mobile": ["Lato"], "label-md": ["Lato"], "body-lg": ["Lato"], "body-sm": ["Lato"], "body-md": ["Lato"]
      },
      fontSize: {
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-sm": ["12px", { lineHeight: "14px", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "label-md": ["14px", { lineHeight: "16px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }]
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
