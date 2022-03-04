const Range = ({ id, name, label, min, max, value, onChange }) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={id} className='form-label'>{label}</label>
      <div className='flex'>
        <input
          name={name}
          type='range'
          min={min}
          max={max}
          className='w-full h-6 p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none mr-2'
          id={id}
          value={value}
          onChange={onChange}
        />
        <div className='bg-slate-600 text-white min-w-7 w-7 h-6 text-xs flex justify-center items-center rounded-sm'>{value}</div>
      </div>
    </div>
  )
}

export default Range
