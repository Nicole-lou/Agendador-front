# Agendador-front

✨ Agenda Dourada - Interface Web (Front-end)
Em andamento
Interface web moderna e responsiva do sistema **Agenda Dourada**, desenvolvida com **HTML5, CSS3, JavaScript puro (ES6+)** e **Bootstrap 5**. O sistema conta com autenticação via **Firebase** e agendamento dinâmico integrado à API Spring Boot.

---

## 🎨 Identidade Visual e Experiência do Usuário (UX)

- **Paleta de Cores:** Dourado (`#D4AF37` / `#B8972E`) e tons escuros/neutros.
- **Tipografia:** Fonte *Raleway* via Google Fonts.
- **Seleção Dinâmica:**
  - Escolha de profissionais por cartões selecionáveis (chips interativos).
  - Geração dinâmica das datas disponíveis dos próximos dias.
  - Filtro interativo de horários dividido em turnos (**Todos**, **Manhã**, **Tarde** e **Noite**).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**
- **CSS3 Personalizado** (Variáveis CSS, flexbox e transições)
- **Bootstrap 5.3** (Layout responsivo, componentes e grid)
- **JavaScript (Vanilla ES6+)** (Consumo assíncrono via `fetch`, manipulação do DOM)
- **Firebase Authentication** (Cadastro e login com e-mail/senha e Google OAuth)

---

## 📂 Estrutura de Pastas

```text
agenda-dourada-front/
├── index.html              # Tela de Login e Cadastro (Abas + Firebase)
├── cliente-dashboard.html  # Tela de Agendamento do Cliente
├── css/
│   └── style.css           # Estilos customizados (tema dourado e chips)
├── js/
│   ├── firebase-config.js  # Inicialização do SDK do Firebase
│   ├── auth.js             # Lógica de login, cadastro e validações
│   └── cliente.js          # Geração de dias/turnos e consumo da API REST
└── assets/
    └── img/                # Logotipos e ícones

