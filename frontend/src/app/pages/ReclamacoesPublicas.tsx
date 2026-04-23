import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Filter, MapPin, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";

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
      <div className="px-[8px] mt-[20px]">
        <p className="text-[14px] text-black mb-[12px] font-['Rawline:SemiBold',sans-serif]">
          Panorama Geral
        </p>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-3 rounded-lg">
            <p className="text-[20px] font-bold text-[#1351b4]">
              {estatisticas.total}
            </p>
            <p className="text-[10px] text-[#666]">Total</p>
          </div>
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-3 rounded-lg">
            <p className="text-[20px] font-bold text-[#FFA800]">
              {estatisticas.pendentes}
            </p>
            <p className="text-[10px] text-[#666]">Pendentes</p>
          </div>
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-3 rounded-lg">
            <p className="text-[20px] font-bold text-[#1351b4]">
              {estatisticas.emAnalise}
            </p>
            <p className="text-[10px] text-[#666]">Em Análise</p>
          </div>
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-3 rounded-lg">
            <p className="text-[20px] font-bold text-[#54AB34]">
              {estatisticas.resolvidas}
            </p>
            <p className="text-[10px] text-[#666]">Resolvidas</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="px-[8px] mt-[24px]">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="text-[#1351b4] size-5" />
          <p className="text-[14px] text-black font-['Rawline:SemiBold',sans-serif]">
            Filtrar por status:
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filtrosStatus.map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFiltroStatus(filtro)}
              className={`px-4 py-2 rounded-full text-[14px] whitespace-nowrap ${
                filtroStatus === filtro
                  ? "bg-[#1351b4] text-white"
                  : "bg-white text-[#1351b4] border border-[#1351b4]"
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3 mt-4">
          <MapPin className="text-[#1351b4] size-5" />
          <p className="text-[14px] text-black font-['Rawline:SemiBold',sans-serif]">
            Filtrar por categoria:
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setFiltroCategoria(categoria)}
              className={`px-4 py-2 rounded-full text-[14px] whitespace-nowrap ${
                filtroCategoria === categoria
                  ? "bg-[#1351b4] text-white"
                  : "bg-white text-[#1351b4] border border-[#1351b4]"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Reclamações */}
      <div className="px-[8px] mt-[24px]">
        {reclamacoesFiltradas.length === 0 ? (
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-8 text-center">
            <p className="text-[14px] text-[#666]">
              Nenhuma reclamação encontrada com os filtros selecionados
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reclamacoesFiltradas.map((reclamacao) => (
              <button
                key={reclamacao.id}
                onClick={() => navigate(`/reclamacao/${reclamacao.id}`)}
                className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-4 w-full text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] text-[#666] bg-[#f0f0f0] px-2 py-1 rounded">
                        {reclamacao.categoria}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] ${
                          reclamacao.status === "Pendente"
                            ? "bg-[#FFA800] text-white"
                            : reclamacao.status === "Em Análise"
                              ? "bg-[#1351b4] text-white"
                              : "bg-[#54AB34] text-white"
                        }`}
                      >
                        {reclamacao.status}
                      </span>
                    </div>
                    <p className="font-['Rawline:SemiBold',sans-serif] text-[16px] text-black mb-1">
                      {reclamacao.titulo}
                    </p>
                    <div className="flex items-center gap-1 text-[12px] text-[#666] mb-2">
                      <MapPin className="size-3" />
                      <p>{reclamacao.endereco}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] text-[#333] mb-3 line-clamp-2">
                  {reclamacao.descricao}
                </p>

                {reclamacao.imagens.length > 0 && (
                  <div className="flex gap-2 mb-3 overflow-x-auto">
                    {reclamacao.imagens.slice(0, 3).map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Imagem ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                    {reclamacao.imagens.length > 3 && (
                      <div className="w-16 h-16 bg-[#f0f0f0] rounded flex items-center justify-center">
                        <p className="text-[12px] text-[#666]">
                          +{reclamacao.imagens.length - 3}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-[#666] pt-2 border-t border-[#f0f0f0]">
                  <p>
                    Registrado em:{" "}
                    {new Date(reclamacao.dataCriacao).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                  <p>
                    Atualizado:{" "}
                    {new Date(reclamacao.dataAtualizacao).toLocaleDateString(
                      "pt-BR",
                    )}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
