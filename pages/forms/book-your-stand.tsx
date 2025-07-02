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
    JsLoader.loadFile(`${Globals.BASE_URL}assets/js/saudiInterest.js`);
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

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="form-2026">
      <section className="py-30 register-interest-form-wrapper-2026">
        <div className="max-w-4xl mx-auto px-4">
          <form
            method="POST"
            action="//ac.strategic.ae/proc.php"
            id="_form_450_"
            noValidate
            className="space-y-6"
          >
            <input type="hidden" name="u" value="450" />
            <input type="hidden" name="f" value="450" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <input
              type="hidden"
              name="or"
              value="166f6d295cbd6a0c39ea33dd80de25f7"
            />
            <input id="emailExist" hidden type="checkbox" />
            <input id="emailValidate" hidden type="checkbox" />
            <input type="hidden" name="field[328]" value={mainsource} />
            <input type="hidden" name="field[329]" value={subsource} />
            <input
              type="hidden"
              name="field[38]"
              value="SWS 2025 Book Your Stand"
            />
            <div className="_form-content form-grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-1 font-medium">
                    First Name / الاسم الأول*
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="custom-input"
                    placeholder="First Name*"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Last Name / اسم الأخير*
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="custom-input"
                    placeholder="Last Name*"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Organization Name / إسم الشركة*
                  </label>
                  <input
                    type="text"
                    id="customer_account"
                    name="customer_account"
                    className="custom-input"
                    placeholder="Organization*"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Email Address / البريد الإلكتروني*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="custom-input"
                    placeholder="Email*"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Job Title / المهنة*
                  </label>
                  <input
                    type="text"
                    id="field[23]"
                    name="field[23]"
                    className="custom-input"
                    placeholder="Job Title*"
                    required
                  />
                </div>

                <div className="">
                  <div className="row">
                    <label>Mobile Number/رقم الهاتف *</label>
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

                <div className="">
                  <label>Country/ الدولة*</label>
                  <select
                    name="field[3]"
                    itemID="field[3]"
                    className="custom-select"
                    required
                  >
                    <option value="">Select Country*</option>

                    {CountriesData.map((country: any, index: number) => {
                      return (
                        <option key={`country-${index}`} value={country.value}>
                          {country.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="options-row px-2">
              <label className="custom-checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="brochure"
                  onClick={() =>
                    handleCheck("brochure", "field_229Yes", "field_229No")
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
                    handleCheck("newsletter", "field_231Yes", "field_231No")
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
                  className="px-4 py-2 bg-black text-white rounded-pill"
                >
                  <span>Submit</span>
                </button>
              </div>
            </div>

            <div className="_form-thank-you " style={{ display: "none" }}></div>
          </form>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const params = context.query;
  const mainsource = params.mainsource || "/";
  const subsource = params.subsource || "/";

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
    },
  };
}
