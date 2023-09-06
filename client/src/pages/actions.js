import { redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loginAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/auth/login', data)
      queryClient.invalidateQueries()
      toast.success('Login succesfull')
      return redirect('/dashboard')
    } catch (err) {
      console.log(err?.response?.data)
      toast.error(err?.response?.data)
      return err
    }
  }

export const registerAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    await customFetch.post('/auth/register', data)
    toast.success('Registration succesfull')
    return redirect('/login')
  } catch (err) {
    toast.error(err?.response?.data)
    return err
  }
}

export const createJobAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.post('/jobs', data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job succesfully created')
      return redirect('all-jobs')
    } catch (err) {
      toast.error(err?.response?.data)
      return err
    }
  }

export const editJobAction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
      await customFetch.patch(`/jobs/${params.id}`, data)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job succesfully edited')
      return redirect('/dashboard/all-jobs')
    } catch (err) {
      toast.error(err?.response?.data)
      return err
    }
  }

export const deleteJobAction =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`)
      queryClient.invalidateQueries(['jobs'])
      toast.success('Job succesfully delete')
    } catch (err) {
      toast.error(err?.response?.data)
    }
    return redirect('/dashboard/all-jobs')
  }

export const profileAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData()
    const file = formData.get('avatar')
    if (file && file.size > 500000) {
      toast.error('Image size too big')
      return null
    }
    try {
      await customFetch.patch('/users/update-user', formData)
      queryClient.invalidateQueries(['user'])
      toast.success('Profile succesfully updated')
      return redirect('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data)
      return null
    }
  }
