import path from "path";

import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";

import { config } from "../../config";
import utilStyles from "../../styles/utils.module.css";
import { getPathInfo, getAllSlugs } from "../../lib/pathInfo";
import { trimPrefix } from "../../lib/utils";

const escape = require("escape-html");

export default function Path({ pathData }) {
  return (
    <Layout>
      <Head>
        <title>
          {config.name}'s dotfiles - {pathData.slug}'
        </title>
      </Head>
      <h2 className={utilStyles.heading}>{path.basename(pathData.path)}</h2>
      <p className={utilStyles.splitHeader}>
        <span className={utilStyles.lightTextheading}>
          {trimPrefix(pathData.path)}
        </span>
        <Link href="../raw/[slug]" as={`/raw/${pathData.urlslug}`}>
          <a>Raw</a>
        </Link>
      </p>
      <div className={utilStyles.codewrap}>
        <pre className={utilStyles.code}>
          <code
            dangerouslySetInnerHTML={{
              __html: escape(pathData.content),
            }}
          ></code>
        </pre>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllSlugs().map((slug) => {
    return {
      params: {
        slug: slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pathData = getPathInfo(params.slug);
  return {
    props: {
      pathData,
    },
  };
}
