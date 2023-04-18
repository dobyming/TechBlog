import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import PostItem from './PostItem'

// query 요청할 예정
const POST_ITEM_DATA = {
  title: 'Post Item Title',
  date: '2023.04.18.',
  categories: ['Web', 'Frontend', 'Testing'],
  summary: '프론트엔드 개발',
  thumbnail:
    'https://velog.velcdn.com/images/damin1025/post/f11527d7-b23b-4f06-9938-e7169cfddfcd/image.jpg',
  link: 'https://www.google.co.kr/',
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`

const PostList: FunctionComponent = function () {
  return (
    <PostListWrapper>
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
    </PostListWrapper>
  )
}

export default PostList
