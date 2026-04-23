import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Usuario {
  id: string;
  nome: string;
  cpf: string;
  phone: string;
}

export interface Reclamacao {
  id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  endereco: string;
  status: "Pendente" | "Em Análise" | "Resolvido";
  imagens: string[];
  usuarioId: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

interface AppContextType {
  usuario: Usuario | null;
  login: (cpf: string, senha: string) => boolean;
  logout: () => void;
  cadastrar: (dados: Omit<Usuario, "id"> & { senha: string }) => boolean;
  reclamacoes: Reclamacao[];
  adicionarReclamacao: (
    reclamacao: Omit<
      Reclamacao,
      "id" | "dataCriacao" | "dataAtualizacao" | "usuarioId"
    >,
  ) => void;
  obterReclamacoesPorUsuario: (usuarioId: string) => Reclamacao[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([
    {
      id: "1",
      titulo: "Buraco na rua",
      descricao:
        "Grande buraco na Rua das Flores, causando perigo aos pedestres e veículos.",
      categoria: "Infraestrutura",
      endereco: "Rua das Flores, 123 - Centro",
      status: "Em Análise",
      imagens: [],
      usuarioId: "demo",
      dataCriacao: "2026-03-15T10:30:00",
      dataAtualizacao: "2026-03-20T14:00:00",
    },
    {
      id: "2",
      titulo: "Lixo acumulado",
      descricao: "Acúmulo de lixo na esquina há mais de uma semana.",
      categoria: "Limpeza",
      endereco: "Av. Principal, 456 - Jardim",
      status: "Pendente",
      imagens: [],
      usuarioId: "demo",
      dataCriacao: "2026-03-28T09:15:00",
      dataAtualizacao: "2026-03-28T09:15:00",
    },
    {
      id: "3",
      titulo: "Poste sem iluminação",
      descricao: "Poste de iluminação pública queimado há 2 semanas.",
      categoria: "Iluminação",
      endereco: "Rua do Comercio, 789 - Vila Nova",
      status: "Resolvido",
      imagens: [],
      usuarioId: "demo",
      dataCriacao: "2026-03-10T16:45:00",
      dataAtualizacao: "2026-04-01T11:30:00",
    },
    {
      id: "4",
      titulo: "Calçada quebrada",
      descricao:
        "Calçada com diversas placas quebradas e soltas, oferecendo risco de quedas.",
      categoria: "Infraestrutura",
      endereco: "Rua das Acácias, 234 - Jardim Botânico",
      status: "Pendente",
      imagens: [],
      usuarioId: "user2",
      dataCriacao: "2026-04-10T08:20:00",
      dataAtualizacao: "2026-04-10T08:20:00",
    },
    {
      id: "5",
      titulo: "Semáforo com defeito",
      descricao:
        "Semáforo piscando amarelo constantemente, causando confusão no trânsito.",
      categoria: "Trânsito",
      endereco: "Cruzamento Av. Brasil x Rua 7 de Setembro - Centro",
      status: "Em Análise",
      imagens: [],
      usuarioId: "user3",
      dataCriacao: "2026-04-12T14:30:00",
      dataAtualizacao: "2026-04-15T10:00:00",
    },
    {
      id: "6",
      titulo: "Entulho na via pública",
      descricao:
        "Grande quantidade de entulho de construção abandonado na calçada.",
      categoria: "Limpeza",
      endereco: "Rua dos Pinheiros, 890 - Vila São José",
      status: "Pendente",
      imagens: [],
      usuarioId: "user4",
      dataCriacao: "2026-04-14T16:45:00",
      dataAtualizacao: "2026-04-14T16:45:00",
    },
    {
      id: "7",
      titulo: "Árvore caída bloqueando rua",
      descricao:
        "Árvore caiu após temporal e está bloqueando completamente a passagem de veículos.",
      categoria: "Infraestrutura",
      endereco: "Rua das Palmeiras, 567 - Parque Verde",
      status: "Resolvido",
      imagens: [],
      usuarioId: "user5",
      dataCriacao: "2026-04-05T07:30:00",
      dataAtualizacao: "2026-04-06T15:20:00",
    },
    {
      id: "8",
      titulo: "Falta de iluminação em praça",
      descricao:
        "Praça pública completamente sem iluminação à noite, comprometendo a segurança.",
      categoria: "Iluminação",
      endereco: "Praça da Liberdade - Centro",
      status: "Em Análise",
      imagens: [],
      usuarioId: "user6",
      dataCriacao: "2026-04-11T19:00:00",
      dataAtualizacao: "2026-04-13T11:30:00",
    },
    {
      id: "9",
      titulo: "Vazamento de água",
      descricao:
        "Vazamento de água na rede pública causando desperdício e alagamento.",
      categoria: "Saneamento",
      endereco: "Rua do Mercado, 345 - Centro",
      status: "Em Análise",
      imagens: [],
      usuarioId: "user7",
      dataCriacao: "2026-04-16T10:15:00",
      dataAtualizacao: "2026-04-17T09:00:00",
    },
    {
      id: "10",
      titulo: "Faixa de pedestre apagada",
      descricao: "Faixa de pedestres completamente apagada em frente a escola.",
      categoria: "Trânsito",
      endereco: "Rua Escola Municipal, 123 - Bairro Educação",
      status: "Pendente",
      imagens: [],
      usuarioId: "user8",
      dataCriacao: "2026-04-17T13:45:00",
      dataAtualizacao: "2026-04-17T13:45:00",
    },
  ]);

  const login = (cpf: string, senha: string): boolean => {
    // Mock de autenticação
    if (cpf && senha) {
      setUsuario({
        id: "demo",
        nome: "João da Silva",
        cpf: cpf,
        phone: "34912345678",
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
  };

  const cadastrar = (
    dados: Omit<Usuario, "id"> & { senha: string },
  ): boolean => {
    // Mock de cadastro
    if (dados.nome && dados.cpf && dados.phone && dados.senha) {
      const novoUsuario: Usuario = {
        id: Math.random().toString(36).substring(7),
        nome: dados.nome,
        cpf: dados.cpf,
        phone: dados.phone,
      };
      setUsuario(novoUsuario);
      return true;
    }
    return false;
  };

  const adicionarReclamacao = (
    reclamacao: Omit<
      Reclamacao,
      "id" | "dataCriacao" | "dataAtualizacao" | "usuarioId"
    >,
  ) => {
    if (!usuario) return;

    const novaReclamacao: Reclamacao = {
      ...reclamacao,
      id: Math.random().toString(36).substring(7),
      usuarioId: usuario.id,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    };

    setReclamacoes((prev) => [novaReclamacao, ...prev]);
  };

  const obterReclamacoesPorUsuario = (usuarioId: string): Reclamacao[] => {
    return reclamacoes.filter((rec) => rec.usuarioId === usuarioId);
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        login,
        logout,
        cadastrar,
        reclamacoes,
        adicionarReclamacao,
        obterReclamacoesPorUsuario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
