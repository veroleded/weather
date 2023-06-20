import { useFormik } from 'formik';
import React from 'react'

interface Props {
  value: string
}

const Input = (props: Props) => {
  const formik = useFormik({
    initialValues: {...props},
    onSubmit: () => {

    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="text" value={formik.values.value} onChange={formik.handleChange} className='input'/>  
    </form>
  )
}

export default Input;