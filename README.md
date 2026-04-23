# 📢 Fala Aí

### Plataforma de Gestão de Demandas Urbanas — Software Livre para Cidadãos e Prefeituras

> **Status:** 🚧 Em desenvolvimento ativo — MVP em construção.

---

## 🧭 A Origem do Projeto

Este projeto tem como foco resolver problemas recorrentes na comunicação entre a população e a gestão pública municipal, especialmente relacionados a demandas urbanas como buracos, lixo acumulado, bueiros entupidos, terrenos baldios e iluminação pública.

A proposta surgiu a partir da observação de dificuldades reais enfrentadas pela comunidade local, onde muitas solicitações não são registradas ou acompanhadas de forma eficiente, seja por falta de canais acessíveis ou pela complexidade dos sistemas existentes.

Diante desse cenário, identificamos a necessidade de uma solução mais simples, direta e transparente, que permita ao cidadão registrar, acompanhar e dar visibilidade às demandas da cidade.

Assim nasceu o Fala Aí: uma plataforma inspirada na objetividade de serviços como o ReclameAQUI, mas voltada para o contexto da gestão pública municipal, com o objetivo de aproximar a população do poder público e melhorar a eficiência na resolução de problemas urbanos.

Além disso, o projeto também possui como objetivo ser apresentado à Câmara Municipal, buscando incentivar sua adoção como ferramenta oficial de participação cidadã.

---

## 💡 O Problema que Resolve

| Problema Real                              | Impacto                                       |
| ------------------------------------------ | --------------------------------------------- |
| Canais oficiais inacessíveis ou fora do ar | Demandas nunca chegam ao setor responsável    |
| Burocracia no registro de ocorrências      | Cidadão desiste antes de protocolar           |
| Falta de transparência no andamento        | Morador não sabe se foi ouvido                |
| Dados não centralizados para a gestão      | Prefeitura não consegue mapear áreas críticas |

---

## 🎯 Objetivo

Desenvolver uma plataforma de **software livre** para gestão de reclamações públicas, onde o cidadão registra demandas urbanas e acompanha o status em tempo real, enquanto a gestão pública visualiza, prioriza e responde de forma organizada.

> Meta do MVP: processar 100% das demandas registradas e fornecer feedback de status ao morador em até 24 horas após o envio.

---

## ✨ Funcionalidades

### Para o Cidadão

- 📝 **Registro de Ocorrência** — título, descrição, foto e localização
- 📊 **Timeline de Status** — acompanhamento em tempo real: `Pendente` → `Em Execução` → `Resolvida`
- 🗂️ **Painel Pessoal** — histórico completo de todas as solicitações

### Para a Gestão Pública

- 🗺️ **Dashboard Administrativo** — visualização de demandas por bairro em tempo real
- 📎 **Gestão de Evidências** — anexo de foto da solução concluída
- 📄 **Exportação de Relatórios** — geração de dados em PDF/CSV para gestão municipal

---

## 🛠️ Stack Tecnológica

### Back-End

| Tecnologia                  | Uso                           |
| --------------------------- | ----------------------------- |
| Java 25 (LTS)               | Linguagem principal           |
| Spring Boot 3               | Framework principal           |
| Spring Data JPA + Hibernate | ORM e persistência            |
| Jakarta EE                  | Especificações enterprise     |
| H2 Database                 | Banco em memória (dev/testes) |
| PostgreSQL                  | Banco relacional (produção)   |
| Swagger / OpenAPI           | Documentação da API REST      |
| Maven                       | Gerenciamento de dependências |

### Front-End

| Tecnologia   | Uso                                      |
| ------------ | ---------------------------------------- |
| TypeScript   | Tipagem estática e segurança de tipos    |
| React        | Framework principal                      |
| Vite         | Bundler / dev server rápido              |
| Tailwind CSS | Estilização utilitária / estilos globais |
| Context API  | Gerenciamento de estado global simples   |

---

## 🏗️ Arquitetura

```
falaai/
├── backend/
│   └── src/main/java/org/falaai/
│       ├── controllers/     # Endpoints REST
│       ├── services/        # Regras de negócio
│       ├── repositories/    # Acesso a dados (JPA)
│       ├── entities/        # Modelos de domínio
│       └── dto/             # Objetos de transferência
└── frontend/
    └── src/
        ├── app/
        │   ├── components/    # Componentes reutilizáveis
        │   ├── context/       # Context API / providers
        │   ├── pages/         # Páginas: Home, Login, Cadastro, etc.
        │   └── services/      # Chamadas à API Rest
        └── styles/            # Estilos globais e Tailwind
```

---

## 🌐 Escalabilidade Multi-Tenant

O Fala Aí foi projetado para ser escalável entre municípios via **subdomínios**, sem necessidade de uma instância separada por cidade:

```
ituiutaba.falaai.org   → Ituiutaba - MG
uberlandia.falaai.org  → Uberlândia - MG
prata.falaai.org       → Prata - MG
```

Cada prefeitura pode também hospedar sua própria instância, mantendo o padrão de nomenclatura e a identidade visual da plataforma.

---

## 🔄 Fluxo de Uso

```
Cidadão acessa a plataforma
        ↓
Clica em "Nova Queixa"
        ↓
Preenche título, descrição, foto e localização
        ↓
Sistema gera protocolo automático
        ↓
Gestor visualiza no Dashboard e encaminha ao setor
        ↓
Status atualizado → Cidadão recebe notificação
        ↓
Gestor anexa foto da solução → Caso encerrado
        ↓
Dados gerados para relatório mensal da prefeitura
```

---

## 📜 Licença

Este projeto é distribuído sob a licença **GNU GPL v3**.

A escolha da GPL v3 é intencional e ideológica: qualquer versão derivada do Fala Aí deve obrigatoriamente manter o código aberto, garantindo que o software desenvolvido no IFTM para Ituiutaba **continue sendo um patrimônio da comunidade** — e não possa ser privatizado por terceiros.

---

## 🤝 Contexto Acadêmico

Este projeto foi desenvolvido como **Projeto Integrador Extensionista do 3º Período** do curso de Análise e Desenvolvimento de Sistemas (ADS) no **Instituto Federal do Triângulo Mineiro (IFTM)**, com o objetivo de aplicar extensão universitária em um problema real da comunidade de Ituiutaba-MG.

---

## 👨‍💻 Autores

**Hendrick Miqueias De Oliveira Gomes**  
Estudante de ADS – IFTM | Backend Java Developer  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://linkedin.com/in/Hendrick-Miqueias)

**Luis Otávio Dias**  
Estudante de Sistemas De Informação – UEMG | Fullstack Developer | Python | Django | DRF | TypeScript | React  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://linkedin.com/in/luis-otavio-dias)
