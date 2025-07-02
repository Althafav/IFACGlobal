import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Homepageglobal2026 } from "@/models/homepageglobal2026";

interface PageDataProps {
  pageData: Homepageglobal2026 | null;
}

const UpcomingSection: React.FC<PageDataProps> = ({ pageData }) => {
  if (!pageData) return null;

  return (
    <div className="upcoming-section-wrapper sm:relative sm:-top-30 sm:py-0 pb-20">
      <div className="max-w-4xl mx-auto">
        {pageData.upcomingitem.value.map((item: any) => (
          <UpcomingCard
            key={item.system.id}
            item={item}
            date={pageData.upcomingdate.value}
            ctaName={pageData.upcomingctaname.value}
            ctaLink={pageData.upcomingctalink.value}
          />
        ))}
      </div>
    </div>
  );
};

function UpcomingCard({
  item,
  date,
  ctaName,
  ctaLink,
}: {
  item: any;
  date: any;
  ctaName: string;
  ctaLink: string;
}) {
  const [remaining, setRemaining] = useState({
    months: 0,
    days: 0,
    hours: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculate() {
      const now = Date.now();
      const then = new Date(date).getTime();
      let diff = Math.max(0, then - now);

      const msInMonth = 1000 * 60 * 60 * 24 * 30;
      const msInDay = 1000 * 60 * 60 * 24;
      const msInHour = 1000 * 60 * 60;
      const msInSec = 1000;

      const months = Math.floor(diff / msInMonth);
      diff -= months * msInMonth;

      const days = Math.floor(diff / msInDay);
      diff -= days * msInDay;

      const hours = Math.floor(diff / msInHour);
      diff -= hours * msInHour;

      // diff now < 1 hour
      const seconds = Math.floor(diff / msInSec) % 60;

      setRemaining({ months, days, hours, seconds });
    }

    calculate();
    const intervalId = setInterval(calculate, 1000);
    return () => clearInterval(intervalId);
  }, [date]);

  const blocks = [
    { label: "Months", value: remaining.months },
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="bg-white rounded-xl upcoming-card shadow-lg p-6 flex flex-col space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-4xl font-bold uppercase">
          <span className="font-medium">We are</span> <span>Ready</span>{" "}
          <span className="font-medium">for</span>
        </h3>
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
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 flex-wrap">
            {blocks.map((block) => (
              <div
                key={block.label}
                className="bg-white border border-gray-200 rounded-lg shadow p-3 text-center"
              >
                <p className="text-6xl md:text-6xl">
                  {String(block.value).padStart(2, "0")}
                </p>
                <p className="text-xs text-gray-500 uppercase">{block.label}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href={ctaLink}>
              <span className="bg-gradient-to-r from-green-900 to-green-400 text-white text-2xl px-4 py-2 rounded-lg shadow">
                {ctaName}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpcomingSection;
