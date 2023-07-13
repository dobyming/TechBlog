import React, { FunctionComponent, ReactNode } from 'react'
import { Helmet } from 'react-helmet'

type ResumeProps = {
  title: string
  description: string
  children: ReactNode
}

const ResumeTemplate: FunctionComponent<ResumeProps> = function ({
  title,
  description,
  children,
}) {
  return (
    <>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <html lang="ko" />
      </Helmet>
      {children}
    </>
  )
}

export default ResumeTemplate
