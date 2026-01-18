import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const lesson1Content = `# História do Tarot: Uma Jornada Através dos Séculos

## As Origens Misteriosas

O Tarot é um sistema de cartas com origens envoltas em mistério e fascínio, que remontam ao século XV na Europa. Embora muitos acreditem que o Tarot tenha raízes no Egito Antigo ou na Cabala judaica, os primeiros registros históricos concretos mostram que as cartas surgiram na Itália renascentista como um jogo de cartas chamado **"Tarocchi"**.

As primeiras cartas de Tarot conhecidas datam de 1440, criadas para a família **Visconti-Sforza** em Milão. Essas cartas eram ricamente decoradas com folhas de ouro e usadas principalmente como entretenimento pela nobreza italiana. Cada carta era uma obra de arte, pintada à mão por artistas renomados da época, representando não apenas símbolos místicos, mas também o poder e a riqueza das famílias aristocráticas.

## A Transformação Esotérica

Foi apenas no século XVIII que o Tarot começou a ser associado ao ocultismo e à adivinhação. O francês **Antoine Court de Gébelin** foi um dos primeiros a sugerir que as cartas continham sabedoria esotérica egípcia. Em sua obra "Le Monde Primitif" (1781), ele propôs que o Tarot era um livro sagrado do antigo Egito, preservado através das cartas.

Essa teoria, embora historicamente questionável, despertou um interesse imenso no Tarot como ferramenta espiritual. Ocultistas, místicos e estudiosos começaram a explorar as conexões entre o Tarot e outras tradições esotéricas, como a **Cabala**, a **Astrologia**, a **Numerologia** e a **Alquimia**.

## O Tarot Moderno e o Rider-Waite

No século XX, **Arthur Edward Waite** e **Pamela Colman Smith** criaram o famoso **Tarot Rider-Waite** (1909), que se tornou o padrão para a maioria dos baralhos modernos. Este deck introduziu imagens simbólicas ricas em todos os 78 arcanos, incluindo os Arcanos Menores, que anteriormente eram representados apenas por símbolos de naipes.

O Rider-Waite revolucionou o Tarot ao torná-lo mais acessível e intuitivo. Cada carta passou a contar uma história visual, permitindo que mesmo iniciantes pudessem interpretar os significados através das imagens. Waite incorporou profundo simbolismo esotérico, baseado em seus estudos da **Ordem Hermética da Aurora Dourada** (Golden Dawn), uma sociedade secreta dedicada ao estudo do ocultismo.

## O Tarot de Marselha

Paralelamente ao Rider-Waite, o **Tarot de Marselha** manteve-se como uma das tradições mais antigas e respeitadas. Originário da França no século XVII, este baralho preserva um estilo mais tradicional e simbólico, com cores vibrantes e imagens arquetípicas que remetem às origens medievais do Tarot.

O Tarot de Marselha é considerado por muitos como o "Tarot puro", mantendo conexões diretas com as tradições esotéricas europeias. Suas imagens são menos detalhadas que o Rider-Waite, exigindo maior intuição e conhecimento simbólico do leitor.

## A Estrutura Sagrada das 78 Cartas

O Tarot é composto por **78 cartas**, divididas em dois grupos principais:

### 22 Arcanos Maiores - A Jornada da Alma

Os Arcanos Maiores representam as grandes lições e arquétipos da jornada humana. Numerados de 0 (O Louco) a 21 (O Mundo), eles contam a história da evolução espiritual, desde a inocência até a iluminação. Cada carta é um portal para compreender aspectos profundos da psique humana e do caminho espiritual.

Na tradição esotérica, os 22 Arcanos Maiores correspondem às **22 letras do alfabeto hebraico** e aos **22 caminhos da Árvore da Vida** na Cabala. Esta conexão revela a profundidade simbólica e espiritual do Tarot como um mapa da consciência.

### 56 Arcanos Menores - As Situações Cotidianas

Os Arcanos Menores representam as experiências do dia a dia, divididos em quatro naipes que correspondem aos quatro elementos da natureza:

- **Paus (Fogo)** - Representam ação, paixão, criatividade, vontade e energia vital.
- **Copas (Água)** - Simbolizam emoções, relacionamentos, intuição e sentimentos.
- **Espadas (Ar)** - Representam pensamento, comunicação, conflito e desafios mentais.
- **Ouros (Terra)** - Simbolizam materialidade, recursos, trabalho e manifestação física.

## O Tarot na Atualidade

Hoje, o Tarot é usado mundialmente como ferramenta de autoconhecimento, meditação e orientação espiritual. Não se trata de "prever o futuro" no sentido determinista, mas sim de compreender energias presentes e possibilidades futuras baseadas nas escolhas atuais.

Psicólogos como **Carl Jung** reconheceram o valor do Tarot como ferramenta para acessar o **inconsciente coletivo** e os **arquétipos universais**. Jung via as cartas como espelhos da psique, capazes de revelar aspectos ocultos da personalidade e do caminho de individuação.

## A Sabedoria Atemporal

O Tarot sobreviveu através dos séculos porque toca em algo universal e atemporal: a jornada humana em busca de significado, propósito e autoconhecimento. Cada carta é um espelho da alma, refletindo aspectos de nós mesmos que muitas vezes permanecem ocultos na consciência cotidiana.

---

**Próxima Lição:** Estrutura das 78 Cartas  
**Tempo de Leitura:** 15 minutos  
**XP ao Concluir:** +50 XP
`

async function main() {
  console.log('🔮 Atualizando lições...')
  
  await prisma.lesson.update({
    where: { id: 'cmhcnfvkr000fp2nmk5gggmm6' },
    data: { content: lesson1Content }
  })
  
  console.log('✅ Lições atualizadas!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
