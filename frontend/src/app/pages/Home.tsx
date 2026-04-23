import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { AlertCircle, FileText, MapPin, Plus, Users } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const { usuario, logout, obterReclamacoesPorUsuario } = useApp();

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) {
    return null;
  }

  const minhasReclamacoes = obterReclamacoesPorUsuario(usuario.id);
  const reclamacoesPendentes = minhasReclamacoes.filter(
    (r) => r.status === "Pendente",
  ).length;
  const reclamacoesEmAnalise = minhasReclamacoes.filter(
    (r) => r.status === "Em Análise",
  ).length;
  const reclamacoesResolvidas = minhasReclamacoes.filter(
    (r) => r.status === "Resolvido",
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-[#f8f8f8] relative min-h-screen w-full pb-20 md:w-[900p]">
      {/* Header */}
      <Header
        rightTopButton={
          <Button
            onClick={handleLogout}
            type="button"
            variant={"ghost"}
            className="bg-[#fcfcfc] flex gap-[4px] h-[32px] items-center justify-center pb-[7px] pt-[6px] px-[16px] rounded-[42px] hover:cursor-pointer"
          >
            <p className="font-['Rawline:Bold',sans-serif] text-[#1351b4] text-[14px]">
              Sair
            </p>
          </Button>
        }
        subTitle={`Olá, ${usuario.nome.split(" ")[0]}`}
      />

      {/* Quick Stats */}
      <div className="px-[8px] mt-[24px]">
        <p className="text-[14px] text-black mb-[16px] font-['Rawline:Regular',sans-serif]">
          Resumo das suas solicitações
        </p>
        <div className="grid grid-cols-3 gap-[16px]">
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="text-[#FFA800] size-8" />
              <p className="text-[24px] font-bold text-black">
                {reclamacoesPendentes}
              </p>
              <p className="text-[12px] text-center text-black">Pendente</p>
            </div>
          </div>
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <FileText className="text-[#1351b4] size-8" />
              <p className="text-[24px] font-bold text-black">
                {reclamacoesEmAnalise}
              </p>
              <p className="text-[12px] text-center text-black">Em Análise</p>
            </div>
          </div>
          <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg">
            <div className="flex flex-col items-center gap-2">
              <svg
                className="size-8 text-[#54AB34]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-[24px] font-bold text-black">
                {reclamacoesResolvidas}
              </p>
              <p className="text-[12px] text-center text-black">Resolvido</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acesso Rápido */}
      <div className="px-[8px] mt-[32px]">
        <p className="text-[14px] text-black mb-[16px] font-['Rawline:Regular',sans-serif]">
          Acesso Rápido
        </p>
        <div className="grid grid-cols-2 gap-[16px]">
          <button
            onClick={() => navigate("/nova-reclamacao")}
            className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg hover:cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#1351b4] rounded-full p-3">
                <Plus className="text-white size-6" />
              </div>
              <p className="text-[14px] text-[#1351b4] text-center">
                Nova Reclamação
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/minhas-reclamacoes")}
            className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg hover:cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#1351b4] rounded-full p-3">
                <MapPin className="text-white size-6" />
              </div>
              <p className="text-[14px] text-[#1351b4] text-center">
                Minhas Reclamações
              </p>
            </div>
          </button>
          <button
            onClick={() => navigate("/reclamacoes-publicas")}
            className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] p-[16px] rounded-lg col-span-2 hover:cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="bg-[#54AB34] rounded-full p-3">
                <Users className="text-white size-6" />
              </div>
              <p className="text-[14px] text-[#54AB34] text-center">
                Ver Reclamações da Cidade
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Últimas Reclamações */}
      <div className="px-[8px] mt-[32px]">
        <div className="flex items-center justify-between mb-[16px]">
          <div>
            <p className="font-['Rawline:SemiBold',sans-serif] text-[16.8px] text-black">
              Últimas Reclamações
            </p>
            <p className="font-['Rawline:Regular',sans-serif] text-[11.67px] text-black">
              Suas solicitações mais recentes
            </p>
          </div>
          <button
            onClick={() => navigate("/minhas-reclamacoes")}
            className="text-[#1351b4] text-[11.67px] underline"
          >
            Ver todas
          </button>
        </div>

        <div className="bg-white shadow-[0px_1px_6px_0px_rgba(51,51,51,0.16)] rounded-lg">
          {minhasReclamacoes.slice(0, 3).map((reclamacao, index) => (
            <div key={reclamacao.id}>
              <button
                onClick={() => navigate(`/reclamacao/${reclamacao.id}`)}
                className="w-full p-[16px] text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[11.67px] text-black mb-1">
                      {new Date(reclamacao.dataCriacao).toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                    <p className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black mb-1">
                      {reclamacao.titulo}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-[11px] ${
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
                </div>
              </button>
              {index < Math.min(minhasReclamacoes.length - 1, 2) && (
                <div className="h-px bg-[#ccc] mx-[16px]" />
              )}
            </div>
          ))}

          {minhasReclamacoes.length === 0 && (
            <div className="p-[32px] text-center">
              <p className="text-[14px] text-[#888]">
                Você ainda não tem reclamações registradas
              </p>
              <button
                onClick={() => navigate("/nova-reclamacao")}
                className="mt-4 text-[#1351b4] text-[14px] underline"
              >
                Registrar primeira reclamação
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
