const Input = ({ id, name, label, value, onChange }) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='form-label'>{label}</label>
      <input
        name={name}
        type='number'
        value={value}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
        id={id}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
