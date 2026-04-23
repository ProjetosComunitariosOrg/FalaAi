import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";

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
      <div className="px-[8px] mt-[20px]">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-[#1351b4] size-5" />
          <p className="text-[14px] text-black font-['Rawline:SemiBold',sans-serif]">
            Filtrar por status:
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filtros.map((filtro) => (
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
      </div>

      {/* Lista de Reclamações */}
      <div className="px-[8px] mt-[24px]">
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
              <button
                key={reclamacao.id}
                onClick={() => navigate(`/reclamacao/${reclamacao.id}`)}
                className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-4 w-full text-left hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-['Rawline:SemiBold',sans-serif] text-[16px] text-black mb-1">
                      {reclamacao.titulo}
                    </p>
                    <p className="text-[12px] text-[#666] mb-2">
                      {reclamacao.categoria} • {reclamacao.endereco}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[12px] whitespace-nowrap ml-2 ${
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

                <div className="flex items-center justify-between text-[12px] text-[#666]">
                  <p>
                    Criado em:{" "}
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
