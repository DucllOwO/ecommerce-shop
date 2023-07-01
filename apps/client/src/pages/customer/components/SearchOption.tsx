import { Image, Space, Typography } from 'antd'
import React, { FC, MouseEventHandler } from 'react'

type SearchOptionProps = {
  imgSrc: string,
  name: string
}

const SearchOption: FC<SearchOptionProps> = ({ imgSrc, name }) => {
  return (
    <Space direction='horizontal' >
      <Image src={imgSrc} alt='product-search-image' width={50} height={70} preview={false} />
      <Typography.Text>{name}</Typography.Text>
    </Space>
  )
}

export default SearchOption