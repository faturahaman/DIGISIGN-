"use client";

import {
  SiGithub,
  SiGitlab,
  SiGo,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiReact,
} from "react-icons/si";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FRONTEND_TOOLS = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
];

const BACKEND_TOOLS = [
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "Golang", Icon: SiGo, color: "#00ADD8" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
];

const PLATFORM_TOOLS = [
  { name: "GitHub", Icon: SiGithub, color: "#181717" },
  { name: "GitLab", Icon: SiGitlab, color: "#FC6D26" },
];

export function ToolsSection() {
  const { lang } = useLanguage();
  const copy =
    lang === "id"
      ? {
          title: "Teknologi yang Kami Gunakan",
          description:
            "Tech stack yang biasa kami gunakan untuk membangun website dan aplikasi yang andal. Kebutuhan klien tetap menjadi acuan, sehingga kami fleksibel menggunakan teknologi lain sesuai preferensi dan kebutuhan proyek.",
          frontend: "Frontend",
          backend: "Backend",
          version: "Version Control",
        }
      : {
          title: "Tools We Use",
          description:
            "The tech stack we commonly use to build reliable websites and applications. Client needs remain the priority, so we stay flexible and can use other technologies based on project preferences and requirements.",
          frontend: "Frontend",
          backend: "Backend",
          version: "Version Control",
        };
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#ECEEF1]">
      <div className="container-arvion">
        {/* Section Header matching Reference Photo 3 */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A22] tracking-tight">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#707581]">
            {copy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {[
            { title: copy.frontend, tools: FRONTEND_TOOLS },
            { title: copy.backend, tools: BACKEND_TOOLS },
            { title: copy.version, tools: PLATFORM_TOOLS },
          ].map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-[#ECEEF1] bg-white p-5 sm:p-6"
            >
              <h3 className="text-sm font-bold text-[#171A22] mb-5">
                {group.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {group.tools.map((tool) => {
                  const Icon = tool.Icon;
                  return (
                    <div
                      key={tool.name}
                      title={tool.name}
                      className="group flex min-w-[74px] flex-col items-center gap-2"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-[#ECEEF1] bg-white flex items-center justify-center shadow-xs group-hover:-translate-y-1 group-hover:border-[#F47721]/40 group-hover:shadow-md transition-all duration-200">
                        <Icon
                          className="w-7 h-7 sm:w-8 sm:h-8"
                          style={{ color: tool.color }}
                          aria-label={tool.name}
                        />
                      </div>
                      <span className="text-xs font-semibold text-[#707581] text-center">
                        {tool.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
