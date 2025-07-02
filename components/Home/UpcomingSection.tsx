import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";

interface PageDataProps {
  pageData: Homepageglobal2026 | null;
}

const UpcomingSection: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) {
    return null;
  }
  return (
    <div className="upcoming-section-wrapper sm:relative sm:-top-30 sm:py-0 pb-20">
      <div className="max-w-4xl mx-auto">
        {pageData.upcomingitem.value.map((item: any) => (
          <UpcomingCard key={item.system.id} item={item} date={pageData.upcomingdate.value}/>
        ))}
      </div>
    </div>
  );
};

function UpcomingCard({ item, date }: { item: any, date: any }) {
  const [remaining, setRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    function calculate() {
      const now = new Date();
      const then = new Date(date);
      let diff = then.getTime() - now.getTime();

      const monthMs = 1000 * 60 * 60 * 24 * 30;
      const dayMs = 1000 * 60 * 60 * 24;
      const hourMs = 1000 * 60 * 60;

      const months = Math.max(0, Math.floor(diff / monthMs));
      diff -= months * monthMs;

      const days = Math.max(0, Math.floor(diff / dayMs));
      diff -= days * dayMs;

      const hours = Math.max(0, Math.floor(diff / hourMs));

      setRemaining({ months, days, hours });
    }

    calculate();
    const id = setInterval(calculate, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, [date]);

  return (
    <div className="bg-white rounded-xl upcoming-card shadow-lg p-6 flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-4xl font-bold uppercase">
          <span className="font-light">We are</span>{" "}
          <span className="text-green-600">Ready</span>{" "}
          <span className="font-light">for</span>
        </h3>
        <Link href="/booking">
          <span className="bg-gradient-to-r from-green-600 to-green-400 text-white px-4 py-2 rounded-lg shadow">
            Book Now
          </span>
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row gap-10 sm:gap-20 items-center md:items-start md:justify-between">
        {/* Logo + Info */}
        <div className="flex flex-col mb-4 md:mb-0">
          <img
            src={item.logo.value[0]?.url}
            alt={item.name.value}
            className="w-40 sm:w-52 h-auto object-contain mr-4"
          />
          <div>
            <p className="font-semibold text-xl text-gray-800">
              {item.date.value}
            </p>
            <p className="text-xl text-gray-500 mt-1">{item.venue.value}</p>
          </div>
        </div>

        {/* Countdown boxes */}
        <div className="flex gap-5">
          {[
            { label: "Months", value: remaining.months },
            { label: "Days", value: remaining.days },
            { label: "Hours", value: remaining.hours },
          ].map((block) => (
            <div
              key={block.label}
              className="bg-white border border-gray-200 rounded-lg shadow p-3 text-center"
            >
              <p className="text-6xl md:text-9xl">{block.value}</p>
              <p className="text-xs text-gray-500 uppercase">{block.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpcomingSection
