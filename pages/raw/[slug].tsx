import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { getPathInfo, getAllSlugs } from "../../lib/pathInfo";
import { config } from "../../config";
const escape = require("escape-html");

export default function Path({ pathData }) {
  const divStyle = {
    width: "100%",
    paddingLeft: "1rem",
  };
  return (
    <>
      <Head>
        <title>
          {config.name}'s dotfiles - raw - {pathData.slug}'
        </title>
      </Head>
      <div style={divStyle}>
        <pre
          className={utilStyles.code}
          dangerouslySetInnerHTML={{ __html: escape(pathData.content) }}
        ></pre>
      </div>
    </>
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
