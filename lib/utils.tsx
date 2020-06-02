import { config } from "../config";

export function trimPrefix(path: string) {
  if (path.startsWith(config.removePrefix)) {
    return path.substr(config.removePrefix.length);
  } else {
    return path;
  }
}
