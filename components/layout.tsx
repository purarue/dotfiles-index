import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { config, siteTitle } from "../config";
import React, { FunctionComponent } from "react";

type LayoutProps = {
  children: any[];
  home?: boolean;
};

const Layout: FunctionComponent<LayoutProps> = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="{siteTitle}" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        <p className={utilStyles.header}>
          <div className={utilStyles.closeHeader}>
            <div>
              {!home && (
                <span className={styles.backToHome}>
                  <Link href="/">
                    <a className={styles.backToHomeButton}>/</a>
                  </Link>
                </span>
              )}
              {siteTitle}
            </div>
            <div className={styles.externalicon}>
              <a href={config.externalGitDir}>🗗</a>
            </div>
          </div>
        </p>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to index</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
