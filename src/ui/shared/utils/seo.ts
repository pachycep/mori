export const seo = ({
  title,
  description,
  keywords,
  image,
  url,
  author = "모리",
  themeColor = "#4A90E2",
  twitterHandle = "@team_headbutt",
  canonical,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
  author?: string;
  themeColor?: string;
  twitterHandle?: string;
  canonical?: string;
}) => {
  const tags = [
    { title },
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: author },

    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    ...(canonical ? [{ rel: "canonical", href: canonical }] : []),

    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: twitterHandle },
    { name: "twitter:site", content: twitterHandle },

    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    ...(url ? [{ property: "og:url", content: url }] : []),

    { name: "theme-color", content: themeColor },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },

    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: image },
        ]
      : []),
  ];

  return tags;
};

export const faviconTags = () => [
  { rel: "icon", href: "public/favicon.ico" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "public/favicon-16x16.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "public/favicon-32x32.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "public/apple-icon-180x180.png",
  },
  { rel: "manifest", href: "public/manifest.json" },
];
