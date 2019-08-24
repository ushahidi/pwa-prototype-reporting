import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
const defaultDescription = 'A standalone report submission tool for Ushahidi deployments.'
const defaultOGURL = ''
const defaultOGImage = 'https://www.ushahidi.com//uploads/about-images/ushahidi-stamp.png'

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="manifest" href="/static/manifest.json" />
    <meta name="theme-color" content="#fcfdff"/>
    <link rel="icon" sizes="192x192" href="/static/favicon/favicon-16x16.png" />
    <link rel="apple-touch-icon" href="/static/favicon/favicon-96x96.png" />
    <link rel="mask-icon" href="/static/favicon-mask.svg" color="#fcfdff" />
    <link rel="icon" href="/static/favicon.ico" />
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={props.title || ''} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
