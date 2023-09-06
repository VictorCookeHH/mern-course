import { useNavigation } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const SubmitBtn = ({ formBtn, text = 'submit' }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const submittingText = text === 'submit' ? 'submitting' : 'logging'
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && 'form-btn'}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? submittingText : text}
    </button>
  )
}

export default SubmitBtn
