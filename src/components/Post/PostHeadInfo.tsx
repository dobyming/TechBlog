import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import Introduction from 'components/Main/Introduction'

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`

const Title = styled.h1`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const PostDate = styled.p`
  padding-top: 20px;
  text-align: right;
  font-size: 12px;
  font-style: italic;
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
}) {
  return (
    <PostHeadInfoWrapper>
      <Introduction />
      <Title>{title}</Title>
      <PostDate>{date}</PostDate>
    </PostHeadInfoWrapper>
  )
}

export default PostHeadInfo
