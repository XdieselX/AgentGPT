import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState } from "react";

import nextI18NextConfig from "../../next-i18next.config.js";
import {
  FadeIn,
  TemplateCard,
  TEMPLATE_DATA,
  SearchBar
} from "../components";
import {DashboardLayout} from "../layout/dashboard";
import { languages } from "../utils/languages";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");

  const filteredData = TEMPLATE_DATA.filter((model) => {
    const matchQuery = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory =
      category === "" || model.category.toLowerCase() === category.toLowerCase();
    return matchQuery && matchCategory;
  });

  return (
    <DashboardLayout>
      <div className="flex h-full w-full flex-col p-10">
        <FadeIn initialX={-45} initialY={0} delay={0.1}>
          <div>
            <h1 className="text-4xl font-bold text-white">Templates</h1>
            <h2 className="mb-4 text-xl font-thin text-white">
              Customizable and ready to deploy agents
            </h2>
          </div>
        </FadeIn>
        <FadeIn initialY={45} delay={0.1}>
          <SearchBar setSearchQuery={setSearchQuery} setCategory={setCategory} />
          <div className="grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.map((model) => (
              <TemplateCard key={model.name + model.description} model={model} />
            ))}
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
};

export default Templates;

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const supportedLocales = languages.map((language) => language.code);
  const chosenLocale = supportedLocales.includes(locale) ? locale : "en";

  return {
    props: {
      ...(await serverSideTranslations(chosenLocale, nextI18NextConfig.ns)),
    },
  };
};
