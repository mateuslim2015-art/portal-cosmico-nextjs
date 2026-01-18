'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Award } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface NextLesson {
  id: string;
  title: string;
  slug: string;
  order: number;
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string;
  duration: number | null;
  xpReward: number;
  module: {
    title: string;
    slug: string;
    course: {
      title: string;
      slug: string;
      oracle: {
        name: string;
        icon: string | null;
      };
    };
  };
}

interface LessonProgress {
  completed: boolean;
  completedAt: Date | null;
  xpEarned: number;
}

interface LessonClientProps {
  lesson: Lesson;
  lessonProgress: LessonProgress | null;
  nextLesson: NextLesson | null;
  oracleSlug: string;
  courseSlug: string;
  moduleSlug: string;
}

export default function LessonClient({
  lesson,
  lessonProgress,
  nextLesson,
  oracleSlug,
  courseSlug,
  moduleSlug,
}: LessonClientProps) {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(lessonProgress?.completed || false);

  const handleCompleteLesson = async () => {
    if (isCompleted) return;

    setIsCompleting(true);
    try {
      const response = await fetch('/api/lessons/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id }),
      });

      if (response.ok) {
        setIsCompleted(true);
        // Recarregar a página para atualizar o progresso
        router.refresh();
      } else {
        alert('Erro ao marcar lição como concluída');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao marcar lição como concluída');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      router.push(`/study/${oracleSlug}/${courseSlug}/${moduleSlug}/${nextLesson.slug}`);
    } else {
      router.push(`/study/${oracleSlug}/${courseSlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-purple-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="text-purple-200 hover:text-white mb-4"
            onClick={() => router.push(`/study/${oracleSlug}/${courseSlug}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Curso
          </Button>

          <div className="flex items-center gap-2 text-sm text-purple-300 mb-4">
            <span>{lesson.module.course.oracle.icon || '🔮'}</span>
            <span>{lesson.module.course.title}</span>
            <span>→</span>
            <span>{lesson.module.title}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{lesson.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-purple-300">
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
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Concluída</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur border-purple-500/30 mb-8">
          <CardContent className="py-8">
            <div className="prose prose-invert prose-purple max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold text-white mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-bold text-white mt-6 mb-3" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-purple-100 mb-4 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside text-purple-100 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal list-inside text-purple-100 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => <li className="text-purple-100" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-purple-500 pl-4 italic text-purple-200 my-4"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-white" {...props} />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="border-purple-500/30 my-8" {...props} />
                  ),
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {!isCompleted ? (
            <Button
              onClick={handleCompleteLesson}
              disabled={isCompleting}
              className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {isCompleting ? 'Marcando...' : `Marcar como Concluída (+${lesson.xpReward} XP)`}
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-green-400 font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Lição Concluída! +{lesson.xpReward} XP</span>
            </div>
          )}

          {nextLesson && (
            <Button
              onClick={handleNextLesson}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-lg"
            >
              Próxima Lição
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          {!nextLesson && isCompleted && (
            <Button
              onClick={() => router.push(`/study/${oracleSlug}/${courseSlug}`)}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-lg"
            >
              Voltar ao Curso
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
