import fs from "fs";
import path from "path";
import glob from "glob";
import { config } from "../config";

const homeDirectory = process.cwd();
const publicDir = path.join(homeDirectory, "public");
const rawDir = path.join(publicDir, "raw");

interface pathInfo {
  slug: string;
  urlslug: string; // to remove conflicts if the name of the file is the same
  path: string;
  content: string;
  language: string;
}

export const allPaths = readConfig();

// either a file or a directory
// doesn't search for directories recursively
function findFiles(strpath: string): string[] {
  if (!fs.existsSync(strpath)) {
    throw new Error(`Error: ${strpath} doesn't exist.`);
  }
  const stat = fs.lstatSync(strpath);
  if (stat.isFile()) {
    // return file on its own
    return [strpath];
  } else if (stat.isDirectory()) {
    // return anything in the child directory,
    // if its a file
    return glob.sync(`${strpath}/*`).filter((p) => fs.lstatSync(p).isFile());
  } else {
    throw new Error(`Error: '${strpath}' is not a file or directory.`);
  }
}

function pathToSlug(strpath: string): string {
  return path.basename(strpath);
}

function readFile(strpath: string): pathInfo {
  const slug = pathToSlug(strpath);
  const fileContents = fs.readFileSync(strpath, {
    encoding: "utf8",
    flag: "r",
  });
  const language = "bash";
  return {
    language: language,
    content: fileContents,
    slug: slug,
    // default to slug here, resolve conflicts later
    urlslug: slug,
    path: strpath,
  };
}

function splitPath(path: string): string[] {
  return path
    .split("/")
    .filter((a) => a.trim().length > 0) // filter out empy strings
    .slice(0, -1); // remove the last item (the current urlslug)
}

// fixes any slugs so that files with the same name
// can appear more than once
function resolveDuplicates(paths: pathInfo[]): pathInfo[] {
  let slugSet = new Set();
  for (let i: number = 0; i < paths.length; ++i) {
    const cPath = paths[i];
    // successively add rightmost path items
    const cPathParts = splitPath(cPath.path);
    while (slugSet.has(cPath.urlslug)) {
      // replace urlslug to stop urlslug conflict
      cPath.urlslug = `${cPathParts.pop()}_${cPath.urlslug}`;
    }
    slugSet.add(cPath.urlslug);
  }
  return paths;
}

// 'main' function
// reads config from disk and cleans it up into pathInfo objects
export function readConfig(): pathInfo[] {
  const paths = config.pathsToServe
    .map(findFiles)
    .reduce((fileArr1, fileArr2) => fileArr1.concat(fileArr2))
    .map(readFile)
    .sort((a, b) => (a.path > b.path ? 1 : -1));
  return resolveDuplicates(paths);
  // return paths;
}

// gets all slugs, used for generating a list
// of unique slugs to use for getStaticPaths
export function getAllSlugs(): string[] {
  return allPaths.map((p) => p.urlslug);
}

// gets path information for a slug
// called from routing functions in blob/raw
export function getPathInfo(urlslug: string): pathInfo {
  return allPaths.find((s) => s.urlslug == urlslug);
}
