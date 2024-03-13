import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ReportButton } from './ReportStyles'
import { ActionButton, CommentInput, CommentInputContainer } from '../Quote/QuoteStyles'
import { addReport } from '../../redux/reducers/reportReducer'

export default function ReportForm({reporterId, reportedId, type, setLoading}) {
  const dispatch = useDispatch()
  const reportInputRef = useRef(null)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [visibility, setVisibility] = useState(false)
  const [report, setReport] = useState()
  const toggleInputVisibility = () => {
    const button = reportInputRef.current
    if (button) {
      const { offsetTop, offsetLeft, offsetHeight } = button
      setButtonPosition({top: offsetTop + offsetHeight, left: offsetLeft})
      setVisibility(prevState => !prevState)
    }
  }
  const handleAddReport = () => {
    if (!reporterId) return alert('You need to login to do this action')
    dispatch(addReport({text: report, reporterId, reportedId, type}))
    setReport('')
    setLoading(false)
  }

  return (
    <>
      <ReportButton ref={reportInputRef}  onClick={() => toggleInputVisibility()}>Report</ReportButton>
      {visibility && (
        <CommentInputContainer top={buttonPosition.top} left={buttonPosition.left}>
          <CommentInput type='text' placeholder='Add Report...' value={report} onChange={e => setReport(e.target.value)} />
          <ActionButton onClick={() => handleAddReport()}>Submit</ActionButton>
        </CommentInputContainer>
      )}
    </>
  )
}
