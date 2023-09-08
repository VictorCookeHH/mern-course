/* eslint-disable react/prop-types */
const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  placeholder,
  onChange,
  required = true,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        placeholder={placeholder || ''}
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default FormRow
