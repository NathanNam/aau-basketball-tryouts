import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "bg-white shadow-sm border-b border-gray-200", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl font-bold text-gray-900", children: "AAU Basketball Tryouts" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-gray-600 mt-1", children: "SF Bay Area - High School Players (14U+)" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-primary rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
      "svg",
      {
        className: "w-10 h-10 text-white",
        fill: "currentColor",
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" })
      }
    ) }) })
  ] }) }) });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-800 text-white mt-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3", children: "About" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "Your centralized resource for AAU basketball tryout information in the San Francisco Bay Area. Find tryouts for high school-aged players (14U and up)." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3", children: "Coverage Area" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm", children: "San Francisco, Oakland, San Jose, East Bay, South Bay, North Bay, and Peninsula regions." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-3", children: "Contact" }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm", children: [
          "Have a tryout to list or feedback?",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:info@aautryouts.com",
              className: "text-primary-400 hover:text-primary-300 transition-colors",
              children: "info@aautryouts.com"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      currentYear,
      " AAU Basketball Tryouts. All rights reserved."
    ] }) })
  ] }) });
}
const AGE_GROUPS = [
  "14U",
  "15U",
  "16U",
  "17U",
  "18U",
  "High School"
];
const GENDERS = ["Boys", "Girls", "Co-ed"];
function FilterPanel({
  selectedAgeGroups,
  selectedCities,
  selectedGenders,
  searchQuery,
  onAgeGroupChange,
  onCityChange,
  onGenderChange,
  onSearchChange,
  onClearFilters,
  availableCities
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAgeGroup = (ageGroup) => {
    if (selectedAgeGroups.includes(ageGroup)) {
      onAgeGroupChange(selectedAgeGroups.filter((ag) => ag !== ageGroup));
    } else {
      onAgeGroupChange([...selectedAgeGroups, ageGroup]);
    }
  };
  const toggleCity = (city) => {
    if (selectedCities.includes(city)) {
      onCityChange(selectedCities.filter((c) => c !== city));
    } else {
      onCityChange([...selectedCities, city]);
    }
  };
  const toggleGender = (gender) => {
    if (selectedGenders.includes(gender)) {
      onGenderChange(selectedGenders.filter((g) => g !== gender));
    } else {
      onGenderChange([...selectedGenders, gender]);
    }
  };
  const hasActiveFilters = selectedAgeGroups.length > 0 || selectedCities.length > 0 || selectedGenders.length > 0 || searchQuery.length > 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "lg:hidden mb-4", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full bg-white border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors",
        children: [
          /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
            "Filters ",
            hasActiveFilters && "(Active)"
          ] }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 9l-7 7-7-7"
                }
              )
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `bg-white rounded-lg shadow-md p-6 ${isOpen ? "block" : "hidden"} lg:block`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "search",
                className: "block text-sm font-semibold text-gray-900 mb-2",
                children: "Search Teams"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "search",
                  type: "text",
                  value: searchQuery,
                  onChange: (e) => onSearchChange(e.target.value),
                  placeholder: "Search by team name...",
                  className: "w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                }
              ),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "absolute left-3 top-2.5 w-5 h-5 text-gray-400",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Age Group" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: AGE_GROUPS.map((ageGroup) => /* @__PURE__ */ jsxs(
              "label",
              {
                className: "flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded",
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: selectedAgeGroups.includes(ageGroup),
                      onChange: () => toggleAgeGroup(ageGroup),
                      className: "w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700", children: ageGroup })
                ]
              },
              ageGroup
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "Gender" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: GENDERS.map((gender) => /* @__PURE__ */ jsxs(
              "label",
              {
                className: "flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded",
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: selectedGenders.includes(gender),
                      onChange: () => toggleGender(gender),
                      className: "w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700", children: gender })
                ]
              },
              gender
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-3", children: "City" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: availableCities.map((city) => /* @__PURE__ */ jsxs(
              "label",
              {
                className: "flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded",
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: selectedCities.includes(city),
                      onChange: () => toggleCity(city),
                      className: "w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "ml-3 text-sm text-gray-700", children: city })
                ]
              },
              city
            )) })
          ] }),
          hasActiveFilters && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClearFilters,
              className: "w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium",
              children: "Clear All Filters"
            }
          )
        ]
      }
    )
  ] });
}
function TryoutCard({ tryout }) {
  const tryoutDate = new Date(tryout.tryoutDate);
  const formattedDate = tryoutDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const isUpcoming = tryoutDate >= /* @__PURE__ */ new Date();
  const registrationDeadline = tryout.registrationDeadline ? new Date(tryout.registrationDeadline) : null;
  const isDeadlineSoon = registrationDeadline && registrationDeadline <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3);
  const handleCardClick = () => {
    if (tryout.websiteUrl) {
      window.open(tryout.websiteUrl, "_blank", "noopener,noreferrer");
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-200",
      onClick: handleCardClick,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 mb-1", children: tryout.teamName }),
            tryout.organizationName && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: tryout.organizationName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 items-end ml-4", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `px-3 py-1 rounded-full text-xs font-semibold ${tryout.gender === "Boys" ? "bg-blue-100 text-blue-800" : tryout.gender === "Girls" ? "bg-pink-100 text-pink-800" : "bg-purple-100 text-purple-800"}`,
                children: tryout.gender
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800", children: tryout.ageGroup })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-700", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 mr-2 text-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: formattedDate }),
            !isUpcoming && /* @__PURE__ */ jsx("span", { className: "ml-2 text-xs text-gray-500", children: "(Past)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-700", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-5 h-5 mr-2 text-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("span", { children: [
              tryout.startTime,
              tryout.endTime && ` - ${tryout.endTime}`
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-gray-700", children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                className: "w-5 h-5 mr-2 text-primary",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
              tryout.venue,
              ", ",
              tryout.city
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
          tryout.scheduleStatus && /* @__PURE__ */ jsx(
            "span",
            {
              className: `px-2 py-1 rounded text-xs font-semibold ${tryout.scheduleStatus === "confirmed" ? "bg-green-100 text-green-800" : tryout.scheduleStatus === "tentative" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`,
              children: tryout.scheduleStatus === "confirmed" ? "✓ Confirmed" : tryout.scheduleStatus === "tentative" ? "⚠ Tentative" : "ℹ Dates TBA"
            }
          ),
          tryout.skillLevel && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs", children: tryout.skillLevel }),
          tryout.cost && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-accent-100 text-accent-800 rounded text-xs font-semibold", children: tryout.cost }),
          isDeadlineSoon && /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold", children: "Registration Closing Soon" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-4 border-t border-gray-200", children: [
          tryout.websiteUrl && /* @__PURE__ */ jsx(
            "a",
            {
              href: tryout.websiteUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors text-center text-sm font-medium",
              onClick: (e) => e.stopPropagation(),
              children: "Visit Website"
            }
          ),
          tryout.registrationUrl && /* @__PURE__ */ jsx(
            "a",
            {
              href: tryout.registrationUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex-1 bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-600 transition-colors text-center text-sm font-medium",
              onClick: (e) => e.stopPropagation(),
              children: "Register"
            }
          )
        ] })
      ]
    }
  );
}
const tryoutsData = /* @__PURE__ */ JSON.parse(`[{"id":"wildcats-15u-boys","teamName":"Bay Area Wildcats 15U","organizationName":"Bay Area Wildcats Basketball","ageGroup":"15U","gradeLevel":"9th-10th","gender":"Boys","tryoutDate":"2025-02-23","startTime":"12:00 PM","endTime":"2:00 PM","venue":"Oakland High School","address":"1023 MacArthur Blvd","city":"Oakland","zipCode":"94610","contactEmail":"Eastbaywildcatshoops@gmail.com","contactPhone":"(510) 698-9677","websiteUrl":"https://bayareawildcats.org","registrationUrl":"https://docs.google.com/forms/d/1fWKYmtB_MrkCiKg15jHnaYD2eSAZxMZRl-j0Ya2EGv0/edit","cost":"$520 season fee (bimonthly)","notes":"Season runs February-July. Twice weekly practices, twice monthly games. $120 uniform fee.","skillLevel":"All Levels","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"wildcats-16u-boys","teamName":"Bay Area Wildcats 16U","organizationName":"Bay Area Wildcats Basketball","ageGroup":"16U","gradeLevel":"10th-11th","gender":"Boys","tryoutDate":"2025-03-01","startTime":"12:00 PM","endTime":"2:00 PM","venue":"Oakland High School","address":"1023 MacArthur Blvd","city":"Oakland","zipCode":"94610","contactEmail":"Eastbaywildcatshoops@gmail.com","contactPhone":"(510) 698-9677","websiteUrl":"https://bayareawildcats.org","registrationUrl":"https://docs.google.com/forms/d/1fWKYmtB_MrkCiKg15jHnaYD2eSAZxMZRl-j0Ya2EGv0/edit","cost":"$520 season fee (bimonthly)","notes":"Season runs February-July. Focus on fundamentals and character development.","skillLevel":"All Levels","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"wildcats-17u-boys","teamName":"Bay Area Wildcats 17U","organizationName":"Bay Area Wildcats Basketball","ageGroup":"17U","gradeLevel":"11th-12th","gender":"Boys","tryoutDate":"2025-03-02","startTime":"12:00 PM","endTime":"2:00 PM","venue":"Oakland High School","address":"1023 MacArthur Blvd","city":"Oakland","zipCode":"94610","contactEmail":"Eastbaywildcatshoops@gmail.com","contactPhone":"(510) 698-9677","websiteUrl":"https://bayareawildcats.org","registrationUrl":"https://docs.google.com/forms/d/1fWKYmtB_MrkCiKg15jHnaYD2eSAZxMZRl-j0Ya2EGv0/edit","cost":"$520 season fee (bimonthly)","notes":"Elite competition level. College recruiting exposure opportunities.","skillLevel":"Advanced","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"arsenal-15u-boys","teamName":"Team Arsenal 15U","organizationName":"Team Arsenal AAU","ageGroup":"15U","gradeLevel":"9th-10th","gender":"Boys","tryoutDate":"2025-04-05","startTime":"11:00 AM","endTime":"1:00 PM","venue":"Open Gym Premier","address":"31 4th Street","city":"Oakland","zipCode":"94607","contactEmail":"ArsenalAAU@gmail.com","websiteUrl":"https://teamarsenalaau.com","registrationUrl":"https://teamarsenalaau.com/tryouts","notes":"Northern California's premier AAU program. Experienced coaching and top-tier facilities.","skillLevel":"Competitive","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"arsenal-16u-boys","teamName":"Team Arsenal 16U","organizationName":"Team Arsenal AAU","ageGroup":"16U","gradeLevel":"10th-11th","gender":"Boys","tryoutDate":"2025-04-05","startTime":"1:30 PM","endTime":"3:30 PM","venue":"Open Gym Premier","address":"31 4th Street","city":"Oakland","zipCode":"94607","contactEmail":"ArsenalAAU@gmail.com","websiteUrl":"https://teamarsenalaau.com","registrationUrl":"https://teamarsenalaau.com/tryouts","notes":"Focus on player growth on and off the court. Spring/Summer season.","skillLevel":"Competitive","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"arsenal-17u-boys","teamName":"Team Arsenal 17U","organizationName":"Team Arsenal AAU","ageGroup":"17U","gradeLevel":"11th-12th","gender":"Boys","tryoutDate":"2025-04-05","startTime":"4:00 PM","endTime":"6:00 PM","venue":"Open Gym Premier","address":"31 4th Street","city":"Oakland","zipCode":"94607","contactEmail":"ArsenalAAU@gmail.com","websiteUrl":"https://teamarsenalaau.com","registrationUrl":"https://teamarsenalaau.com/tryouts","notes":"Elite level competition. College recruiting showcase opportunities.","skillLevel":"Advanced","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"baycity-hs-boys","teamName":"Bay City Warriors","organizationName":"Bay City Basketball","ageGroup":"High School","gradeLevel":"9th-11th","gender":"Boys","tryoutDate":"2025-03-01","startTime":"9:00 AM","endTime":"11:00 AM","venue":"Bay City Basketball Facility","address":"4550 Geary Blvd","city":"San Francisco","zipCode":"94118","websiteUrl":"https://www.baycitybasketball.com","registrationUrl":"https://baycitybasketball.leagueapps.com/clubteams/3179431-2022-fall-team-program-new-player-tryouts","notes":"Over $1.5 million in scholarships available. Financial assistance for all players.","skillLevel":"All Levels","scheduleStatus":"tba","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"baycity-3ssb-girls","teamName":"Bay City 3SSB","organizationName":"Bay City Basketball","ageGroup":"High School","gradeLevel":"9th-11th","gender":"Girls","tryoutDate":"2025-10-15","startTime":"9:00 AM","endTime":"11:00 AM","venue":"Bay City Basketball Facility","address":"4550 Geary Blvd","city":"San Francisco","zipCode":"94118","websiteUrl":"https://www.baycitybasketball.com","registrationUrl":"https://baycitybasketball.leagueapps.com/clubteams/3179431-2022-fall-team-program-new-player-tryouts","notes":"Fall 2025 tryouts. Girls high school program with scholarship opportunities.","skillLevel":"All Levels","scheduleStatus":"tba","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"baycity-eastbay-hs","teamName":"Bay City East Bay Program","organizationName":"Bay City Basketball","ageGroup":"High School","gradeLevel":"9th-11th","gender":"Co-ed","tryoutDate":"2025-03-15","startTime":"2:00 PM","endTime":"4:00 PM","venue":"East Bay Facility","address":"TBD","city":"Oakland","websiteUrl":"https://www.baycitybasketball.com","registrationUrl":"https://baycitybasketball.leagueapps.com/clubteams/3179431-2022-fall-team-program-new-player-tryouts","notes":"East Bay location. Boys and girls teams. Contact for specific facility address.","skillLevel":"All Levels","scheduleStatus":"tba","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"mambas-14u-boys","teamName":"Bay Area Mambas 14U","organizationName":"Bay Area Mambas AAU","ageGroup":"14U","gradeLevel":"8th-9th","gender":"Boys","tryoutDate":"2025-08-26","startTime":"7:15 PM","endTime":"8:15 PM","venue":"Silliman Center","address":"6800 Mowry Ave","city":"Newark","zipCode":"94560","contactEmail":"bayareamambas@gmail.com","websiteUrl":"https://bayareamambas.com","registrationUrl":"https://forms.gle/VycMMTjPsRpt597C8","notes":"Family first, academics second, basketball third. Tournaments in CA, NV, OR, and East Coast.","skillLevel":"All Levels","scheduleStatus":"confirmed","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"sfba-15u-boys","teamName":"SFBA AAU 15U","organizationName":"SF Bay Area Sports Performance","ageGroup":"15U","gradeLevel":"9th-10th","gender":"Boys","tryoutDate":"2026-03-01","startTime":"TBD","venue":"SF, Daly City, or surrounding city gym","address":"TBD","city":"San Francisco","websiteUrl":"https://www.sfbasportsperformance.com/sfbaaaubasketballsanfrancisco","registrationUrl":"https://docs.google.com/forms/d/e/1FAIpQLSe6YMugNB152qr56opKraG8m1TnjKhVLWLL9RjyRZq7fHqmaw/viewform","notes":"2026 Spring-Summer season (March-July). 6 local tournaments, 2 travel tournaments (Reno in May, Las Vegas in July). Pre-season practices available starting November 2025.","skillLevel":"All Levels","scheduleStatus":"tentative","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"sfba-16u-boys","teamName":"SFBA AAU 16U","organizationName":"SF Bay Area Sports Performance","ageGroup":"16U","gradeLevel":"10th-11th","gender":"Boys","tryoutDate":"2026-03-01","startTime":"TBD","venue":"SF, Daly City, or surrounding city gym","address":"TBD","city":"San Francisco","websiteUrl":"https://www.sfbasportsperformance.com/sfbaaaubasketballsanfrancisco","registrationUrl":"https://docs.google.com/forms/d/e/1FAIpQLSe6YMugNB152qr56opKraG8m1TnjKhVLWLL9RjyRZq7fHqmaw/viewform","notes":"2026 Spring-Summer season (March-July). Competitive travel tournaments. Contact for specific practice location.","skillLevel":"Competitive","scheduleStatus":"tentative","createdAt":"2025-11-16T00:00:00.000Z","updatedAt":"2025-11-16T00:00:00.000Z","source":"Team Website"},{"id":"lakeshow-hs-boys","teamName":"Lakeshow High School Boys","organizationName":"LAKESHOW Bay Area AAU","ageGroup":"High School","gradeLevel":"9th-12th","gender":"Boys","tryoutDate":"2025-03-01","startTime":"TBD","venue":"Oakland Facility","address":"TBD","city":"Oakland","contactEmail":"joeymfuca@gmail.com","contactPhone":"(415) 839-0744","websiteUrl":"https://www.lakeshowhoops.com","registrationUrl":"https://www.lakeshowhoops.com/2025-spring-tryouts","notes":"Spring 2025 season. Program director: Joey Fuca. Contact for specific tryout details and location.","skillLevel":"All Levels","scheduleStatus":"tentative","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"},{"id":"arsenal-14u-boys","teamName":"Team Arsenal 14U","organizationName":"Team Arsenal AAU","ageGroup":"14U","gradeLevel":"8th-9th","gender":"Boys","tryoutDate":"2024-11-12","startTime":"6:45 PM","endTime":"8:15 PM","venue":"Holy Names University","address":"3500 Mountain Blvd","city":"Oakland","zipCode":"94619","contactEmail":"ArsenalAAU@gmail.com","websiteUrl":"https://teamarsenalaau.com","registrationUrl":"https://teamarsenalaau.leagueapps.com","cost":"$25 tryout fee","notes":"2025-2026 Winter Season tryouts. Top-tier facilities and experienced coaching.","skillLevel":"All Levels","scheduleStatus":"confirmed","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"},{"id":"norcalrush-15u-peninsula","teamName":"NorCal Rush 15U Peninsula","organizationName":"NorCal Rush Basketball","ageGroup":"15U","gradeLevel":"9th","gender":"Boys","tryoutDate":"2025-10-01","startTime":"TBD","venue":"Peninsula Location","address":"TBD","city":"San Mateo","contactEmail":"norcalrushaau@gmail.com","websiteUrl":"https://www.norcalrushbasketball.com","registrationUrl":"https://www.norcalrushbasketball.com/tryouts","notes":"Fall 2025 Peninsula tryouts. 90%+ annual high school tryout success rate. Dedicated coaching with high school/college experience.","skillLevel":"Competitive","scheduleStatus":"tentative","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"},{"id":"norcalrush-16u-peninsula","teamName":"NorCal Rush 16U Peninsula","organizationName":"NorCal Rush Basketball","ageGroup":"16U","gradeLevel":"10th","gender":"Boys","tryoutDate":"2025-10-01","startTime":"TBD","venue":"Peninsula Location","address":"TBD","city":"San Mateo","contactEmail":"norcalrushaau@gmail.com","websiteUrl":"https://www.norcalrushbasketball.com","registrationUrl":"https://www.norcalrushbasketball.com/tryouts","notes":"Fall 2025 Peninsula tryouts. Team chemistry building and competitive tournament participation.","skillLevel":"Competitive","scheduleStatus":"tentative","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"},{"id":"norcalrush-17u-peninsula","teamName":"NorCal Rush 17U Peninsula","organizationName":"NorCal Rush Basketball","ageGroup":"17U","gradeLevel":"11th","gender":"Boys","tryoutDate":"2025-10-01","startTime":"TBD","venue":"Peninsula Location","address":"TBD","city":"San Mateo","contactEmail":"norcalrushaau@gmail.com","websiteUrl":"https://www.norcalrushbasketball.com","registrationUrl":"https://www.norcalrushbasketball.com/tryouts","notes":"Fall 2025 Peninsula tryouts. Elite level competition with college recruitment focus.","skillLevel":"Advanced","scheduleStatus":"tentative","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"},{"id":"norcalrush-15u-sf","teamName":"NorCal Rush 15U San Francisco","organizationName":"NorCal Rush Basketball","ageGroup":"15U","gradeLevel":"9th","gender":"Boys","tryoutDate":"2025-10-01","startTime":"TBD","venue":"San Francisco Facility","address":"TBD","city":"San Francisco","contactEmail":"norcalrushaau@gmail.com","websiteUrl":"https://www.norcalrushbasketball.com","registrationUrl":"https://www.norcalrushbasketball.com/sf-fall-2025","notes":"Fall 2025 San Francisco tryouts. Focus on skill development and competitive play.","skillLevel":"Competitive","scheduleStatus":"tentative","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"},{"id":"lava-hs-boys","teamName":"Bay Area Lava High School","organizationName":"Bay Area Lava","ageGroup":"High School","gradeLevel":"9th-12th","gender":"Boys","tryoutDate":"2024-12-01","tryoutEndDate":"2024-12-09","startTime":"TBD","venue":"Tri-Valley Area Facility","address":"TBD","city":"Dublin","contactEmail":"bayarealava@gmail.com","websiteUrl":"https://www.bayarealava.com","registrationUrl":"https://www.bayarealava.com","cost":"$550 per season (4 months) or $1,650 per year","notes":"Division 1 AAU club. Multiple tryout dates: Dec 1, 2, 9. Practices in Pleasanton, Dublin, San Ramon, Castro Valley, Livermore. Three seasons: Winter, Spring/Summer, Fall.","skillLevel":"Competitive","scheduleStatus":"tba","createdAt":"2025-11-17T00:00:00.000Z","updatedAt":"2025-11-17T00:00:00.000Z","source":"Team Website"}]`);
function Home() {
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const tryouts = tryoutsData;
  const availableCities = useMemo(() => {
    const cities = new Set(tryouts.map((t) => t.city));
    return Array.from(cities).sort();
  }, [tryouts]);
  const filteredTryouts = useMemo(() => {
    let filtered = [...tryouts];
    if (selectedAgeGroups.length > 0) {
      filtered = filtered.filter((t) => selectedAgeGroups.includes(t.ageGroup));
    }
    if (selectedCities.length > 0) {
      filtered = filtered.filter((t) => selectedCities.includes(t.city));
    }
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((t) => selectedGenders.includes(t.gender));
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) => t.teamName.toLowerCase().includes(query) || t.organizationName?.toLowerCase().includes(query));
    }
    switch (sortBy) {
      case "date":
        filtered.sort((a, b) => new Date(a.tryoutDate).getTime() - new Date(b.tryoutDate).getTime());
        break;
      case "city":
        filtered.sort((a, b) => a.city.localeCompare(b.city));
        break;
      case "ageGroup":
        filtered.sort((a, b) => a.ageGroup.localeCompare(b.ageGroup));
        break;
    }
    return filtered;
  }, [tryouts, selectedAgeGroups, selectedCities, selectedGenders, searchQuery, sortBy]);
  const clearFilters = () => {
    setSelectedAgeGroups([]);
    setSelectedCities([]);
    setSelectedGenders([]);
    setSearchQuery("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx(FilterPanel, { selectedAgeGroups, selectedCities, selectedGenders, searchQuery, onAgeGroupChange: setSelectedAgeGroups, onCityChange: setSelectedCities, onGenderChange: setSelectedGenders, onSearchChange: setSearchQuery, onClearFilters: clearFilters, availableCities }) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-gray-900", children: [
            filteredTryouts.length,
            " ",
            filteredTryouts.length === 1 ? "Tryout" : "Tryouts",
            " Found"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "sort", className: "text-sm font-medium text-gray-700", children: "Sort by:" }),
            /* @__PURE__ */ jsxs("select", { id: "sort", value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent", children: [
              /* @__PURE__ */ jsx("option", { value: "date", children: "Date" }),
              /* @__PURE__ */ jsx("option", { value: "city", children: "City" }),
              /* @__PURE__ */ jsx("option", { value: "ageGroup", children: "Age Group" })
            ] })
          ] })
        ] }),
        filteredTryouts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md p-12 text-center", children: [
          /* @__PURE__ */ jsx("svg", { className: "mx-auto h-12 w-12 text-gray-400 mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No tryouts found" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Try adjusting your filters or search criteria." })
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6", children: filteredTryouts.map((tryout) => /* @__PURE__ */ jsx(TryoutCard, { tryout }, tryout.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Home as component
};
