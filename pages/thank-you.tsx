import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa'
import { FaThreads, FaXTwitter } from 'react-icons/fa6'

import Globals from '@/modules/Globals'
import SpinnerComponent from '@/components/UI/SpinnerComponent'
import Helper from '@/modules/Helper'

export default function ThankYouPage() {
  const lowerText =
    'Stay tuned for more updates and information here on our website and social media.'
  const [pageData, setPageData] = useState<any | null>(null)

  useEffect(() => {
    const languageCode = Helper.getLanguageCode()
    Globals.KontentClient.item('thankyou_page')
      .languageParameter(Helper.getLanguageName(languageCode))
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item)
      })
  }, [])

  if (!pageData) {
    return <SpinnerComponent />
  }

  return (
    <>
      <Head>
        <title>{pageData.page_title.value}</title>
        <meta name="description" content={pageData.metaDescription?.value || ''} />
        <meta name="keywords" content={pageData.metaKeywords?.value || ''} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.aimcongress.com/thank-you" />
      </Head>

      <div className="min-h-screen bg-gray-900 flex items-start justify-center py-20">
        <div className="max-w-xl w-full text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            {pageData.heading.value}
          </h1>
          <div
            className="prose prose-invert mx-auto text-lg"
            dangerouslySetInnerHTML={{ __html: pageData.content.value }}
          />
          <p className="text-gray-400 text-sm">{lowerText}</p>

          <div className="flex justify-center space-x-6">
            {[
              { href: 'https://www.facebook.com/AIMCongress', icon: FaFacebook },
              { href: 'https://whatsapp.com/channel/0029VaArQjN0VycN7W0HdG1Q', icon: FaWhatsapp },
              { href: 'https://www.linkedin.com/company/aim-congress/?viewAsMember=true', icon: FaLinkedin },
              { href: 'https://www.instagram.com/aimcongress/?hl=en', icon: FaInstagram },
              { href: 'https://www.threads.net/@aimcongress', icon: FaThreads },
              { href: 'https://www.youtube.com/@AnnualInvestmentMeeting', icon: FaYoutube },
              { href: 'https://x.com/AIM_Congress', icon: FaXTwitter },
              { href: 'https://www.tiktok.com/@aimcongress?_t=8p4nMoWxZJ3&_r=1', icon: FaTiktok },
            ].map(({ href, icon: Icon }, idx) => (
              <Link key={idx} href={href} target="_blank" className="text-gray-400 hover:text-white transition">
                <Icon size={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
