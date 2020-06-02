const pathModule = require("path");

import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout";
import { allPaths, getPathInfo } from "../lib/pathInfo";
import { trimPrefix } from "../lib/utils";
import { siteTitle } from "../config";
import utilStyles from "../styles/utils.module.css";

export default function Home({ allPaths }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <ul className={utilStyles.list}>
        {allPaths.map(({ slug, path, content, urlslug, language }) => (
          <li className={utilStyles.listItem} key={slug}>
            <Link href="/blob/[slug]" as={`/blob/${urlslug}`}>
              <a>
                {pathModule.dirname(trimPrefix(path))}/
                <span className={utilStyles.list_basename}>
                  {pathModule.basename(trimPrefix(path))}
                </span>
              </a>
            </Link>
            <br />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: { allPaths },
  };
}
