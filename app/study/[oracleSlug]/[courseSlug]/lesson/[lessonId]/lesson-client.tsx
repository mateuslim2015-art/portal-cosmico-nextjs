'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Exercise {
  id: string
  title: string
  description: string | null
  type: string
  difficulty: string
  xpReward: number
  crystalReward: number
}

interface Lesson {
  id: string
  title: string
  slug: string
  content: string
  duration: number | null
  xpReward: number
  order: number
  module: {
    id: string
    title: string
    slug: string
    course: {
      id: string
      title: string
      slug: string
      oracle: {
        id: string
        name: string
        slug: string
        icon: string | null
      }
    }
  }
  exercises: Exercise[]
}

interface UserProgress {
  completed: boolean
  completedAt: Date | null
}

interface PreviousNextLesson {
  id: string
  title: string
  slug: string
  order: number
}

interface LessonClientProps {
  lesson: Lesson
  userProgress: UserProgress | null
  previousLesson: PreviousNextLesson | null
  nextLesson: PreviousNextLesson | null
  oracleSlug: string
  courseSlug: string
  userId: string
}

export default function LessonClient({
  lesson,
  userProgress,
  previousLesson,
  nextLesson,
  oracleSlug,
  courseSlug,
  userId,
}: LessonClientProps) {
  const router = useRouter()
  const [isCompleting, setIsCompleting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(userProgress?.completed || false)

  const handleCompleteLesson = async () => {
    if (isCompleted || isCompleting) return

    try {
      setIsCompleting(true)

      const response = await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonId: lesson.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao marcar lição como completa')
      }

      const data = await response.json()
      setIsCompleted(true)

      // Show success message (you can add a toast notification here)
      console.log('Lição completa!', data)
    } catch (error) {
      console.error('Error completing lesson:', error)
      alert('Erro ao marcar lição como completa. Tente novamente.')
    } finally {
      setIsCompleting(false)
    }
  }

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/study/${oracleSlug}/${courseSlug}/lesson/${nextLesson.id}`)
    } else {
      router.push(`/study/${oracleSlug}/${courseSlug}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-lg border-b border-purple-500/30">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link
              href={`/study/${oracleSlug}/${courseSlug}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Voltar ao Curso</span>
            </Link>

            {/* Course Info */}
            <div className="flex items-center gap-3 text-sm">
              {lesson.module.course.oracle.icon && (
                <span className="text-2xl">{lesson.module.course.oracle.icon}</span>
              )}
              <div className="hidden md:block text-right">
                <p className="text-gray-400">{lesson.module.course.title}</p>
                <p className="text-purple-400 font-medium">{lesson.module.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Lesson Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white">{lesson.title}</h1>
            {isCompleted && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-400">Completa</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            {lesson.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration} minutos</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>+{lesson.xpReward} XP</span>
            </div>
            {lesson.exercises.length > 0 && (
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{lesson.exercises.length} exercícios</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30 p-8 mb-8"
        >
          <div className="prose prose-invert prose-purple max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Exercícios Práticos</h2>
            <div className="grid gap-4">
              {lesson.exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/practice/${exercise.id}`}
                  className="block bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-xl border border-purple-500/30 p-6 hover:border-purple-400/50 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                        {exercise.title}
                      </h3>
                      {exercise.description && (
                        <p className="text-gray-400 text-sm mb-3">{exercise.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400">
                          {exercise.difficulty}
                        </span>
                        <span>+{exercise.xpReward} XP</span>
                        <span>+{exercise.crystalReward} 💎</span>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Complete Button */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-8"
          >
            <button
              onClick={handleCompleteLesson}
              disabled={isCompleting}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 transition-all disabled:cursor-not-allowed"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Marcando como completa...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Marcar como Completa</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center justify-between gap-4"
        >
          {previousLesson ? (
            <Link
              href={`/study/${oracleSlug}/${courseSlug}/lesson/${previousLesson.id}`}
              className="flex items-center gap-2 px-6 py-3 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 rounded-xl text-white transition-all group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-gray-400">Anterior</p>
                <p className="font-medium">{previousLesson.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={handleNextLesson}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white transition-all group"
            >
              <div className="text-right">
                <p className="text-xs text-purple-200">Próxima</p>
                <p className="font-medium">{nextLesson.title}</p>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link
              href={`/study/${oracleSlug}/${courseSlug}`}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white transition-all group"
            >
              <span className="font-medium">Voltar ao Curso</span>
              <CheckCircle2 className="w-5 h-5" />
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  )
}
