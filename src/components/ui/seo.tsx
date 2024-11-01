import { BASE_URL } from "@/constant/env";
import Head from "next/head";
import { useRouter } from "next/router";

const defaultMeta = {
  title: "The Islander Shop",
  siteName: "The Islander Shop",
  description:
    "The Islander Shop offers a curated selection of coastal-inspired clothing and accesorries that captures the relaxed, breezy vibe of island living.",
  url: BASE_URL,
  type: "website",
  robots: "follow, index",
  image: `${BASE_URL}/assets/logo.png`,
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  isBanner?: boolean;
  banner?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta["title"] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content={meta.robots} />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta name="image" property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.date && (
        <>
          <meta property="article:published_time" content={meta.date} />
          <meta
            name="publish_date"
            property="og:publish_date"
            content={meta.date}
          />
        </>
      )}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-config"
        content="/favicon/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: Array<Favicons> = [
  {
    rel: "android-chrome",
    sizes: "192x192",
    href: "/favicon/android-chrome-192x192.png",
  },
  {
    rel: "android-chrome",
    sizes: "512x512",
    href: "/favicon/android-chrome-512x512.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "60x60",
    href: "/favicon/apple-touch-icon.png",
  },
  {
    rel: "mstile",
    type: "image/png",
    sizes: "150x150",
    href: "/favicon/mstile-150x150.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/favicon/site.webmanifest",
  },
];
