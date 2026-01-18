'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Loader2, AlertCircle } from 'lucide-react'
import CourseCard from './CourseCard'

interface Course {
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

interface CourseListProps {
  oracleSlug: string
  oracleName: string
  oracleIcon?: string
}

export default function CourseList({ oracleSlug, oracleName, oracleIcon }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [oracleSlug])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/courses?oracle=${oracleSlug}`)
      
      if (!response.ok) {
        throw new Error('Erro ao carregar cursos')
      }

      const data = await response.json()
      setCourses(data.courses || [])
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-4" />
        <p className="text-gray-400">Carregando cursos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <h3 className="text-lg font-semibold text-red-400">Erro ao carregar</h3>
          </div>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchCourses}
            className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-8 max-w-md text-center">
          <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum curso disponível
          </h3>
          <p className="text-gray-400">
            Os cursos de {oracleName} ainda estão sendo preparados. Volte em breve!
          </p>
        </div>
      </div>
    )
  }

  // Separate courses by status
  const inProgressCourses = courses.filter(c => c.isStarted && !c.isCompleted)
  const completedCourses = courses.filter(c => c.isCompleted)
  const newCourses = courses.filter(c => !c.isStarted)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        {oracleIcon && <span className="text-4xl">{oracleIcon}</span>}
        <div>
          <h2 className="text-2xl font-bold text-white">Cursos de {oracleName}</h2>
          <p className="text-gray-400">
            {courses.length} {courses.length === 1 ? 'curso disponível' : 'cursos disponíveis'}
          </p>
        </div>
      </div>

      {/* In Progress */}
      {inProgressCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Em Progresso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard course={course} oracleSlug={oracleSlug} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* New Courses */}
      {newCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full" />
            Novos Cursos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard course={course} oracleSlug={oracleSlug} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Completed */}
      {completedCourses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Concluídos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard course={course} oracleSlug={oracleSlug} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
