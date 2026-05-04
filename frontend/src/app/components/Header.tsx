import React from "react";
import { LogoFalaai } from "./branding/LogoFalaai";

type HeaderProps = {
  rightTopButton?: React.ReactNode;
  titleButton?: React.ReactNode;
  subTitle?: React.ReactNode;
};

export function Header({ rightTopButton, titleButton, subTitle }: HeaderProps) {
  return (
    <div className="bg-white shadow-[0px_1px_6px_0px_rgba(0,0,0,0.16)] pb-4 w-full">
      <div className="flex items-center justify-between px-[8px] md:px-[24px] pt-[16px]">
        <div className="flex items-center">
          <LogoFalaai />
        </div>
        {rightTopButton && <div>{rightTopButton}</div>}
      </div>

      <div className="flex items-center px-[8px] md:px-[24px] mt-[12px]">
        {titleButton && <div>{titleButton}</div>}
        <p className="text-[14px] text-black">
          Sistema de Reclamações Municipais
        </p>
      </div>

      <div className="px-[8px] md:px-[24px] mt-[20px]">
        <div>{subTitle}</div>
      </div>
    </div>
  );
}
