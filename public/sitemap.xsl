<?xml version="1.0" encoding="UTF-8"?>
<!-- Browser-only styling for /sitemap.xml. Search engines read the raw XML and ignore this file. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="s">

  <xsl:output method="html" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap | Muthoot Gold Point</title>
        <style>
          :root {
            --bg: #0c1835;
            --bg-card: rgba(10, 19, 44, 0.85);
            --gold: #F1B933;
            --gold-light: #FCD46A;
            --gold-dark: #DAA12E;
            --text: #FFFFFF;
            --muted: #A1ADC4;
            --border: rgba(241, 185, 51, 0.3);
            --row-hover: rgba(241, 185, 51, 0.06);
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            min-height: 100vh;
            background: radial-gradient(circle at 72% 32%, #1c2648 0%, #141c44 35%, #111a41 70%), var(--bg);
            background-attachment: fixed;
            color: var(--text);
            font-family: 'Outfit', 'Montserrat', system-ui, -apple-system, 'Segoe UI', sans-serif;
            line-height: 1.5;
          }
          .wrap { max-width: 1100px; margin: 0 auto; padding: 48px 16px 64px; }
          header { margin-bottom: 32px; }
          .eyebrow {
            color: var(--gold);
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            margin: 0 0 8px;
          }
          h1 {
            margin: 0 0 12px;
            font-size: clamp(28px, 5vw, 40px);
            font-weight: 700;
            background: linear-gradient(135deg, #FCD46A 0%, #DAA12E 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .intro { color: var(--muted); margin: 0; max-width: 640px; }
          .intro a { color: var(--gold-light); }
          .stats { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
          .stat {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 12px 18px;
            min-width: 140px;
          }
          .stat b { display: block; font-size: 24px; color: var(--gold); font-variant-numeric: tabular-nums; }
          .stat span { color: var(--muted); font-size: 13px; }
          .card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(241, 185, 51, 0.08);
          }
          .scroll { overflow-x: auto; }
          table { width: 100%; border-collapse: collapse; font-size: 14px; }
          th {
            text-align: left;
            padding: 14px 18px;
            color: var(--gold);
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
          }
          td {
            padding: 12px 18px;
            border-bottom: 1px solid rgba(241, 185, 51, 0.1);
            vertical-align: middle;
          }
          tr:last-child td { border-bottom: 0; }
          tbody tr:hover { background: var(--row-hover); }
          td.num { color: var(--muted); width: 1%; font-variant-numeric: tabular-nums; }
          td.url a { color: var(--text); text-decoration: none; word-break: break-all; }
          td.url a:hover { color: var(--gold-light); text-decoration: underline; }
          td.meta { color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
          .pill {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
            border: 1px solid var(--border);
            color: var(--gold-light);
            background: rgba(241, 185, 51, 0.08);
          }
          .pill.top { background: linear-gradient(135deg, #FCD46A 0%, #DAA12E 100%); color: #0c1835; border-color: transparent; }
          footer { margin-top: 24px; color: var(--muted); font-size: 13px; text-align: center; }
          @media (max-width: 640px) {
            .wrap { padding-top: 32px; }
            th.hide-sm, td.hide-sm { display: none; }
            td, th { padding: 10px 12px; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">
          <header>
            <p class="eyebrow">Muthoot Gold Point</p>
            <h1>XML Sitemap</h1>
            <p class="intro">
              This sitemap lists every public page on the site so search engines like
              <a href="https://www.google.com" rel="noopener">Google</a> can find and index them.
            </p>
            <div class="stats">
              <div class="stat">
                <b><xsl:value-of select="count(s:urlset/s:url)"/></b>
                <span>Total URLs</span>
              </div>
              <div class="stat">
                <b><xsl:value-of select="count(s:urlset/s:url[contains(s:loc, '/blog/')])"/></b>
                <span>Blog posts</span>
              </div>
            </div>
          </header>

          <div class="card">
            <div class="scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>URL</th>
                    <th class="hide-sm">Last updated</th>
                    <th class="hide-sm">Frequency</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="s:urlset/s:url">
                    <tr>
                      <td class="num"><xsl:value-of select="position()"/></td>
                      <td class="url">
                        <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                      </td>
                      <td class="meta hide-sm">
                        <xsl:choose>
                          <xsl:when test="s:lastmod">
                            <xsl:value-of select="concat(substring(s:lastmod, 1, 10), ' ', substring(s:lastmod, 12, 5))"/>
                          </xsl:when>
                          <xsl:otherwise>—</xsl:otherwise>
                        </xsl:choose>
                      </td>
                      <td class="meta hide-sm"><xsl:value-of select="s:changefreq"/></td>
                      <td>
                        <span>
                          <xsl:attribute name="class">
                            <xsl:choose>
                              <xsl:when test="number(s:priority) &gt;= 1">pill top</xsl:when>
                              <xsl:otherwise>pill</xsl:otherwise>
                            </xsl:choose>
                          </xsl:attribute>
                          <xsl:value-of select="s:priority"/>
                        </span>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <footer>Generated automatically from the site and Strapi CMS.</footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
