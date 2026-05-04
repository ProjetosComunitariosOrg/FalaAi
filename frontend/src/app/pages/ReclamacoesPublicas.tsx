import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import {
  ArrowLeft,
  Filter,
  MapPin,
  Users,
  CheckCircle,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";
import { StatCard } from "../components/StatCard";
import { FilterPills } from "../components/FilterPills";
import { ComplaintCard } from "../components/ComplaintCard";

export default function ReclamacoesPublicas() {
  const navigate = useNavigate();
  const { usuario, reclamacoes } = useApp();
  const [filtroStatus, setFiltroStatus] = useState<string>("Todas");
  const [filtroCategoria, setFiltroCategoria] = useState<string>("Todas");

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) {
    return null;
  }

  const categorias = [
    "Todas",
    ...Array.from(new Set(reclamacoes.map((r) => r.categoria))),
  ];
  const reclamacoesFiltradas = reclamacoes.filter((r) => {
    const matchStatus = filtroStatus === "Todas" || r.status === filtroStatus;
    const matchCategoria =
      filtroCategoria === "Todas" || r.categoria === filtroCategoria;
    return matchStatus && matchCategoria;
  });

  const filtrosStatus = ["Todas", "Pendente", "Em Análise", "Resolvido"];

  const estatisticas = {
    total: reclamacoes.length,
    pendentes: reclamacoes.filter((r) => r.status === "Pendente").length,
    emAnalise: reclamacoes.filter((r) => r.status === "Em Análise").length,
    resolvidas: reclamacoes.filter((r) => r.status === "Resolvido").length,
  };

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
            <div className="flex items-center gap-2">
              <Users className="text-[#1351b4] size-7" />
              <p className="font-['Rawline:Medium',sans-serif] text-[29.03px] text-black">
                Reclamações Públicas
              </p>
            </div>
            <p className="text-[14px] text-[#666] mt-1">
              {reclamacoes.length} reclamação(ões) registrada(s) na cidade
            </p>
          </div>
        }
      />

      {/* Estatísticas */}
      <div className="px-[8px] md:px-[24px] mt-[20px]">
        <p className="text-[14px] text-black mb-[12px] font-['Rawline:SemiBold',sans-serif]">
          Panorama Geral
        </p>
        <div className="grid grid-cols-4 gap-2">
          <StatCard
            className="p-3"
            icon={<Users className="size-5" />}
            value={estatisticas.total}
            label="Total"
          />
          <StatCard
            className="p-3"
            icon={<AlertCircle className="size-5" />}
            iconColor="#FFA800"
            value={estatisticas.pendentes}
            label="Pendentes"
          />
          <StatCard
            className="p-3"
            icon={<FileText className="size-5" />}
            iconColor="#1351b4"
            value={estatisticas.emAnalise}
            label="Em Análise"
          />
          <StatCard
            className="p-3"
            icon={<CheckCircle className="size-5" />}
            iconColor="#54AB34"
            value={estatisticas.resolvidas}
            label="Resolvidas"
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="px-[8px] md:px-[24px] mt-[24px]">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="text-[#1351b4] size-5" />
          <p className="text-[14px] text-black font-['Rawline:SemiBold',sans-serif]">
            Filtrar por status:
          </p>
        </div>
        <FilterPills
          options={filtrosStatus}
          selectedOption={filtroStatus}
          onSelect={setFiltroStatus}
        />

        <div className="flex items-center gap-2 mb-3 mt-4">
          <MapPin className="text-[#1351b4] size-5" />
          <p className="text-[14px] text-black font-['Rawline:SemiBold',sans-serif]">
            Filtrar por categoria:
          </p>
        </div>
        <FilterPills
          options={categorias}
          selectedOption={filtroCategoria}
          onSelect={setFiltroCategoria}
        />
      </div>

      {/* Lista de Reclamações */}
      <div className="px-[8px] md:px-[24px] mt-[24px]">
        {reclamacoesFiltradas.length === 0 ? (
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-8 text-center">
            <p className="text-[14px] text-[#666]">
              Nenhuma reclamação encontrada com os filtros selecionados
            </p>
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
                onClick={() => navigate(`/reclamacao/${reclamacao.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
