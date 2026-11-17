# Passione Tattoo Studio

Site e sistema de agendamento para um estúdio de tatuagem de Canoas/RS. O cliente conhece os tatuadores, conversa
com um **agente de atendimento automatizado** para pedir o agendamento, e o estúdio acompanha cada pedido num
**painel interno** com login.

Projeto desenvolvido em equipe na disciplina de **Integração Web** do curso de Ciência da Computação da
Universidade La Salle.

<!-- Coloque aqui um print da página inicial, ex.: ![Página inicial](docs/home.png) -->

## Funcionalidades

**Site do estúdio**
- Página inicial com a identidade visual do Passione (caveira rosa, fonte Ortland e fundo texturizado)
- Apresentação dos tatuadores, com estilos e Instagram de cada um
- Seção "Sobre", endereço e contato direto pelo WhatsApp
- Layout responsivo, com menu próprio para celular

**Chat de agendamento**
- Conversa com um agente automatizado que coleta os dados do pedido: nome, telefone, tatuador desejado e se o
  cliente já tem a arte pronta
- Indicador de "digitando", horário e status de envio das mensagens

**Área do estúdio**
- Login com token
- Rota protegida por guarda (`AuthGuard`): só quem está logado acessa o painel
- Painel com todas as solicitações e o status de cada uma: *Aguardando contato*, *Contato realizado* e
  *Atendimento finalizado*, com botão para atualizar o status

## Tecnologias

| Parte | Ferramentas |
| --- | --- |
| Front-end | Angular 19, TypeScript, Tailwind CSS 4, RxJS, HttpClient |
| Back-end | Python, API REST organizada em camadas (controller, service e model), autenticação e agente de atendimento |
| Testes | Jasmine e Karma (front-end) |
| API | Coleção do Postman em `infra/` |

## Estrutura

```
├── frontend/                 Aplicação Angular
│   └── src/app/
│       ├── home/             Página inicial do estúdio
│       ├── components/
│       │   ├── chat/         Chat de agendamento
│       │   ├── login/        Login da área do estúdio
│       │   └── status/       Painel de status dos atendimentos
│       ├── guards/           AuthGuard
│       ├── services/         Comunicação com a API (auth, chat, contatos)
│       └── interfaces/
├── backend/                  API em Python
│   ├── controller/           Rotas: autenticação, chat e contatos
│   ├── service/              Regras de negócio
│   ├── model/                Modelos (usuário, contato, interação do chat)
│   ├── agent/                Agente de atendimento do chat
│   ├── auth.py, database.py, main.py
│   └── requirements.txt
└── infra/
    └── Passione.postman_collection.json
```

## Como rodar

### Pré-requisitos
- Node.js 18.19 ou mais recente
- Python 3 <!-- confirme a versão usada pela equipe -->

### Back-end

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate    |    Linux/Mac: source .venv/bin/activate
pip install -r requirements.txt
```

Copie `backend/.env.example` para `backend/.env` e preencha as variáveis.

Depois inicie a API:

```bash
# CONFIRME o comando usado pela equipe (por exemplo: python main.py  ou  uvicorn main:app --reload)
```

### Front-end

```bash
cd frontend
npm install
npm start
```

Abra **http://localhost:4200**.

| Rota | Página |
| --- | --- |
| `/home` | Site do estúdio |
| `/chat` | Chat de agendamento |
| `/login` | Login da área do estúdio |
| `/status` | Painel de atendimentos (precisa de login) |

> A página inicial funciona sozinha. O chat e o login precisam da API rodando.

### Testar a API
Importe `infra/Passione.postman_collection.json` no Postman para ver e testar as rotas.

## Equipe

<!-- Liste os integrantes e o que cada um fez, com link do GitHub. Exemplo:
- Luan Vieira: front-end (Angular) e redesign visual ([@luuanvieira](https://github.com/luuanvieira))
- Nome: back-end e agente de atendimento ([@usuario](https://github.com/usuario))
-->

---

Projeto acadêmico. A marca Passione, as fotos e os textos pertencem ao estúdio e foram usados com a finalidade
deste trabalho.
