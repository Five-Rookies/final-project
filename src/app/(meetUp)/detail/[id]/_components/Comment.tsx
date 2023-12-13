'use client'

import React, { useState, Dispatch, SetStateAction, useRef } from 'react'
import formatRelativeDate from '@/utils/relativeDate'
import {
  deleteComments,
  updateComments,
  getComments,
} from '@/utils/apiRequest/commentsApiRequest'
import Image from 'next/image'
import santa from '@public/assets/profile-santa.svg'
import snowman from '@public/assets/profile-snowman.svg'
import candle from '@public/assets/profile-candle.svg'
import cookie from '@public/assets/profile-cookie.svg'
import likeIcon from '@public/assets/like.svg'
import IComment from '@/type/SupabaseResponse'
import Comments from '@/type/SupabaseResponse'
import styles from '../detail.module.scss'

interface CommentProps {
  comment: Comments
  getVideoId: string
  setComments: Dispatch<SetStateAction<IComment[]>>
  fetchComments: () => Promise<void>
}

const Comment = ({
  comment,
  getVideoId,
  setComments,
  fetchComments,
}: CommentProps) => {
  const [isDotMenuVisible, setIsDotMenuVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(comment.comment_content)
  const profiles = [santa, snowman, candle, cookie]

  const handleDotMenu = () => {
    setIsDotMenuVisible(!isDotMenuVisible)

    // dotMenu에 5초 이상 이벤트가 없으면 다시 닫힘
    if (!isDotMenuVisible) {
      setTimeout(() => {
        setIsDotMenuVisible(false)
      }, 5000)
    }
  }

  const handleInputChage = (e: any) => {
    setInputValue(e?.target?.value)
  }

  const handleEditButton = () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    setIsEditing(true)
  }

  const handleEditCancle = (text: string) => {
    setInputValue(text)
    setIsEditing(!isEditing)
  }

  const renderUpdatedComment = async () => {
    let totalComments = await getComments(getVideoId)
    if (!totalComments) {
      totalComments = []
    }
    setComments(totalComments)
  }

  const handleEditCompleteButton = async () => {
    const text = inputValue
    const { like_num, id } = comment
    await updateComments(text, like_num, id)
    setIsEditing(false)
    await renderUpdatedComment()
    await fetchComments()
  }

  const handleDeleteButton = async () => {
    setIsDotMenuVisible(!isDotMenuVisible)
    deleteComments(comment.id)
    await fetchComments()
    await renderUpdatedComment()
  }

  const handleLike = async (text: string) => {
    const { like_num, id } = comment
    await updateComments(text, like_num + 1, id)
    await renderUpdatedComment()
  }

  return (
    <div className={styles.commentContainer}>
      <Image src={profiles[comment.profile_img]} alt="프로필 이미지" />
      <div className={styles.commentDetail}>
        <p className={styles.userInfo}>
          {comment.user_name}
          <span>&nbsp;· {formatRelativeDate(comment.created_at)}</span>
        </p>
        {isEditing ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              className={styles.text}
              value={inputValue}
              onChange={handleInputChage}
            />
            <button
              className={styles.save_btn}
              onClick={handleEditCompleteButton}
            >
              저장
            </button>
            <button
              className={styles.cancle_btn}
              onClick={() => handleEditCancle(comment.comment_content)}
            >
              취소
            </button>
          </div>
        ) : (
          <p className={styles.text}>{comment.comment_content}</p>
        )}
        <button onClick={() => handleLike(comment.comment_content)}>
          <Image src={likeIcon} alt="좋아요" />
          <span>&nbsp;{comment.like_num}</span>
        </button>
      </div>
      <p
        className={
          isDotMenuVisible
            ? `${styles.moreBtn} ${styles.active}`
            : styles.moreBtn
        }
        onClick={handleDotMenu}
      >
        ⋮
      </p>
      {isDotMenuVisible && (
        <div className={styles.dotMenu}>
          <button onClick={() => handleEditButton()}>수정</button>
          <button onClick={() => handleDeleteButton()}>삭제</button>
        </div>
      )}
    </div>
  )
}
export default Comment
