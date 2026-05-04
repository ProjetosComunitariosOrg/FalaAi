import { useState } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Header } from "../components/Header";
import { api } from "../services/api";

export default function Cadastro() {
  const navigate = useNavigate();
  const { cadastrar } = useApp();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = async () => {
    if (!nome || !cpf || !telefone || !senha || !confirmarSenha) {
      setErro("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      const nomeClean = nome.trim();
      const cpfClean = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
      const phoneClean = telefone.trim();

      await api.post("/users/createUser", {
        name: nomeClean,
        cpf: cpfClean,
        password: senha,
        phone: phoneClean,
      });
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      setErro("Erro ao realizar cadastro");
      return;
    }

    if (cadastrar({ nome, cpf, phone: telefone, senha })) {
      navigate("/home");
    } else {
      setErro("Erro ao realizar cadastro");
    }
  };

  return (
    <div className="bg-white relative min-h-screen w-full">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="px-[8px] md:px-[24px] mt-[40px] lg:max-w-[600px] w-full max-w-md mx-auto">
        <div className="pb-[20px] flex items-center justify-center">
          <p className="font-['Rawline:Medium',sans-serif] leading-[normal] text-[29.03px] text-black">
            Cadastro
          </p>
        </div>

        {/* Nome Input */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <Label
            htmlFor="nome"
            className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black"
          >
            Nome Completo
          </Label>
          <Input
            id="nome"
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-[40px] rounded-[4px] border-[#888] px-[16px] text-[14px]"
          />
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

        {/* Telefone Input */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <Label
            htmlFor="telefone"
            className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black"
          >
            Telefone
          </Label>
          <Input
            id="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
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
          <Input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="h-[40px] rounded-[4px] border-[#888] px-[16px] text-[14px]"
          />
        </div>

        {/* Confirmar Senha Input */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <Label
            htmlFor="confirmarSenha"
            className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black"
          >
            Confirmar Senha
          </Label>
          <Input
            id="confirmarSenha"
            type="password"
            placeholder="Digite sua senha novamente"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="h-[40px] rounded-[4px] border-[#888] px-[16px] text-[14px]"
          />
        </div>

        {erro && <p className="text-red-600 text-[14px] mb-4">{erro}</p>}

        {/* Botão Cadastrar */}
        <Button
          type="button"
          onClick={handleCadastro}
          className="bg-[#1351b4] w-full h-[39px] flex items-center justify-center rounded-[20px] text-white text-[16.8px] font-['Rawline:SemiBold',sans-serif] mb-4 hover:bg-[#0f4ca0] hover:cursor-pointer"
        >
          Cadastrar
        </Button>

        {/* Link para Login */}
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            onClick={() => navigate("/")}
            className="h-auto p-0 text-[#1351b4] text-[14px] hover:cursor-pointer"
          >
            Já possui cadastro? Faça login
          </Button>
        </div>
      </div>
    </div>
  );
}
