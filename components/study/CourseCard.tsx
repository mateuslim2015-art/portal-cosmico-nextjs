'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, TrendingUp, CheckCircle2, Lock } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
  course: {
    id: string
    title: string
    slug: string
    description: string
    imageUrl?: string
    duration?: string
    level: string
    totalModules: number
    totalLessons: number
    completedLessons: number
    progress: number
    isStarted: boolean
    isCompleted: boolean
  }
  oracleSlug: string
}

const levelColors = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
}

export default function CourseCard({ course, oracleSlug }: CourseCardProps) {
  return (
    <Link href={`/study/${oracleSlug}/${course.slug}`}>
      <motion.div
        className="group relative bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl border border-purple-500/30 overflow-hidden hover:border-purple-400/50 transition-all duration-300"
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

        {/* Progress Bar */}
        {course.isStarted && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-900/50">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        )}

        {/* Image */}
        {course.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                {course.title}
              </h3>
            </div>

            {/* Status Badge */}
            {course.isCompleted ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-xs font-medium text-green-400">Completo</span>
              </div>
            ) : course.isStarted ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-blue-400">{course.progress}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-full">
                <Lock className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-purple-400">Novo</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-2">
            {course.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {/* Level */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                levelColors[course.level as keyof typeof levelColors]
              }`}
            >
              <span className="font-medium">
                {levelLabels[course.level as keyof typeof levelLabels]}
              </span>
            </div>

            {/* Duration */}
            {course.duration && (
              <div className="flex items-center gap-1.5 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            )}

            {/* Lessons */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <BookOpen className="w-4 h-4" />
              <span>
                {course.completedLessons}/{course.totalLessons} lições
              </span>
            </div>
          </div>

          {/* Progress Details */}
          {course.isStarted && !course.isCompleted && (
            <div className="pt-3 border-t border-purple-500/20">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{course.totalModules} módulos</span>
                <span>
                  {course.totalLessons - course.completedLessons} lições restantes
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
