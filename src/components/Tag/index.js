import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TagButton } from './TagStyles'

export default function Tag({ userId, tag, handleFollowTag }) {
  const followTags = useSelector(state => state.follow).tags
  const [hover, setHover] = useState({state: false, value: 'Follow'})
  const checkFollowing = () => {
    return followTags.some(entry => entry.follower === userId && entry.following === tag);
  }

  const handleHover = (state) => {
    setHover({state, value: checkFollowing() ? 'UnFollow' : 'Follow'})
  }

  const handleAction = async () => {
    if (!userId) return alert('You need to login to do this action')
    await handleFollowTag(userId, tag);
    handleHover(true);
  };

  return (
    <TagButton
      onClick={handleAction}
      onMouseOver={() => handleHover(true)}
      onMouseLeave={() => setHover(false)}
      following={checkFollowing()}
    >
      {hover.state ? hover.value : tag}
    </TagButton>
  )
}
