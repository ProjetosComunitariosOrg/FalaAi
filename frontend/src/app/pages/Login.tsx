import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "../components/Header";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (!cpf || !senha) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    if (login(cpf, senha)) {
      navigate("/home");
    } else {
      setErro("CPF ou senha inválidos");
    }
  };

  return (
    <div className="bg-white relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="px-[8px] mt-[40px]">
        <div className="pb-[20px]">
          <p className="font-['Rawline:Medium',sans-serif] leading-[normal] text-[29.03px] text-black">
            Acesso ao Sistema
          </p>
        </div>

        {/* CPF Input */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <Label
            htmlFor="cpf"
            className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black"
          >
            CPF
          </Label>
          <Input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="h-[40px] rounded-[4px] border-[#888] px-[16px] text-[14px]"
          />
        </div>

        {/* Senha Input */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <Label
            htmlFor="senha"
            className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black"
          >
            Senha
          </Label>
          <div className="relative">
            <Input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-[40px] rounded-[4px] border-[#888] px-[16px] pr-12 text-[14px]"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-[#1351b4] hover:bg-transparent hover:cursor-pointer"
            >
              {mostrarSenha ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {erro && <p className="text-red-600 text-[14px] mb-4">{erro}</p>}

        {/* Botão Entrar */}
        <Button
          type="button"
          onClick={handleLogin}
          className="bg-[#1351b4] w-full h-[39px] flex items-center justify-center rounded-[20px] text-white text-[16.8px] font-['Rawline:SemiBold',sans-serif] mb-4 hover:bg-[#0f4ca0] hover:cursor-pointer"
        >
          Entrar
        </Button>

        {/* Link para Cadastro */}
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/cadastro")}
            className="h-auto p-0 text-[#1351b4] text-[14px] hover:cursor-pointer"
          >
            Primeiro Acesso? Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  );
}
