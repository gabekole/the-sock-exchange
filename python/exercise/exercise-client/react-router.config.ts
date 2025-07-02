import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  ssr: false,
  async prerender() {
    return ["/"];
  },
} satisfies Config;
