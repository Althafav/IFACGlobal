import SpinnerComponent from "@/components/UI/SpinnerComponent";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect } from "react";

import { Articlespage } from "@/models/articlespage";
import { Articleitem } from "@/models/articleitem";
import { Contactpage } from "@/models/contactpage";
import GenericData from "@/constants/countryData";
import JsLoader from "@/modules/JsLoader";

interface Props {
  mainsource: string;
  subsource: string;
  CountriesCode: any[];
  CountriesData: any[];
  pageData: Contactpage;
  attendAs: string;
}

export default function RegisterPage({
  mainsource,
  subsource,
  CountriesCode,
  CountriesData,
  pageData,

}: Props) {
//   useEffect(() => {
//     JsLoader.loadFile(`${Globals.BASE_URL}assets/js/interest.js`);
//   }, []);
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

  const [selectedShowItem, setSelectedShowItem] = React.useState<string>("");

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div>
      <div className="article-page-wrapper">
        <div className="herosection-wrapper-home relative w-full sm:h-[300px] overflow-hidden">
          <img
            src={pageData.bannerimage.value[0]?.url}
            alt=""
            className="absolute inset-0 w-full h-full object-cover  white-linear-to-bottom-mask"
          />
        </div>
        <div className="bg-white container mx-auto py-10">
          <span
            dangerouslySetInnerHTML={{ __html: pageData.bannerheading.value }}
            className="text-black text-2xl sm:text-3xl lg:text-6xl  max-w-4xl leading-tight mb-2"
          ></span>

          <div className="py-3">
            <span
              className="text-lg text-black"
              dangerouslySetInnerHTML={{
                __html: pageData.bannersubheading.value,
              }}
            />
          </div>
        </div>

        <div className="container mx-auto showitems-wrapper py-10">
          <h2 className="text-2xl uppercase font-medium tracking-tighter mb-10">
            {pageData.formheading.value}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {pageData.showitems.value.map((item: any, idx: number) => (
              <button
                type="button"
                onClick={() => setSelectedShowItem(item.name.value)}
                key={idx}
                className={`p-10 text-left transition sm:hover:-translate-y-3 sm:hover:shadow-2xl rounded-2xl  ${
                  selectedShowItem === item.name.value ? "bg-gray-200 shadow-2xl -translate-y-3" : ""
                }`}
              >
                <img
                  src={item.logo.value[0]?.url}
                  alt={item.name.value}
                  className="w-[150px] object-contain mb-3"
                />
                <p className="font-medium text-xl">{item.date.value}</p>
                <p>{item.venue.value}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="register-interest-form-wrapper-2026 container mx-auto">
          <div className="row p-10 rounded-2xl border">
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
                      value={`Contact ${selectedShowItem} 2026`}
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

                            {CountriesData.map(
                              (country: any, index: number) => {
                                return (
                                  <option
                                    key={`country-${index}`}
                                    value={country.value}
                                  >
                                    {country.label}
                                  </option>
                                );
                              }
                            )}
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
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const params = context.query;
  const mainsource = params.mainsource || "Website";
  const subsource = params.subsource || "/";

  const [CountriesCode, CountriesData] = await Promise.all([
    GenericData.countryCodes(),
    GenericData.countries(),
  ]);

  const datasourceStr: string = await Globals.KontentClient.item("contact_page")
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });
  const pageData: Contactpage = JSON.parse(datasourceStr);
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
