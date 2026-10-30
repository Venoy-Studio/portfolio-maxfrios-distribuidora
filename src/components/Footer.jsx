import React from 'react';
import { COMPANY_INFO } from '../data/company';

export default function Footer({ onOpenCatalog }) {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 text-sm text-left">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        
        {/* Col 1: Identity & Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/max-frios-logo.png"
              alt="Logo Max Frios Distribuidora"
              className="h-11 w-11 rounded-full bg-blue-600 object-cover shadow-sm p-0.5"
            />
            <p className="font-extrabold text-slate-900 text-base">
              Max Frios Distribuidora
            </p>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Fábrica e Distribuidora de Gelo e Bebidas
          </p>
          <div className="text-xs text-slate-600 space-y-1.5 pt-1">
            <p>📍 {COMPANY_INFO.endereco.logradouro} - {COMPANY_INFO.endereco.bairro}, Manaus - AM, {COMPANY_INFO.endereco.cep}</p>
            <p>🕐 {COMPANY_INFO.horarios.semana}</p>
            <p>🚚 {COMPANY_INFO.bairrosAtendidos[0].nome} e região próxima — Manaus/AM</p>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-bold text-slate-900 mb-3 text-sm">Navegação</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><a href="#inicio" className="hover:text-blue-600 transition-colors">Início</a></li>
            <li><button onClick={() => onOpenCatalog('todos')} className="hover:text-blue-600 transition-colors">Produtos</button></li>
            <li><a href="#empresas" className="hover:text-blue-600 transition-colors">Empresas</a></li>
            <li><a href="#eventos" className="hover:text-blue-600 transition-colors">Eventos</a></li>
            <li><button onClick={() => onOpenCatalog('todos')} className="hover:text-blue-600 transition-colors">Fazer pedido</button></li>
            <li><a href="#contato" className="hover:text-blue-600 transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* Col 3: Contacts */}
        <div>
          <h4 className="font-bold text-slate-900 mb-3 text-sm">Contato</h4>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent('Olá, vim pelo site e gostaria de falar com a Max Frios.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors font-medium text-emerald-700 flex items-center gap-1.5"
              >
                📲 {COMPANY_INFO.telefoneWhatsapp}
              </a>
            </li>
            <li>
              <span className="text-slate-500">📸 {COMPANY_INFO.instagram}</span>
            </li>
            <li className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              CNPJ: {COMPANY_INFO.cnpj} (Contato Fictício para Demonstração)
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-100 bg-slate-50 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Max Frios Distribuidora. Venda de bebidas alcoólicas proibida para menores de 18 anos.</span>
          <span className="text-[11px] text-slate-400">Versão demonstrativa com dados fictícios.</span>
        </div>
      </div>
    </footer>
  );
}
