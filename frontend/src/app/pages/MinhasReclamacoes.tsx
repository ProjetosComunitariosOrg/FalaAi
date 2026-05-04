import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";
import { FilterPills } from "../components/FilterPills";
import { ComplaintCard } from "../components/ComplaintCard";

export default function MinhasReclamacoes() {
  const navigate = useNavigate();
  const { usuario, obterReclamacoesPorUsuario } = useApp();
  const [filtroStatus, setFiltroStatus] = useState<string>("Todas");

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) {
    return null;
  }

  const todasReclamacoes = obterReclamacoesPorUsuario(usuario.id);
  const reclamacoesFiltradas =
    filtroStatus === "Todas"
      ? todasReclamacoes
      : todasReclamacoes.filter((r) => r.status === filtroStatus);

  const filtros = ["Todas", "Pendente", "Em Análise", "Resolvido"];

  return (
    <div className="bg-[#f8f8f8] relative min-h-screen w-full pb-20">
      {/* Header */}
      <Header
        titleButton={
          <Button
            type="button"
            variant={"link"}
            onClick={() => navigate("/home")}
            className="hover:cursor-pointer"
          >
            <ArrowLeft className="text-[#1351b4] size-6 absolute mt-1 mr-2" />
          </Button>
        }
        subTitle={
          <div>
            <p className="font-['Rawline:Medium',sans-serif] text-[29.03px] text-black">
              Minhas Reclamações
            </p>
            <p className="text-[14px] text-[#666] mt-1">
              {todasReclamacoes.length} solicitação(ões) registrada(s)
            </p>
          </div>
        }
      />

      {/* Filtros */}
      <div className="px-[8px] md:px-[24px] mt-[20px]">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-[#1351b4] size-5" />
          <p className="text-[14px] text-black font-['Rawline:SemiBold',sans-serif]">
            Filtrar por status:
          </p>
        </div>
        <FilterPills
          options={filtros}
          selectedOption={filtroStatus}
          onSelect={setFiltroStatus}
        />
      </div>

      {/* Lista de Reclamações */}
      <div className="px-[8px] md:px-[24px] mt-[24px]">
        {reclamacoesFiltradas.length === 0 ? (
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-8 text-center">
            <p className="text-[14px] text-[#666]">
              {filtroStatus === "Todas"
                ? "Você ainda não tem reclamações registradas"
                : `Nenhuma reclamação com status "${filtroStatus}"`}
            </p>
            <button
              onClick={() => navigate("/nova-reclamacao")}
              className="mt-4 text-[#1351b4] text-[14px] underline"
            >
              {filtroStatus === "Todas" && "Registrar primeira reclamação"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reclamacoesFiltradas.map((reclamacao) => (
              <ComplaintCard
                key={reclamacao.id}
                title={reclamacao.titulo}
                status={reclamacao.status}
                date={reclamacao.dataCriacao}
                category={reclamacao.categoria}
                address={reclamacao.endereco}
                description={reclamacao.descricao}
                images={reclamacao.imagens}
                onClick={() => navigate(`/reclamacao/${reclamacao.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
