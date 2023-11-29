'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import formatRelativeDate from '@/utils/relativeDate'
import { IYoutubeItem } from '@/type/Api'
import useYoutubeDataRequest from '@/hooks/useYoutubeApiRequest'
import styles from '../page.module.scss'
import NoResult from './NoResult'

const Search = (): React.ReactElement => {
  const searchParams = useSearchParams()
  const search = searchParams.get('info')
  const [filteredItems, setFilteredItems] = useState<IYoutubeItem[]>([])
  const currentSearchResult = useYoutubeDataRequest(
    'search',
    `&q=${search}`,
    25,
  )

  const handleSearch = async () => {
    if (!search) return
    const filtered: IYoutubeItem[] = currentSearchResult!.items.filter(
      (el: IYoutubeItem): boolean => {
        return el.snippet.title.includes(search || '')
      },
    )
    setFilteredItems(filtered || [])
  }
  useEffect(() => {
    if (currentSearchResult) {
      handleSearch()
    }
  }, [search, currentSearchResult])

  return (
    <>
      {filteredItems.length ? (
        <div className="inner-box">
          <ul className={styles.videoList}>
            {filteredItems.map((video: IYoutubeItem) => {
              const VIDEO = video.snippet
              return (
                <li className={styles.videoCard} key={video.id.videoId}>
                  <Link
                    className={styles.videoLink}
                    href={{
                      pathname: `/detail/${video.id.videoId}`,
                    }}
                  >
                    <div>
                      <img
                        className={styles.videoImage}
                        src={VIDEO.thumbnails.medium.url}
                        width={300}
                      />
                    </div>
                    <div className={styles.title}>
                      <h4>{VIDEO.title}</h4>
                    </div>
                  </Link>
                  <Link
                    className={styles.videoLink}
                    href={{
                      pathname: `/detail/${video.id.videoId}`,
                    }}
                  >
                    <div className={styles.channelTitle}>
                      <span>{VIDEO.channelTitle}</span>
                    </div>
                  </Link>
                  <div className={styles.publishedAt}>
                    <span>{formatRelativeDate(VIDEO.publishedAt)}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <NoResult />
      )}
    </>
  )
}

export default Search
