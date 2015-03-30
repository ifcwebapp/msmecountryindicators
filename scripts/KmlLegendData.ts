module models {
    export class KmlLegendData {
        public static rows: any = { "DomesticCreditToPrivateSector": { name: "Domestic credit to private sector (% of GDP)", values: [{ n: "1 - 18", c: "#A1D99B" }, { n: "19 - 32", c: "#74C476" }, { n: "33 - 52", c: "#41AB5D" }, { n: "53 - 89", c: "#238B45" }, { n: "90 - 301", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "EnterpriseSurveysChecking": { name: "Percent of firms with a checking or savings account", values: [{ n: "29 - 78", c: "#A1D99B" }, { n: "79 - 91", c: "#74C476" }, { n: "92 - 95", c: "#41AB5D" }, { n: "96 - 98", c: "#238B45" }, { n: "99 - 100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "EnterpriseSurveysCredit": { name: "Percent of firms with a bank loan/line of credit", values: [{ n: "2 - 16", c: "#A1D99B" }, { n: "17 - 29", c: "#74C476" }, { n: "30 - 40", c: "#41AB5D" }, { n: "41 - 49", c: "#238B45" }, { n: "50 - 80", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "GNI": { name: "GNI per capita, Atlas method (current US$)", values: [{ n: "200 - 969", c: "#A1D99B" }, { n: "970 - 3K", c: "#74C476" }, { n: "3K - 7K", c: "#41AB5D" }, { n: "7K - 19K", c: "#238B45" }, { n: "19K - 137K", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "IncomeGroup": { name: "Income Group", values: [{ n: "Low income", c: "#A1D99B" }, { n: "Lower middle income", c: "#74C476" }, { n: "Upper middle income", c: "#41AB5D" }, { n: "High income: non-OECD", c: "#238B45" }, { n: "High income: OECD", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "LaborForceTotal": { name: "Labor Force, Total", values: [{ n: "42K - 742K", c: "#A1D99B" }, { n: "742K - 3M", c: "#74C476" }, { n: "3M - 5M", c: "#41AB5D" }, { n: "5M - 15M", c: "#238B45" }, { n: "15M - 788M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "PopulationTotal": { name: "Total population", values: [{ n: "21K - 535K", c: "#A1D99B" }, { n: "535K - 4M", c: "#74C476" }, { n: "4M - 10M", c: "#41AB5D" }, { n: "10M - 28M", c: "#238B45" }, { n: "28M - 1,351M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "StartingBusinessRank": { name: "Starting a Business Rank", values: [{ n: "1 - 37", c: "#A1D99B" }, { n: "38 - 74", c: "#74C476" }, { n: "75 - 112", c: "#41AB5D" }, { n: "113 - 149", c: "#238B45" }, { n: "150 - 189", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_0": { name: "# of enterprises per 1,000 people, Micro, Most Widely Used", values: [{ n: "0 - 10", c: "#A1D99B" }, { n: "11 - 22", c: "#74C476" }, { n: "23 - 34", c: "#41AB5D" }, { n: "35 - 45", c: "#238B45" }, { n: "46 - 86", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_1": { name: "# of enterprises per 1,000 people, Micro, Statistical Institution", values: [{ n: "0 - 10", c: "#A1D99B" }, { n: "11 - 21", c: "#74C476" }, { n: "22 - 32", c: "#41AB5D" }, { n: "33 - 48", c: "#238B45" }, { n: "49 - 108", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_2": { name: "# of enterprises per 1,000 people, Micro, Ministry of Finance/Central Bank", values: [{ n: "0 - 21", c: "#A1D99B" }, { n: "22 - 34", c: "#74C476" }, { n: "35 - 46", c: "#41AB5D" }, { n: "47 - 66", c: "#238B45" }, { n: "67 - 108", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_3": { name: "# of enterprises per 1,000 people, Micro, SME Associations", values: [{ n: "0 - 12", c: "#A1D99B" }, { n: "13 - 31", c: "#74C476" }, { n: "32 - 37", c: "#41AB5D" }, { n: "38 - 53", c: "#238B45" }, { n: "54 - 86", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_0": { name: "# of enterprises per 1,000 people, MSMEs, Most Widely Used", values: [{ n: "0 - 11", c: "#A1D99B" }, { n: "12 - 25", c: "#74C476" }, { n: "26 - 38", c: "#41AB5D" }, { n: "39 - 48", c: "#238B45" }, { n: "49 - 90", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_1": { name: "# of enterprises per 1,000 people, MSMEs, Statistical Institution", values: [{ n: "0 - 12", c: "#A1D99B" }, { n: "13 - 22", c: "#74C476" }, { n: "23 - 33", c: "#41AB5D" }, { n: "34 - 56", c: "#238B45" }, { n: "57 - 110", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_2": { name: "# of enterprises per 1,000 people, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "0 - 16", c: "#A1D99B" }, { n: "17 - 34", c: "#74C476" }, { n: "35 - 50", c: "#41AB5D" }, { n: "51 - 69", c: "#238B45" }, { n: "70 - 110", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_3": { name: "# of enterprises per 1,000 people, MSMEs, SME Associations", values: [{ n: "0 - 13", c: "#A1D99B" }, { n: "14 - 33", c: "#74C476" }, { n: "34 - 41", c: "#41AB5D" }, { n: "42 - 55", c: "#238B45" }, { n: "56 - 90", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_0": { name: "# of enterprises per 1,000 people, SMEs, Most Widely Used", values: [{ n: "0 - 1", c: "#A1D99B" }, { n: "2", c: "#74C476" }, { n: "3", c: "#41AB5D" }, { n: "4", c: "#238B45" }, { n: "5 - 40", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_1": { name: "# of enterprises per 1,000 people, SMEs, Statistical Institution", values: [{ n: "0 - 1", c: "#A1D99B" }, { n: "2", c: "#74C476" }, { n: "3 - 4", c: "#41AB5D" }, { n: "5 - 7", c: "#238B45" }, { n: "8 - 31", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_2": { name: "# of enterprises per 1,000 people, SMEs, Ministry of Finance/Central Bank", values: [{ n: "0 - 2", c: "#A1D99B" }, { n: "3", c: "#74C476" }, { n: "4", c: "#41AB5D" }, { n: "5 - 8", c: "#238B45" }, { n: "9 - 31", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_3": { name: "# of enterprises per 1,000 people, SMEs, SME Associations", values: [{ n: "0 - 1", c: "#A1D99B" }, { n: "2", c: "#74C476" }, { n: "3", c: "#41AB5D" }, { n: "4", c: "#238B45" }, { n: "5 - 40", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_0": { name: "Employment (% total), Micro, Most Widely Used", values: [{ n: "3 - 17", c: "#A1D99B" }, { n: "18 - 24", c: "#74C476" }, { n: "25 - 32", c: "#41AB5D" }, { n: "33 - 44", c: "#238B45" }, { n: "45 - 77", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_1": { name: "Employment (% total), Micro, Statistical Institution", values: [{ n: "3 - 14", c: "#A1D99B" }, { n: "15 - 21", c: "#74C476" }, { n: "22 - 29", c: "#41AB5D" }, { n: "30 - 41", c: "#238B45" }, { n: "42 - 79", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_2": { name: "Employment (% total), Micro, Ministry of Finance/Central Bank", values: [{ n: "6 - 18", c: "#A1D99B" }, { n: "19 - 27", c: "#74C476" }, { n: "28 - 30", c: "#41AB5D" }, { n: "31 - 36", c: "#238B45" }, { n: "37 - 79", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_3": { name: "Employment (% total), Micro, SME Associations", values: [{ n: "5 - 23", c: "#A1D99B" }, { n: "24 - 27", c: "#74C476" }, { n: "28 - 32", c: "#41AB5D" }, { n: "33 - 44", c: "#238B45" }, { n: "45 - 79", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_0": { name: "Employment (% total), MSMEs, Most Widely Used", values: [{ n: "19 - 50", c: "#A1D99B" }, { n: "51 - 64", c: "#74C476" }, { n: "65 - 70", c: "#41AB5D" }, { n: "71 - 80", c: "#238B45" }, { n: "81 - 95", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_1": { name: "Employment (% total), MSMEs, Statistical Institution", values: [{ n: "19 - 50", c: "#A1D99B" }, { n: "51 - 61", c: "#74C476" }, { n: "62 - 69", c: "#41AB5D" }, { n: "70 - 78", c: "#238B45" }, { n: "79 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_2": { name: "Employment (% total), MSMEs, Ministry of Finance/Central Bank", values: [{ n: "24 - 48", c: "#A1D99B" }, { n: "49 - 62", c: "#74C476" }, { n: "63 - 69", c: "#41AB5D" }, { n: "70 - 78", c: "#238B45" }, { n: "79 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_3": { name: "Employment (% total), MSMEs, SME Associations", values: [{ n: "30 - 52", c: "#A1D99B" }, { n: "53 - 65", c: "#74C476" }, { n: "66 - 69", c: "#41AB5D" }, { n: "70 - 80", c: "#238B45" }, { n: "81 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_0": { name: "Employment (% total), SMEs, Most Widely Used", values: [{ n: "12 - 31", c: "#A1D99B" }, { n: "32 - 35", c: "#74C476" }, { n: "36 - 39", c: "#41AB5D" }, { n: "40 - 44", c: "#238B45" }, { n: "45 - 86", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_1": { name: "Employment (% total), SMEs, Statistical Institution", values: [{ n: "15 - 26", c: "#A1D99B" }, { n: "27 - 33", c: "#74C476" }, { n: "34 - 36", c: "#41AB5D" }, { n: "37 - 41", c: "#238B45" }, { n: "42 - 61", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_2": { name: "Employment (% total), SMEs, Ministry of Finance/Central Bank", values: [{ n: "18 - 30", c: "#A1D99B" }, { n: "31 - 34", c: "#74C476" }, { n: "35 - 39", c: "#41AB5D" }, { n: "40 - 44", c: "#238B45" }, { n: "45 - 51", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_3": { name: "Employment (% total), SMEs, SME Associations", values: [{ n: "12 - 32", c: "#A1D99B" }, { n: "33 - 36", c: "#74C476" }, { n: "37 - 42", c: "#41AB5D" }, { n: "43 - 45", c: "#238B45" }, { n: "46 - 86", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_0": { name: "Firm size definition by assets, Micro, Most Widely Used", values: [{ n: "836 - 189K", c: "#A1D99B" }, { n: "189K - 3M", c: "#74C476" }, { n: "3M", c: "#41AB5D" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_1": { name: "Firm size definition by assets, Micro, Statistical Institution", values: [{ n: "836 - 5K", c: "#A1D99B" }, { n: "5K - 41K", c: "#74C476" }, { n: "41K - 141K", c: "#41AB5D" }, { n: "141K - 244K", c: "#238B45" }, { n: "244K - 3M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_2": { name: "Firm size definition by assets, Micro, Ministry of Finance/Central Bank", values: [{ n: "41K - 104K", c: "#A1D99B" }, { n: "104K - 141K", c: "#74C476" }, { n: "141K - 3M", c: "#41AB5D" }, { n: "3M", c: "#238B45" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_3": { name: "Firm size definition by assets, Micro, SME Associations", values: [{ n: "8K - 70K", c: "#A1D99B" }, { n: "70K - 3M", c: "#74C476" }, { n: "3M", c: "#41AB5D" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_0": { name: "Firm size definition by assets, MSMEs, Most Widely Used", values: [{ n: "6K - 1M", c: "#A1D99B" }, { n: "1M - 54M", c: "#74C476" }, { n: "54M - 60M", c: "#41AB5D" }, { n: "60M", c: "#238B45" }, { n: "60M - 63M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_1": { name: "Firm size definition by assets, MSMEs, Statistical Institution", values: [{ n: "101K - 132K", c: "#A1D99B" }, { n: "132K - 1M", c: "#74C476" }, { n: "1M - 5M", c: "#41AB5D" }, { n: "5M - 54M", c: "#238B45" }, { n: "54M - 60M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_2": { name: "Firm size definition by assets, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "6K - 485K", c: "#A1D99B" }, { n: "485K - 4M", c: "#74C476" }, { n: "4M - 54M", c: "#41AB5D" }, { n: "54M - 60M", c: "#238B45" }, { n: "60M - 60M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_3": { name: "Firm size definition by assets, MSMEs, SME Associations", values: [{ n: "67K - 944K", c: "#A1D99B" }, { n: "944K - 8M", c: "#74C476" }, { n: "8M - 59M", c: "#41AB5D" }, { n: "59M - 60M", c: "#238B45" }, { n: "60M - 63M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_0": { name: "Firm size definition by assets, SMEs, Most Widely Used", values: [{ n: "6K - 1M", c: "#A1D99B" }, { n: "1M - 54M", c: "#74C476" }, { n: "54M - 60M", c: "#41AB5D" }, { n: "60M", c: "#238B45" }, { n: "60M - 63M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_1": { name: "Firm size definition by assets, SMEs, Statistical Institution", values: [{ n: "101K - 132K", c: "#A1D99B" }, { n: "132K - 1M", c: "#74C476" }, { n: "1M - 5M", c: "#41AB5D" }, { n: "5M - 54M", c: "#238B45" }, { n: "54M - 60M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_2": { name: "Firm size definition by assets, SMEs, Ministry of Finance/Central Bank", values: [{ n: "6K - 485K", c: "#A1D99B" }, { n: "485K - 4M", c: "#74C476" }, { n: "4M - 54M", c: "#41AB5D" }, { n: "54M - 60M", c: "#238B45" }, { n: "60M - 60M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_3": { name: "Firm size definition by assets, SMEs, SME Associations", values: [{ n: "67K - 944K", c: "#A1D99B" }, { n: "944K - 8M", c: "#74C476" }, { n: "8M - 59M", c: "#41AB5D" }, { n: "59M - 60M", c: "#238B45" }, { n: "60M - 63M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_0": { name: "Firm size definition by # of employees, Micro, Most Widely Used", values: [{ n: "3 - 4", c: "#A1D99B" }, { n: "5 - 9", c: "#74C476" }, { n: "10", c: "#41AB5D" }, { n: "10 - 25", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_1": { name: "Firm size definition by # of employees, Micro, Statistical Institution", values: [{ n: "1 - 4", c: "#A1D99B" }, { n: "5 - 9", c: "#74C476" }, { n: "10", c: "#41AB5D" }, { n: "10 - 25", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_2": { name: "Firm size definition by # of employees, Micro, Ministry of Finance/Central Bank", values: [{ n: "1 - 9", c: "#A1D99B" }, { n: "10", c: "#74C476" }, { n: "10 - 20", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_3": { name: "Firm size definition by # of employees, Micro, SME Associations", values: [{ n: "1 - 9", c: "#A1D99B" }, { n: "10", c: "#74C476" }, { n: "10 - 20", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_0": { name: "Firm size definition by # of employees, MSMEs, Most Widely Used", values: [{ n: "7 - 99", c: "#A1D99B" }, { n: "100 - 198", c: "#74C476" }, { n: "199 - 249", c: "#41AB5D" }, { n: "250", c: "#238B45" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_1": { name: "Firm size definition by # of employees, MSMEs, Statistical Institution", values: [{ n: "10 - 99", c: "#A1D99B" }, { n: "100", c: "#74C476" }, { n: "100 - 249", c: "#41AB5D" }, { n: "250", c: "#238B45" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_2": { name: "Firm size definition by # of employees, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "10 - 99", c: "#A1D99B" }, { n: "100 - 249", c: "#74C476" }, { n: "250", c: "#41AB5D" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_3": { name: "Firm size definition by # of employees, MSMEs, SME Associations", values: [{ n: "7 - 99", c: "#A1D99B" }, { n: "100 - 249", c: "#74C476" }, { n: "250", c: "#41AB5D" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_0": { name: "Firm size definition by # of employees, SMEs, Most Widely Used", values: [{ n: "7 - 99", c: "#A1D99B" }, { n: "100 - 198", c: "#74C476" }, { n: "199 - 249", c: "#41AB5D" }, { n: "250", c: "#238B45" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_1": { name: "Firm size definition by # of employees, SMEs, Statistical Institution", values: [{ n: "10 - 99", c: "#A1D99B" }, { n: "100", c: "#74C476" }, { n: "100 - 249", c: "#41AB5D" }, { n: "250", c: "#238B45" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_2": { name: "Firm size definition by # of employees, SMEs, Ministry of Finance/Central Bank", values: [{ n: "10 - 99", c: "#A1D99B" }, { n: "100 - 249", c: "#74C476" }, { n: "250", c: "#41AB5D" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_3": { name: "Firm size definition by # of employees, SMEs, SME Associations", values: [{ n: "7 - 99", c: "#A1D99B" }, { n: "100 - 249", c: "#74C476" }, { n: "250", c: "#41AB5D" }, { n: "250 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_0": { name: "Firm size definition by turnover, Micro, Most Widely Used", values: [{ n: "501 - 68K", c: "#A1D99B" }, { n: "68K - 251K", c: "#74C476" }, { n: "251K - 3M", c: "#41AB5D" }, { n: "3M", c: "#238B45" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_1": { name: "Firm size definition by turnover, Micro, Statistical Institution", values: [{ n: "501 - 33K", c: "#A1D99B" }, { n: "33K - 96K", c: "#74C476" }, { n: "96K - 100K", c: "#41AB5D" }, { n: "100K - 3M", c: "#238B45" }, { n: "3M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_2": { name: "Firm size definition by turnover, Micro, Ministry of Finance/Central Bank", values: [{ n: "29K - 100K", c: "#A1D99B" }, { n: "100K - 111K", c: "#74C476" }, { n: "111K - 191K", c: "#41AB5D" }, { n: "191K - 3M", c: "#238B45" }, { n: "3M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_3": { name: "Firm size definition by turnover, Micro, SME Associations", values: [{ n: "21K - 68K", c: "#A1D99B" }, { n: "68K - 290K", c: "#74C476" }, { n: "290K - 3M", c: "#41AB5D" }, { n: "3M", c: "#238B45" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_0": { name: "Firm size definition by turnover, MSMEs, Most Widely Used", values: [{ n: "41K - 2M", c: "#A1D99B" }, { n: "2M - 11M", c: "#74C476" }, { n: "11M - 70M", c: "#41AB5D" }, { n: "70M", c: "#238B45" }, { n: "70M - 79M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_1": { name: "Firm size definition by turnover, MSMEs, Statistical Institution", values: [{ n: "41K - 881K", c: "#A1D99B" }, { n: "881K - 2M", c: "#74C476" }, { n: "2M - 11M", c: "#41AB5D" }, { n: "11M - 70M", c: "#238B45" }, { n: "70M - 79M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_2": { name: "Firm size definition by turnover, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "110K - 485K", c: "#A1D99B" }, { n: "485K - 2M", c: "#74C476" }, { n: "2M", c: "#41AB5D" }, { n: "2M - 5M", c: "#238B45" }, { n: "5M - 70M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_3": { name: "Firm size definition by turnover, MSMEs, SME Associations", values: [{ n: "110K - 2M", c: "#A1D99B" }, { n: "2M - 10M", c: "#74C476" }, { n: "10M - 63M", c: "#41AB5D" }, { n: "63M - 70M", c: "#238B45" }, { n: "70M - 73M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_0": { name: "Firm size definition by turnover, SMEs, Most Widely Used", values: [{ n: "41K - 2M", c: "#A1D99B" }, { n: "2M - 11M", c: "#74C476" }, { n: "11M - 70M", c: "#41AB5D" }, { n: "70M", c: "#238B45" }, { n: "70M - 79M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_1": { name: "Firm size definition by turnover, SMEs, Statistical Institution", values: [{ n: "41K - 881K", c: "#A1D99B" }, { n: "881K - 2M", c: "#74C476" }, { n: "2M - 11M", c: "#41AB5D" }, { n: "11M - 70M", c: "#238B45" }, { n: "70M - 79M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_2": { name: "Firm size definition by turnover, SMEs, Ministry of Finance/Central Bank", values: [{ n: "110K - 485K", c: "#A1D99B" }, { n: "485K - 2M", c: "#74C476" }, { n: "2M", c: "#41AB5D" }, { n: "2M - 5M", c: "#238B45" }, { n: "5M - 70M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_3": { name: "Firm size definition by turnover, SMEs, SME Associations", values: [{ n: "110K - 2M", c: "#A1D99B" }, { n: "2M - 10M", c: "#74C476" }, { n: "10M - 63M", c: "#41AB5D" }, { n: "63M - 70M", c: "#238B45" }, { n: "70M - 73M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_0": { name: "Enterprises (% of total), Micro, Most Widely Used", values: [{ n: "2 - 75", c: "#A1D99B" }, { n: "76 - 87", c: "#74C476" }, { n: "88 - 92", c: "#41AB5D" }, { n: "93 - 95", c: "#238B45" }, { n: "96 - 100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_1": { name: "Enterprises (% of total), Micro, Statistical Institution", values: [{ n: "2 - 66", c: "#A1D99B" }, { n: "67 - 75", c: "#74C476" }, { n: "76 - 89", c: "#41AB5D" }, { n: "90 - 96", c: "#238B45" }, { n: "97 - 100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_2": { name: "Enterprises (% of total), Micro, Ministry of Finance/Central Bank", values: [{ n: "26 - 50", c: "#A1D99B" }, { n: "51 - 75", c: "#74C476" }, { n: "76 - 81", c: "#41AB5D" }, { n: "82 - 91", c: "#238B45" }, { n: "92 - 94", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_3": { name: "Enterprises (% of total), Micro, SME Associations", values: [{ n: "26 - 81", c: "#A1D99B" }, { n: "82 - 89", c: "#74C476" }, { n: "90 - 93", c: "#41AB5D" }, { n: "94", c: "#238B45" }, { n: "95 - 100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_0": { name: "Enterprises (% of total), MSMEs, Most Widely Used", values: [{ n: "75 - 97", c: "#A1D99B" }, { n: "98 - 99", c: "#74C476" }, { n: "100 - 99", c: "#41AB5D" }, { n: "100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_1": { name: "Enterprises (% of total), MSMEs, Statistical Institution", values: [{ n: "85 - 96", c: "#A1D99B" }, { n: "97 - 98", c: "#74C476" }, { n: "99", c: "#41AB5D" }, { n: "100 - 99", c: "#238B45" }, { n: "100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_2": { name: "Enterprises (% of total), MSMEs, Ministry of Finance/Central Bank", values: [{ n: "90 - 93", c: "#A1D99B" }, { n: "94 - 97", c: "#74C476" }, { n: "98", c: "#41AB5D" }, { n: "99", c: "#238B45" }, { n: "100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_3": { name: "Enterprises (% of total), MSMEs, SME Associations", values: [{ n: "75 - 97", c: "#A1D99B" }, { n: "98 - 99", c: "#74C476" }, { n: "100 - 99", c: "#41AB5D" }, { n: "100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_0": { name: "Enterprises (% of total), SMEs, Most Widely Used", values: [{ n: "0 - 4", c: "#A1D99B" }, { n: "5 - 7", c: "#74C476" }, { n: "8 - 12", c: "#41AB5D" }, { n: "13 - 22", c: "#238B45" }, { n: "23 - 96", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_1": { name: "Enterprises (% of total), SMEs, Statistical Institution", values: [{ n: "0 - 6", c: "#A1D99B" }, { n: "7 - 11", c: "#74C476" }, { n: "12 - 22", c: "#41AB5D" }, { n: "23 - 37", c: "#238B45" }, { n: "38 - 96", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_2": { name: "Enterprises (% of total), SMEs, Ministry of Finance/Central Bank", values: [{ n: "6 - 11", c: "#A1D99B" }, { n: "12 - 23", c: "#74C476" }, { n: "24 - 23", c: "#41AB5D" }, { n: "24 - 64", c: "#238B45" }, { n: "65 - 72", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_3": { name: "Enterprises (% of total), SMEs, SME Associations", values: [{ n: "0 - 4", c: "#A1D99B" }, { n: "5 - 6", c: "#74C476" }, { n: "7 - 10", c: "#41AB5D" }, { n: "11 - 16", c: "#238B45" }, { n: "17 - 72", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_0": { name: "Value added, Micro, Most Widely Used", values: [{ n: "7 - 16", c: "#A1D99B" }, { n: "17 - 19", c: "#74C476" }, { n: "20 - 23", c: "#41AB5D" }, { n: "24 - 26", c: "#238B45" }, { n: "27 - 35", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_1": { name: "Value added, Micro, Statistical Institution", values: [{ n: "7 - 11", c: "#A1D99B" }, { n: "12 - 19", c: "#74C476" }, { n: "20 - 19", c: "#41AB5D" }, { n: "20 - 31", c: "#238B45" }, { n: "32", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_2": { name: "Value added, Micro, Ministry of Finance/Central Bank", values: [{ n: "8 - 11", c: "#A1D99B" }, { n: "12 - 19", c: "#74C476" }, { n: "20 - 31", c: "#41AB5D" }, { n: "32 - 39", c: "#238B45" }, { n: "40", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_3": { name: "Value added, Micro, SME Associations", values: [{ n: "11 - 16", c: "#A1D99B" }, { n: "17 - 19", c: "#74C476" }, { n: "20 - 23", c: "#41AB5D" }, { n: "24 - 26", c: "#238B45" }, { n: "27 - 40", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_0": { name: "Value added, MSMEs, Most Widely Used", values: [{ n: "8 - 28", c: "#A1D99B" }, { n: "29 - 49", c: "#74C476" }, { n: "50 - 58", c: "#41AB5D" }, { n: "59 - 67", c: "#238B45" }, { n: "68 - 77", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_1": { name: "Value added, MSMEs, Statistical Institution", values: [{ n: "19 - 30", c: "#A1D99B" }, { n: "31 - 46", c: "#74C476" }, { n: "47 - 51", c: "#41AB5D" }, { n: "52 - 58", c: "#238B45" }, { n: "59 - 76", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_2": { name: "Value added, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "8 - 24", c: "#A1D99B" }, { n: "25 - 46", c: "#74C476" }, { n: "47 - 58", c: "#41AB5D" }, { n: "59", c: "#238B45" }, { n: "60 - 76", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_3": { name: "Value added, MSMEs, SME Associations", values: [{ n: "11 - 30", c: "#A1D99B" }, { n: "31 - 53", c: "#74C476" }, { n: "54 - 60", c: "#41AB5D" }, { n: "61 - 68", c: "#238B45" }, { n: "69 - 77", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_0": { name: "Value added, SMEs, Most Widely Used", values: [{ n: "6 - 30", c: "#A1D99B" }, { n: "31 - 36", c: "#74C476" }, { n: "37 - 38", c: "#41AB5D" }, { n: "39 - 42", c: "#238B45" }, { n: "43 - 58", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_1": { name: "Value added, SMEs, Statistical Institution", values: [{ n: "14 - 24", c: "#A1D99B" }, { n: "25 - 33", c: "#74C476" }, { n: "34 - 37", c: "#41AB5D" }, { n: "38 - 40", c: "#238B45" }, { n: "41 - 58", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_2": { name: "Value added, SMEs, Ministry of Finance/Central Bank", values: [{ n: "17 - 27", c: "#A1D99B" }, { n: "28 - 37", c: "#74C476" }, { n: "38 - 40", c: "#41AB5D" }, { n: "41 - 50", c: "#238B45" }, { n: "51", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_3": { name: "Value added, SMEs, SME Associations", values: [{ n: "6 - 34", c: "#A1D99B" }, { n: "35 - 37", c: "#74C476" }, { n: "38 - 41", c: "#41AB5D" }, { n: "42 - 47", c: "#238B45" }, { n: "48 - 56", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] } }
    }
}
