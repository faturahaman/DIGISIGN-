"use client";

import { CLIENTS_LIST } from "@/data/siteContent";

export function ClientsSection() {
  return (
    <section className="py-14 sm:py-16 bg-[#FFFAF6] border-b border-[#ECEEF1]">
      <div className="container-arvion">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="section-label">TRUSTED BY BRANDS</span>
          <h2 className="section-heading text-2xl sm:text-3xl">
            People We&apos;ve Worked With
          </h2>
          <p className="text-sm text-[#707581] mt-2">
            Proud to partner with visionary teams across technology, retail, and lifestyle.
          </p>
        </div>

        {/* Client Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {CLIENTS_LIST.map((client, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center p-4 rounded-xl border border-[#ECEEF1] bg-white hover:border-[#F47721]/30 hover:shadow-xs transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-[#F47721] transition-colors" />
                <span className="font-extrabold text-sm sm:text-base tracking-widest text-[#707581] group-hover:text-[#171A22] transition-colors">
                  {client.name}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium mt-1">
                {client.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
