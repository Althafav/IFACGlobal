// pages/register.tsx

import Head from "next/head";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import GenericData from "@/constants/countryData";

import { Form2026 } from "@/models/form2026";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import Script from "next/script";

interface CountryData {
  label: string;
  value: string;
}

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: CountryData[];
  CountriesData: CountryData[];
  pageData: Form2026;
  attendAs: string;
}

export default function RegisterPage({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,
  attendAs,
}: Props) {
  useEffect(() => {
    JsLoader.loadFile(`${Globals.BASE_URL}assets/js/registerInterest.js`);
  }, []);

  const handleCheck = (
    checkboxId: string,
    yesFieldId: string,
    noFieldId: string
  ) => {
    const checkbox = document.getElementById(
      checkboxId
    ) as HTMLInputElement | null;
    const yesInput = document.getElementById(
      yesFieldId
    ) as HTMLInputElement | null;
    const noInput = document.getElementById(
      noFieldId
    ) as HTMLInputElement | null;
    if (!checkbox || !yesInput || !noInput) {
      console.warn("Missing checkbox or hidden input fields.");
      return;
    }

    if (checkbox.checked) {
      yesInput.checked = true;
      noInput.checked = false;
    } else {
      yesInput.checked = false;
      noInput.checked = true;
    }
  };

  useEffect(() => {
    if (attendAs) {
      const formatted = attendAs.toLowerCase();
      const options = [
        "Exhibitor",
        "Sponsor",
        "Supporting Partner",
        "Media Partner",
        "Investment Destination Presenter",
        "Conference/Workshop Delegate",
        "Visitor",
      ];

      options.forEach((label, index) => {
        if (label.toLowerCase() === formatted) {
          const checkbox = document.getElementById(
            `field_228_${index}`
          ) as HTMLInputElement;
          if (checkbox) checkbox.checked = true;
        }
      });
    }
  }, [attendAs]);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="form-2026">
      <Head>
        <title>{`${Globals.SITE_NAME} | Register Your Interest`}</title>
        <meta
          name="title"
          content={`${Globals.SITE_NAME} | Register Your Interest`}
        />
        <meta
          name="description"
          content={`${Globals.SITE_NAME} | Register now to join AIM Congress 2024 in Abu Dhabi and connect`}
        />
      </Head>

      <div className="register-interest-form-wrapper-2026 container ">
        <div className="form-banner-wrapper aspect-ratio-box">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="form-banner-img"
            
          />
        </div>
        <div className="row py-lg-5 py-3 px-lg-3">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <form
                  method="POST"
                  action="//ac.strategic.ae/proc.php"
                  id="_form_394_"
                  noValidate
                >
                  <input type="hidden" name="u" value="394" />
                  <input type="hidden" name="f" value="394" />
                  <input type="hidden" name="s" />
                  <input type="hidden" name="c" value="0" />
                  <input type="hidden" name="m" value="0" />
                  <input type="hidden" name="act" value="sub" />
                  <input type="hidden" name="v" value="2" />
                  <input
                    type="hidden"
                    name="or"
                    value="87dd3af2187abe9a07709ed7f1daacda"
                  />
                  <input
                    type="hidden"
                    name="field[38]"
                    value={pageData.formsubmit.value}
                  />
                  <input type="hidden" name="field[328]" value={mainsource} />
                  <input type="hidden" name="field[329]" value={subsource} />

                  <div className="_form-content form-grid">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="col-lg-6">
                        <input
                          type="text"
                          itemID="firstname"
                          name="firstname"
                          className="custom-input"
                          placeholder="First Name *"
                          required
                        />
                      </div>

                      <div className="col-lg-6">
                        <input
                          type="text"
                          itemID="lastname"
                          name="lastname"
                          className="custom-input"
                          placeholder="Last Name *"
                          required
                        />
                      </div>

                      <div className="col-lg-6">
                        <input
                          type="text"
                          itemID="customer_account"
                          name="customer_account"
                          className="custom-input"
                          placeholder="Organization *"
                          required
                        />
                      </div>

                      <div className="col-lg-6">
                        <input
                          type="email"
                          itemID="email"
                          name="email"
                          className="custom-input"
                          placeholder="Email *"
                          required
                        />
                      </div>

                      <div className="col-lg-6">
                        <input
                          type="text"
                          name="field[23]"
                          placeholder="Job Title *"
                          required
                          className="custom-input"
                        />
                      </div>

                      <div className="col-lg-6">
                        <div className="row">
                          <div className="phone-wrapper">
                            <select
                              name="phoneCode"
                              required
                              className="custom-select"
                            >
                              <option value="">Code</option>
                              {CountriesCode.map((code, i) => (
                                <option key={i} value={code.value}>
                                  {code.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              name="field[12]"
                              placeholder="Mobile Phone *"
                              required
                              className="custom-input phone"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <select
                          name="field[3]"
                          itemID="field[3]"
                          className="custom-select"
                          required
                        >
                          <option value="">Select Country*</option>

                          {CountriesData.map((country: any, index: number) => {
                            return (
                              <option
                                key={`country-${index}`}
                                value={country.value}
                              >
                                {country.label}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                     

                   
                    </div>

                    <div className="options-row px-2">
                      <label className="custom-checkbox">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="brochure"
                          onClick={() =>
                            handleCheck(
                              "brochure",
                              "field_229Yes",
                              "field_229No"
                            )
                          }
                        />
                        <span>Download Brochure</span>
                      </label>
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="form-check-input"
                          onClick={() =>
                            handleCheck(
                              "newsletter",
                              "field_231Yes",
                              "field_231No"
                            )
                          }
                        />
                        <span>Subscribe to our Newsletter</span>
                      </label>
                    </div>

                    <div className="row px-3">
                      <div className="col-12 my-4">
                        <div
                          className="g-recaptcha"
                          data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
                        ></div>
                      </div>
                      <div className="col-12 text-start">
                        <button
                          id="_form_394_submit"
                          type="submit"
                          className="px-4 py-2 bg-black rounded-full text-white rounded-pill"
                        >
                          <span>Submit</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="_form-thank-you "
                    style={{ display: "none" }}
                  ></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const params = context.query;
  const mainsource = params.mainsource || "/";
  const subsource = params.subsource || "/";
  const attendAs = params.attend || "";

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  const datasourceStr: string = await Globals.KontentClient.item(
    "book_your_stand___form"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });
  const pageData: Form2026 = JSON.parse(datasourceStr);
  return {
    props: {
      mainsource,
      subsource,
      CountriesCode,
      CountriesData,
      pageData,
      attendAs,
    },
  };
}
