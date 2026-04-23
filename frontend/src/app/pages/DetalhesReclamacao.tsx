import { useNavigate, useParams } from "react-router";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";

export default function DetalhesReclamacao() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario, reclamacoes } = useApp();
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) {
    return null;
  }

  const reclamacao = reclamacoes.find((r) => r.id === id);

  if (!reclamacao) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[16px] text-[#666] mb-4">
            Reclamação não encontrada
          </p>
          <button
            onClick={() => navigate("/home")}
            className="text-[#1351b4] text-[14px] underline"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-[#FFA800] text-white";
      case "Em Análise":
        return "bg-[#1351b4] text-white";
      case "Resolvido":
        return "bg-[#54AB34] text-white";
      default:
        return "bg-[#ccc] text-black";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pendente":
        return "⏱️";
      case "Em Análise":
        return "🔍";
      case "Resolvido":
        return "✅";
      default:
        return "❓";
    }
  };

  return (
    <div className="bg-[#f8f8f8] relative min-h-screen w-full pb-20">
      {/* Modal de Imagem */}
      {imagemSelecionada && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setImagemSelecionada(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={imagemSelecionada}
              alt="Imagem ampliada"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setImagemSelecionada(null)}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-gray-200"
            >
              <ArrowLeft className="size-6" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        titleButton={
          <Button
            type="button"
            variant={"link"}
            onClick={() => navigate("/minhas-reclamacoes")}
            className="hover:cursor-pointer"
          >
            <ArrowLeft className="text-[#1351b4] size-6 absolute mt-1 mr-2" />
          </Button>
        }
        subTitle={
          <p className="font-['Rawline:Medium',sans-serif] text-[29.03px] text-black">
            Detalhes da Reclamação
          </p>
        }
      />

      {/* Status Timeline */}
      <div className="px-[8px] mt-[24px]">
        <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-6">
          <p className="font-['Rawline:SemiBold',sans-serif] text-[16px] text-black mb-4">
            Status Atual
          </p>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {getStatusIcon(reclamacao.status)}
              </span>
              <div>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-[14px] font-bold ${getStatusColor(
                    reclamacao.status,
                  )}`}
                >
                  {reclamacao.status}
                </span>
                <p className="text-[12px] text-[#666] mt-2">
                  Atualizado em:{" "}
                  {new Date(reclamacao.dataAtualizacao).toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </div>

          {/* Timeline de Status */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#e0e0e0]" />
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                    reclamacao.status === "Resolvido"
                      ? "bg-[#54AB34]"
                      : "bg-[#e0e0e0]"
                  }`}
                >
                  <span className="text-white text-[12px]">3</span>
                </div>
                <div>
                  <p className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
                    Resolvido
                  </p>
                  <p className="text-[12px] text-[#666]">
                    {reclamacao.status === "Resolvido"
                      ? new Date(reclamacao.dataAtualizacao).toLocaleString(
                          "pt-BR",
                        )
                      : "Aguardando resolução"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 ${
                    reclamacao.status === "Em Análise" ||
                    reclamacao.status === "Resolvido"
                      ? "bg-[#1351b4]"
                      : "bg-[#e0e0e0]"
                  }`}
                >
                  <span className="text-white text-[12px]">2</span>
                </div>
                <div>
                  <p className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
                    Em Análise
                  </p>
                  <p className="text-[12px] text-[#666]">
                    {reclamacao.status === "Em Análise" ||
                    reclamacao.status === "Resolvido"
                      ? "Equipe avaliando a situação"
                      : "Aguardando análise"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFA800] flex items-center justify-center relative z-10">
                  <span className="text-white text-[12px]">1</span>
                </div>
                <div>
                  <p className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
                    Registrado
                  </p>
                  <p className="text-[12px] text-[#666]">
                    {new Date(reclamacao.dataCriacao).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informações da Reclamação */}
      <div className="px-[8px] mt-[24px]">
        <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-6">
          <h2 className="font-['Rawline:SemiBold',sans-serif] text-[20px] text-black mb-4">
            {reclamacao.titulo}
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Tag className="text-[#1351b4] size-5 mt-1" />
              <div>
                <p className="text-[12px] text-[#666]">Categoria</p>
                <p className="text-[14px] text-black">{reclamacao.categoria}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-[#1351b4] size-5 mt-1" />
              <div>
                <p className="text-[12px] text-[#666]">Localização</p>
                <p className="text-[14px] text-black">{reclamacao.endereco}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="text-[#1351b4] size-5 mt-1" />
              <div>
                <p className="text-[12px] text-[#666]">Data de Registro</p>
                <p className="text-[14px] text-black">
                  {new Date(reclamacao.dataCriacao).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-[12px] text-[#666] mb-2">Descrição</p>
            <p className="text-[14px] text-black leading-relaxed">
              {reclamacao.descricao}
            </p>
          </div>

          {/* Imagens */}
          {reclamacao.imagens.length > 0 && (
            <div className="mt-6">
              <p className="text-[12px] text-[#666] mb-3">
                Fotos do Problema ({reclamacao.imagens.length})
              </p>
              <div className="grid grid-cols-2 gap-3">
                {reclamacao.imagens.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImagemSelecionada(img)}
                    className="relative aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={img}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Protocolo */}
      <div className="px-[8px] mt-[24px] mb-8">
        <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg p-6">
          <p className="text-[12px] text-[#666] mb-2">Número do Protocolo</p>
          <p className="font-mono text-[18px] text-[#1351b4] font-bold">
            #{reclamacao.id.toUpperCase()}
          </p>
          <p className="text-[12px] text-[#666] mt-2">
            Use este protocolo para acompanhamento da sua solicitação
          </p>
        </div>
      </div>
    </div>
  );
}
