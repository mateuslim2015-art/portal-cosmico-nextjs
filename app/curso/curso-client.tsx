"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cursoTarot, recursosExtras } from "@/lib/curso-tarot";
import { BookOpen, Clock, CheckCircle, Sparkles, Lightbulb, Star, Award } from "lucide-react";
import Link from "next/link";

export default function CursoClient() {
  const [moduloAtual, setModuloAtual] = useState<string | null>(null);
  const [licoesCompletadas, setLicoesCompletadas] = useState<Set<string>>(new Set());

  const marcarLicaoCompleta = (licaoId: string) => {
    setLicoesCompletadas(prev => {
      const novo = new Set(prev);
      if (novo.has(licaoId)) {
        novo.delete(licaoId);
      } else {
        novo.add(licaoId);
      }
      return novo;
    });
  };

  const moduloSelecionado = moduloAtual 
    ? cursoTarot.find(m => m.id === moduloAtual)
    : null;

  const totalLicoes = cursoTarot.reduce((acc, modulo) => acc + modulo.licoes.length, 0);
  const progresso = Math.round((licoesCompletadas.size / totalLicoes) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-purple-200 hover:text-white mb-4">
              ← Voltar ao Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Mini Curso de Tarot</h1>
              <p className="text-purple-200 text-lg">Do iniciante ao praticante confiante</p>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="bg-gradient-to-br from-purple-800/50 to-blue-800/50 border-purple-500/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Seu Progresso</span>
                <span className="text-yellow-400 font-bold">{progresso}%</span>
              </div>
              <div className="w-full bg-purple-900/50 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <p className="text-purple-200 text-sm mt-2">
                {licoesCompletadas.size} de {totalLicoes} lições completadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vista de Módulos ou Lições */}
        {!moduloSelecionado ? (
          // Lista de Módulos
          <div className="grid md:grid-cols-2 gap-6">
            {cursoTarot.map((modulo, index) => {
              const licoesDoModulo = modulo.licoes.map(l => l.id);
              const completadas = licoesDoModulo.filter(id => licoesCompletadas.has(id)).length;
              const percentual = Math.round((completadas / licoesDoModulo.length) * 100);

              return (
                <Card
                  key={modulo.id}
                  className="bg-gradient-to-br from-purple-800/60 to-indigo-800/60 border-purple-500/40 hover:border-yellow-400/60 transition-all cursor-pointer group"
                  onClick={() => setModuloAtual(modulo.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge className="bg-yellow-600 text-white mb-2">
                        Módulo {index + 1}
                      </Badge>
                      <Clock className="w-5 h-5 text-purple-300" />
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-yellow-400 transition-colors">
                      {modulo.titulo}
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      {modulo.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-purple-200">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{modulo.duracao}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-200">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm">{modulo.licoes.length} lições</span>
                      </div>
                      
                      {/* Progress do Módulo */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-300">Progresso</span>
                          <span className="text-yellow-400 font-medium">{percentual}%</span>
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentual}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          // Vista de Lições do Módulo
          <div>
            <Button
              variant="ghost"
              className="text-purple-200 hover:text-white mb-6"
              onClick={() => setModuloAtual(null)}
            >
              ← Voltar aos Módulos
            </Button>

            <Card className="bg-gradient-to-br from-purple-800/60 to-indigo-800/60 border-purple-500/40 mb-6">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                  {moduloSelecionado.titulo}
                </CardTitle>
                <CardDescription className="text-purple-100 text-lg">
                  {moduloSelecionado.descricao}
                </CardDescription>
              </CardHeader>
            </Card>

            <Accordion type="single" collapsible className="space-y-4">
              {moduloSelecionado.licoes.map((licao, index) => {
                const completa = licoesCompletadas.has(licao.id);
                
                return (
                  <AccordionItem
                    key={licao.id}
                    value={licao.id}
                    className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-lg px-6 data-[state=open]:border-yellow-400/50"
                  >
                    <AccordionTrigger className="text-white hover:text-yellow-400 text-left hover:no-underline">
                      <div className="flex items-center gap-4 w-full">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          completa 
                            ? 'bg-green-600' 
                            : 'bg-purple-700'
                        }`}>
                          {completa ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <span className="text-white font-bold">{index + 1}</span>
                          )}
                        </div>
                        <span className="flex-1 text-lg">{licao.titulo}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-purple-100 mt-4">
                      <div className="space-y-6">
                        {/* Conteúdo */}
                        <div className="prose prose-invert max-w-none">
                          <div 
                            className="whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: licao.conteudo.replace(/\*\*(.*?)\*\*/g, '<strong class="text-yellow-400">$1</strong>') }}
                          />
                        </div>

                        {/* Pontos Principais */}
                        <Card className="bg-blue-900/40 border-blue-500/30">
                          <CardHeader>
                            <CardTitle className="text-xl text-white flex items-center gap-2">
                              <Star className="w-5 h-5 text-yellow-400" />
                              Pontos Principais
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {licao.pontosPrincipais.map((ponto, i) => (
                                <li key={i} className="flex items-start gap-2 text-purple-100">
                                  <span className="text-yellow-400 mt-1">•</span>
                                  <span>{ponto}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Exercício */}
                        {licao.exercicio && (
                          <Card className="bg-purple-900/40 border-purple-500/30">
                            <CardHeader>
                              <CardTitle className="text-xl text-white flex items-center gap-2">
                                <Lightbulb className="w-5 h-5 text-yellow-400" />
                                Exercício Prático
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-purple-100">{licao.exercicio}</p>
                            </CardContent>
                          </Card>
                        )}

                        {/* Botão Completar */}
                        <Button
                          onClick={() => marcarLicaoCompleta(licao.id)}
                          className={`w-full ${
                            completa
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
                          } text-white`}
                        >
                          {completa ? (
                            <>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Lição Completada
                            </>
                          ) : (
                            <>
                              <Award className="w-5 h-5 mr-2" />
                              Marcar como Concluída
                            </>
                          )}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        {/* Recursos Extras */}
        {!moduloSelecionado && (
          <Card className="mt-8 bg-gradient-to-br from-yellow-900/40 to-orange-900/40 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Dicas e Recursos Extras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">📚 Dicas de Estudo</h3>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    {recursosExtras.dicas.slice(0, 4).map((dica, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-yellow-400">•</span>
                        <span>{dica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">🔮 Símbolos Importantes</h3>
                  <ul className="space-y-2 text-purple-100 text-sm">
                    {Object.entries(recursosExtras.simbolosImportantes).slice(0, 4).map(([simbolo, significado], i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-yellow-400 font-bold">{simbolo}:</span>
                        <span>{significado}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
