import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TagsContainer, TagsBlock } from './TagsStyles';
import { ActionButton } from '../Quote/QuoteStyles';
import { CommentInput } from '../Quote/QuoteStyles';
import { addTag, deleteTag } from '../../redux/reducers/tagsReducer';

export default function Tags() {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags);
  const [newTag, setNewTag] = useState()

  const handleTagRemove = (deletedTag) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) dispatch(deleteTag({ deletedTag }))
  }

  const handleTagAdd = () => {
    dispatch(addTag({ newTag }))
  }

  return (
    <TagsContainer>
      <TagsBlock>
        <CommentInput type='text' placeholder='Add a comment...' value={newTag} onChange={e => setNewTag(e.target.value)} />
        <ActionButton onClick={() => handleTagAdd()}>Submit</ActionButton>
      </TagsBlock>
      <div>
        {tags.map((tag, index) => (
          <div key={index}>
              {tag}
            <ActionButton onClick={() => handleTagRemove(tag)}>X</ActionButton>
          </div>
        ))}
      </div>
    </TagsContainer>
  );
}
