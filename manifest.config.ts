import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

const icons = {
  "16": "icons/16.png",
  "24": "icons/24.png",
  "32": "icons/32.png",
  "128": "icons/128.png",
};

export default defineManifest(async () => ({
  manifest_version: 3,
  name: "YouBoost",
  version: `${major}.${minor}.${patch}`,
  // semver is OK in "version_name"
  version_name: version,
  description: "A browser extension to enhance and customize your YouTube experience",
  permissions: ["storage"],
  icons,
  action: {
    default_title: "YouBoost - Boost Your YouTube Experience",
    default_popup: "index.html",
    default_icon: icons,
  },
  content_scripts: [
    {
      matches: ["*://www.youtube.com/*"],
      js: ["src/inject.ts"],
      run_at: "document_start",
    },
  ],
}));
