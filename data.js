/* ==========================================================================
   1º A — CENTRAL DA TURMA
   Fonte única de dados: eventos, provas e trabalhos.

   EDITE AQUI PARA ADICIONAR OU ALTERAR EVENTOS.
   Basta acrescentar/editar um objeto no array EVENTS abaixo.

   Campos de cada evento:
   - id            identificador único (sem espaços)
   - title         nome exibido
   - date          data de início "AAAA-MM-DD"
   - endDate       (opcional) data final, quando o evento ocupa 2 dias
   - icon          nome de um ícone definido em icons.js
                    ("calendar" | "exam" | "users" | "target" | "book" |
                     "cap" | "flask" | "flag")
   - category      categorias usadas nos filtros, separadas por espaço:
                    "provas" | "trabalhos" | "eventos" | "lembretes" | "estudos"
   - priority      "urgente" | "importante" | "lembrete" | "informacao" | "concluido"
   - showInExamList  true para aparecer na seção "Próximas avaliações"
========================================================================== */

const EVENTS = [
  {
    id: "feriado-independencia",
    title: "Feriado — Independência do Brasil",
    date: "2026-09-07",
    icon: "flag",
    category: "eventos",
    priority: "informacao",
    showInExamList: false
  },
  {
    id: "simulado",
    title: "Simulado",
    date: "2026-09-10",
    icon: "exam",
    category: "provas",
    priority: "importante",
    showInExamList: true
  },
  {
    id: "sociologia",
    title: "Apresentação de Sociologia",
    date: "2026-09-10",
    icon: "users",
    category: "trabalhos",
    priority: "importante",
    showInExamList: false
  },
  {
    id: "prova-global",
    title: "Prova Global",
    date: "2026-09-24",
    endDate: "2026-09-25",
    icon: "book",
    category: "provas",
    priority: "importante",
    showInExamList: true
  },
  {
    id: "provao-paulista",
    title: "Provão Paulista — 1º Ano",
    date: "2026-11-12",
    endDate: "2026-11-13",
    icon: "cap",
    category: "provas",
    priority: "urgente",
    showInExamList: true
  }
];

/* ==========================================================================
   EDITE AQUI: LINK OFICIAL DA ETEC
   Quando o link oficial de inscrições/informações for divulgado,
   substitua o valor abaixo (mantenha as aspas) e o botão passará
   a abrir o endereço diretamente em vez de mostrar o aviso.
   Exemplo: const ETEC_LINK = "https://www.vestibularetec.com.br/";
========================================================================== */
const ETEC_LINK = "";

/* ==========================================================================
   EDITE AQUI: LINKS DE CURSINHOS E PLATAFORMAS PARA O ENEM
   Preencha o campo "url" de cada item quando o link estiver definido.
   Enquanto url estiver vazio (""), o card mostra "em breve".
========================================================================== */
const ENEM_LINKS = [
  { label: "Curso ENEM 1", url: "" },
  { label: "Curso ENEM 2", url: "" },
  { label: "Curso gratuito", url: "" },
  { label: "Plataforma de exercícios", url: "" }
];

/* ==========================================================================
   EDITE AQUI: MATERIAIS DE PREPARAÇÃO PARA A ETEC
   Preencha "url" quando houver material/cursinho recomendado para a matéria.
========================================================================== */
const ETEC_PREP = [
  { label: "Matemática", url: "" },
  { label: "Português", url: "" },
  { label: "Ciências", url: "" },
  { label: "História", url: "" },
  { label: "Geografia", url: "" },
  { label: "Exercícios", url: "" },
  { label: "Provas anteriores", url: "" }
];

/* ==========================================================================
   EDITE AQUI: CÓDIGO DA TURMA NO GOOGLE SALA DE AULA
========================================================================== */
const CLASSROOM = {
  subject: "Química",
  code: "ltnm2mjn",
  url: "https://classroom.google.com/"
};
