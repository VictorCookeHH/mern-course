import Job from '../models/JobModel.js'
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import day from 'dayjs'

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query
  const queryObject = {}
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ]
  }
  if (jobStatus && jobStatus !== 'all') queryObject.jobStatus = jobStatus

  if (jobType && jobType !== 'all') queryObject.jobType = jobType

  if (req.user.role !== 'admin') queryObject.createdBy = req.user.id
  let jobs

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  }
  const sortKey = sortOptions[sort] || sortOptions['newest']

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit)
  const totalJobs = await Job.count(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res
    .status(StatusCodes.OK)
    .send({ totalJobs, numOfPages, currentPage: page, jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.id
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).send(job)
}

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id)
  res.status(StatusCodes.OK).send(job)
}

export const editJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).send(updatedJob)
}

export const deleteJob = async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.NO_CONTENT).send()
}

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY')
      return { date, count }
    })
    .reverse()
  res.status(StatusCodes.OK).send({ stats: defaultStats, monthlyApplications })
}
