'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, BookOpen, Clock, Award, CheckCircle2, Circle, Lock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  slug: string;
  duration: number | null;
  xpReward: number;
  order: number;
}

interface Module {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string | null;
  oracle: {
    name: string;
    icon: string | null;
  };
  modules: Module[];
}

interface UserProgress {
  progressPercent: number;
  completedAt: Date | null;
}

interface CourseClientProps {
  course: Course;
  userProgress: UserProgress | null;
  completedLessonIds: string[];
  oracleSlug: string;
}

export default function CourseClient({
  course,
  userProgress,
  completedLessonIds,
  oracleSlug,
}: CourseClientProps) {
  const router = useRouter();

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessonsCount = completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;

  const handleLessonClick = (moduleSlug: string, lessonSlug: string) => {
    router.push(`/study/${oracleSlug}/${course.slug}/${moduleSlug}/${lessonSlug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-purple-200 hover:text-white mb-4"
            onClick={() => router.push('/study')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Oráculos
          </Button>

          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">{course.oracle.icon || '🔮'}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{course.title}</h1>
              <p className="text-lg text-purple-200 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-purple-300">
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{totalLessons} lições</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{course.modules.length} módulos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur border-purple-500/30">
            <CardContent className="py-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Seu Progresso</h3>
                <span className="text-2xl font-bold text-purple-300">{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-3 mb-2" />
              <p className="text-sm text-purple-200">
                {completedLessonsCount} de {totalLessons} lições concluídas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="space-y-6">
          {course.modules.map((module, moduleIndex) => {
            const moduleLessonsCompleted = module.lessons.filter((lesson) =>
              completedLessonIds.includes(lesson.id)
            ).length;
            const moduleProgress =
              module.lessons.length > 0
                ? Math.round((moduleLessonsCompleted / module.lessons.length) * 100)
                : 0;

            return (
              <Card
                key={module.id}
                className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur border-purple-500/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white mb-2">
                        Módulo {moduleIndex + 1}: {module.title}
                      </CardTitle>
                      {module.description && (
                        <CardDescription className="text-purple-200">
                          {module.description}
                        </CardDescription>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-300 mb-1">
                        {moduleLessonsCompleted}/{module.lessons.length} lições
                      </div>
                      <div className="text-lg font-bold text-purple-300">{moduleProgress}%</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      const isLocked = lessonIndex > 0 && !completedLessonIds.includes(module.lessons[lessonIndex - 1].id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => !isLocked && handleLessonClick(module.slug, lesson.slug)}
                          disabled={isLocked}
                          className={`w-full text-left p-4 rounded-lg transition-all ${
                            isLocked
                              ? 'bg-purple-900/20 cursor-not-allowed opacity-50'
                              : 'bg-purple-800/30 hover:bg-purple-800/50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                              ) : isLocked ? (
                                <Lock className="w-6 h-6 text-purple-400" />
                              ) : (
                                <Circle className="w-6 h-6 text-purple-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-1">{lesson.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-purple-300">
                                {lesson.duration && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{lesson.duration} min</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  <span>+{lesson.xpReward} XP</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Link para Biblioteca de Cartas */}
        <Card className="mt-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur border-indigo-500/30">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">📖 Biblioteca de Cartas</h3>
                <p className="text-purple-200">
                  Explore os 78 arcanos do Tarot e seus significados profundos
                </p>
              </div>
              <Button
                onClick={() => router.push('/cards')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              >
                Explorar Cartas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
