import React from 'react'
import Link from 'next/link'
import styles from './search.module.scss'

const NoResult = () => {
  return (
    <div className={styles.NoResult}>
      <div>
        <p className={styles.tag}>No Results</p>
        <h1>검색 결과가 없습니다</h1>
        <p className={styles.tryAnotherKeword}>다른 키워드를 입력해 보세요!</p>
        <img src="/assets/no-results.png" alt="" />
        <Link href="/">홈으로 돌아가기</Link>
      </div>
    </div>
  )
}

export default NoResult
