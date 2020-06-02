import Link from "next/link";
import Head from "next/head";

import { config, siteTitle } from "../config";
import utilStyles from "../styles/utils.module.css";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{siteTitle} - 404</title>
      </Head>
      <div className={utilStyles.flexcenter}>
        <h1>404 - Page Not Found</h1>

        <h2>
          <Link href="/">
            <a>← Back to index</a>
          </Link>
        </h2>
      </div>
    </>
  );
}
