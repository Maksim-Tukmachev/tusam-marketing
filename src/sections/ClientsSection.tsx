"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CLIENTS } from "@/lib/constants";

export function ClientsSection() {
  return (
    <section className="relative z-20 px-4 md:px-9 py-12 md:py-24 bg-white rounded-t-[40px]" aria-label="Our clients">
      <div className="max-w-[1520px] mx-auto flex flex-col items-start gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
        >
          <SectionLabel label="445+ компаний получают заявки через нашу систему" />
        </motion.div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={`${client.name}-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20px", amount: 0.2 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[14px] overflow-hidden aspect-[1.5] p-2 sm:p-4 flex items-center justify-center shadow-sm"
            >
                <div className="relative w-full h-full">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
