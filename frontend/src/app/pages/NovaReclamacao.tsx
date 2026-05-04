import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Camera, X } from "lucide-react";
import { Header } from "../components/Header";
import { Button } from "../components/ui/button";

export default function NovaReclamacao() {
  const navigate = useNavigate();
  const { usuario, adicionarReclamacao } = useApp();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [endereco, setEndereco] = useState("");
  const [imagens, setImagens] = useState<string[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!usuario) {
      navigate("/");
    }
  }, [usuario, navigate]);

  if (!usuario) {
    return null;
  }

  const categorias = [
    "Infraestrutura",
    "Limpeza",
    "Iluminação",
    "Sinalização",
    "Transporte",
    "Meio Ambiente",
    "Saúde",
    "Educação",
    "Segurança",
    "Outros",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setImagens((prev) => [...prev, ...newImages].slice(0, 5)); // Máximo 5 imagens
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImagem = (index: number) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!titulo || !descricao || !categoria || !endereco) {
      setErro("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    adicionarReclamacao({
      titulo,
      descricao,
      categoria,
      endereco,
      status: "Pendente",
      imagens,
    });

    navigate("/home");
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
            <p className="font-['Rawline:Medium',sans-serif] text-[29.03px] text-black">
              Nova Reclamação
            </p>
            <p className="text-[14px] text-[#666] mt-1">
              Registre um problema urbano para análise da prefeitura
            </p>
          </div>
        }
      />

      {/* Form */}
      <div className="px-[8px] md:px-[24px] mt-[24px]">
        {/* Título */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <label className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
            Título da Reclamação *
          </label>
          <div className="bg-white h-[40px] rounded-[4px] border border-[#888]">
            <input
              type="text"
              placeholder="Ex: Buraco na rua"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full h-full px-[16px] text-[14px] rounded-[4px] outline-none"
            />
          </div>
        </div>

        {/* Categoria */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <label className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
            Categoria *
          </label>
          <div className="bg-white h-[40px] rounded-[4px] border border-[#888]">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full h-full px-[16px] text-[14px] rounded-[4px] outline-none bg-white"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Endereço */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <label className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
            Endereço *
          </label>
          <div className="bg-white h-[40px] rounded-[4px] border border-[#888]">
            <input
              type="text"
              placeholder="Ex: Rua das Flores, 123 - Centro"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="w-full h-full px-[16px] text-[14px] rounded-[4px] outline-none"
            />
          </div>
        </div>

        {/* Descrição */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <label className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
            Descrição Detalhada *
          </label>
          <div className="bg-white rounded-[4px] border border-[#888]">
            <textarea
              placeholder="Descreva o problema em detalhes..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={5}
              className="w-full px-[16px] py-[12px] text-[14px] rounded-[4px] outline-none resize-none"
            />
          </div>
        </div>

        {/* Upload de Imagens */}
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <label className="font-['Rawline:SemiBold',sans-serif] text-[14px] text-black">
            Fotos do Problema (até 5)
          </label>

          {imagens.length < 5 && (
            <label className="bg-white border-2 border-dashed border-[#1351b4] rounded-lg p-8 cursor-pointer hover:bg-[#f8f8f8] transition-colors">
              <div className="flex flex-col items-center gap-2">
                <Camera className="text-[#1351b4] size-8" />
                <p className="text-[14px] text-[#1351b4] text-center">
                  Clique para adicionar fotos
                </p>
                <p className="text-[12px] text-[#666] text-center">
                  Máximo de 5 imagens
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}

          {/* Preview das Imagens */}
          {imagens.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {imagens.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImagem(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {erro && (
          <p className="text-red-600 text-[14px] mb-4 bg-red-50 p-3 rounded">
            {erro}
          </p>
        )}

        {/* Botões */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/home")}
            className="flex-1 border-2 border-[#1351b4] h-[39px] flex items-center justify-center rounded-[20px] text-[#1351b4] text-[16.8px] font-['Rawline:SemiBold',sans-serif]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-[#1351b4] h-[39px] flex items-center justify-center rounded-[20px] text-white text-[16.8px] font-['Rawline:SemiBold',sans-serif]"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
