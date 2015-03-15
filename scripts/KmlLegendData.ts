module models {
    export class KmlLegendData {
        public static rows: any = { "DomesticCreditToPrivateSector": { name: "Domestic credit to private sector (% of GDP)", values: [{ n: "2 - 61", c: "#A1D99B" }, { n: "62 - 121", c: "#74C476" }, { n: "122 - 181", c: "#41AB5D" }, { n: "182 - 240", c: "#238B45" }, { n: "241 - 300", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "EnterpriseSurveysChecking": { name: "Percent of firms with a checking or savings account", values: [{ n: "30 - 43", c: "#A1D99B" }, { n: "44 - 57", c: "#74C476" }, { n: "58 - 71", c: "#41AB5D" }, { n: "72 - 85", c: "#238B45" }, { n: "86 - 100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "EnterpriseSurveysCredit": { name: "Percent of firms with a bank loan/line of credit", values: [{ n: "3 - 18", c: "#A1D99B" }, { n: "19 - 33", c: "#74C476" }, { n: "34 - 48", c: "#41AB5D" }, { n: "49 - 64", c: "#238B45" }, { n: "65 - 79", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "GNI": { name: "GNI per capita, Atlas method (current US$)", values: [{ n: "200 - 28K", c: "#A1D99B" }, { n: "28K - 55K", c: "#74C476" }, { n: "55K - 82K", c: "#41AB5D" }, { n: "82K - 109K", c: "#238B45" }, { n: "109K - 137K", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "IncomeGroup": { name: "Income Group", values: [{ n: "Low income", c: "#A1D99B" }, { n: "Lower middle income", c: "#74C476" }, { n: "Upper middle income", c: "#41AB5D" }, { n: "High income: non-OECD", c: "#238B45" }, { n: "High income: OECD", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "LaborForceTotal": { name: "Labor Force, Total", values: [{ n: "42K - 158M", c: "#A1D99B" }, { n: "158M - 315M", c: "#74C476" }, { n: "315M - 473M", c: "#41AB5D" }, { n: "473M - 630M", c: "#238B45" }, { n: "630M - 788M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "PopulationTotal": { name: "Total population", values: [{ n: "21K - 270M", c: "#A1D99B" }, { n: "270M - 540M", c: "#74C476" }, { n: "540M - 810M", c: "#41AB5D" }, { n: "810M - 1,081M", c: "#238B45" }, { n: "1,081M - 1,351M", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "StartingBusinessRank": { name: "Starting a Business Rank", values: [{ n: "1 - 38", c: "#A1D99B" }, { n: "39 - 76", c: "#74C476" }, { n: "77 - 113", c: "#41AB5D" }, { n: "114 - 151", c: "#238B45" }, { n: "152 - 189", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_0": { name: "# of enterprises per 1,000 people, Micro, Most Widely Used", values: [{ n: "1 - 17", c: "#A1D99B" }, { n: "18 - 34", c: "#74C476" }, { n: "35 - 51", c: "#41AB5D" }, { n: "52 - 68", c: "#238B45" }, { n: "69 - 85", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_1": { name: "# of enterprises per 1,000 people, Micro, Statistical Institution", values: [{ n: "1 - 21", c: "#A1D99B" }, { n: "22 - 43", c: "#74C476" }, { n: "44 - 64", c: "#41AB5D" }, { n: "65 - 86", c: "#238B45" }, { n: "87 - 107", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_2": { name: "# of enterprises per 1,000 people, Micro, Ministry of Finance/Central Bank", values: [{ n: "1 - 21", c: "#A1D99B" }, { n: "22 - 43", c: "#74C476" }, { n: "44 - 64", c: "#41AB5D" }, { n: "65 - 86", c: "#238B45" }, { n: "87 - 107", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_Micro_3": { name: "# of enterprises per 1,000 people, Micro, SME Associations", values: [{ n: "1 - 17", c: "#A1D99B" }, { n: "18 - 34", c: "#74C476" }, { n: "35 - 51", c: "#41AB5D" }, { n: "52 - 68", c: "#238B45" }, { n: "69 - 85", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_0": { name: "# of enterprises per 1,000 people, MSMEs, Most Widely Used", values: [{ n: "1 - 18", c: "#A1D99B" }, { n: "19 - 36", c: "#74C476" }, { n: "37 - 54", c: "#41AB5D" }, { n: "55 - 72", c: "#238B45" }, { n: "73 - 89", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_1": { name: "# of enterprises per 1,000 people, MSMEs, Statistical Institution", values: [{ n: "1 - 22", c: "#A1D99B" }, { n: "23 - 44", c: "#74C476" }, { n: "45 - 65", c: "#41AB5D" }, { n: "66 - 87", c: "#238B45" }, { n: "88 - 109", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_2": { name: "# of enterprises per 1,000 people, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "1 - 22", c: "#A1D99B" }, { n: "23 - 44", c: "#74C476" }, { n: "45 - 65", c: "#41AB5D" }, { n: "66 - 87", c: "#238B45" }, { n: "88 - 109", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_MSMEs_3": { name: "# of enterprises per 1,000 people, MSMEs, SME Associations", values: [{ n: "1 - 18", c: "#A1D99B" }, { n: "19 - 36", c: "#74C476" }, { n: "37 - 53", c: "#41AB5D" }, { n: "54 - 71", c: "#238B45" }, { n: "72 - 89", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_0": { name: "# of enterprises per 1,000 people, SMEs, Most Widely Used", values: [{ n: "1 - 7", c: "#A1D99B" }, { n: "8 - 15", c: "#74C476" }, { n: "16 - 23", c: "#41AB5D" }, { n: "24 - 31", c: "#238B45" }, { n: "32 - 39", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_1": { name: "# of enterprises per 1,000 people, SMEs, Statistical Institution", values: [{ n: "1 - 6", c: "#A1D99B" }, { n: "7 - 12", c: "#74C476" }, { n: "13 - 18", c: "#41AB5D" }, { n: "19 - 24", c: "#238B45" }, { n: "25 - 30", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_2": { name: "# of enterprises per 1,000 people, SMEs, Ministry of Finance/Central Bank", values: [{ n: "1 - 6", c: "#A1D99B" }, { n: "7 - 12", c: "#74C476" }, { n: "13 - 18", c: "#41AB5D" }, { n: "19 - 24", c: "#238B45" }, { n: "25 - 30", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Density_SMEs_3": { name: "# of enterprises per 1,000 people, SMEs, SME Associations", values: [{ n: "1 - 7", c: "#A1D99B" }, { n: "8 - 15", c: "#74C476" }, { n: "16 - 23", c: "#41AB5D" }, { n: "24 - 31", c: "#238B45" }, { n: "32 - 39", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_0": { name: "Employment (% total), Micro, Most Widely Used", values: [{ n: "4 - 18", c: "#A1D99B" }, { n: "19 - 33", c: "#74C476" }, { n: "34 - 47", c: "#41AB5D" }, { n: "48 - 62", c: "#238B45" }, { n: "63 - 76", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_1": { name: "Employment (% total), Micro, Statistical Institution", values: [{ n: "4 - 18", c: "#A1D99B" }, { n: "19 - 33", c: "#74C476" }, { n: "34 - 48", c: "#41AB5D" }, { n: "49 - 63", c: "#238B45" }, { n: "64 - 78", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_2": { name: "Employment (% total), Micro, Ministry of Finance/Central Bank", values: [{ n: "7 - 21", c: "#A1D99B" }, { n: "22 - 35", c: "#74C476" }, { n: "36 - 49", c: "#41AB5D" }, { n: "50 - 64", c: "#238B45" }, { n: "65 - 78", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_Micro_3": { name: "Employment (% total), Micro, SME Associations", values: [{ n: "6 - 19", c: "#A1D99B" }, { n: "20 - 34", c: "#74C476" }, { n: "35 - 49", c: "#41AB5D" }, { n: "50 - 63", c: "#238B45" }, { n: "64 - 78", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_0": { name: "Employment (% total), MSMEs, Most Widely Used", values: [{ n: "20 - 34", c: "#A1D99B" }, { n: "35 - 49", c: "#74C476" }, { n: "50 - 64", c: "#41AB5D" }, { n: "65 - 79", c: "#238B45" }, { n: "80 - 94", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_1": { name: "Employment (% total), MSMEs, Statistical Institution", values: [{ n: "20 - 35", c: "#A1D99B" }, { n: "36 - 51", c: "#74C476" }, { n: "52 - 67", c: "#41AB5D" }, { n: "68 - 82", c: "#238B45" }, { n: "83 - 98", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_2": { name: "Employment (% total), MSMEs, Ministry of Finance/Central Bank", values: [{ n: "25 - 39", c: "#A1D99B" }, { n: "40 - 54", c: "#74C476" }, { n: "55 - 69", c: "#41AB5D" }, { n: "70 - 83", c: "#238B45" }, { n: "84 - 98", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_MSMEs_3": { name: "Employment (% total), MSMEs, SME Associations", values: [{ n: "30 - 43", c: "#A1D99B" }, { n: "44 - 57", c: "#74C476" }, { n: "58 - 71", c: "#41AB5D" }, { n: "72 - 84", c: "#238B45" }, { n: "85 - 98", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_0": { name: "Employment (% total), SMEs, Most Widely Used", values: [{ n: "13 - 27", c: "#A1D99B" }, { n: "28 - 41", c: "#74C476" }, { n: "42 - 56", c: "#41AB5D" }, { n: "57 - 70", c: "#238B45" }, { n: "71 - 85", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_1": { name: "Employment (% total), SMEs, Statistical Institution", values: [{ n: "16 - 24", c: "#A1D99B" }, { n: "25 - 33", c: "#74C476" }, { n: "34 - 42", c: "#41AB5D" }, { n: "43 - 51", c: "#238B45" }, { n: "52 - 60", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_2": { name: "Employment (% total), SMEs, Ministry of Finance/Central Bank", values: [{ n: "19 - 24", c: "#A1D99B" }, { n: "25 - 31", c: "#74C476" }, { n: "32 - 37", c: "#41AB5D" }, { n: "38 - 44", c: "#238B45" }, { n: "45 - 50", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Employment_SMEs_3": { name: "Employment (% total), SMEs, SME Associations", values: [{ n: "13 - 27", c: "#A1D99B" }, { n: "28 - 41", c: "#74C476" }, { n: "42 - 56", c: "#41AB5D" }, { n: "57 - 70", c: "#238B45" }, { n: "71 - 85", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_0": { name: "Firm size definition by assets, Micro, Most Widely Used", values: [{ n: "837 - 585,627", c: "#A1D99B" }, { n: "585,628 - 1,170,419", c: "#74C476" }, { n: "1,170,420 - 1,755,210", c: "#41AB5D" }, { n: "1,755,211 - 2,340,002", c: "#238B45" }, { n: "2,340,003 - 2,924,793", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_1": { name: "Firm size definition by assets, Micro, Statistical Institution", values: [{ n: "837 - 558,955", c: "#A1D99B" }, { n: "558,956 - 1,117,075", c: "#74C476" }, { n: "1,117,076 - 1,675,194", c: "#41AB5D" }, { n: "1,675,195 - 2,233,313", c: "#238B45" }, { n: "2,233,314 - 2,791,433", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_2": { name: "Firm size definition by assets, Micro, Ministry of Finance/Central Bank", values: [{ n: "40,613 - 590,776", c: "#A1D99B" }, { n: "590,777 - 1,140,940", c: "#74C476" }, { n: "1,140,941 - 1,691,105", c: "#41AB5D" }, { n: "1,691,106 - 2,241,269", c: "#238B45" }, { n: "2,241,270 - 2,791,433", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_Micro_3": { name: "Firm size definition by assets, Micro, SME Associations", values: [{ n: "8,078 - 591,421", c: "#A1D99B" }, { n: "591,422 - 1,174,764", c: "#74C476" }, { n: "1,174,765 - 1,758,107", c: "#41AB5D" }, { n: "1,758,108 - 2,341,450", c: "#238B45" }, { n: "2,341,451 - 2,924,793", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_0": { name: "Firm size definition by assets, MSMEs, Most Widely Used", values: [{ n: "5,782 - 12,581,237", c: "#A1D99B" }, { n: "12,581,238 - 25,156,693", c: "#74C476" }, { n: "25,156,694 - 37,732,149", c: "#41AB5D" }, { n: "37,732,150 - 50,307,604", c: "#238B45" }, { n: "50,307,605 - 62,883,060", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_1": { name: "Firm size definition by assets, MSMEs, Statistical Institution", values: [{ n: "100,609 - 12,083,649", c: "#A1D99B" }, { n: "12,083,650 - 24,066,690", c: "#74C476" }, { n: "24,066,691 - 36,049,731", c: "#41AB5D" }, { n: "36,049,732 - 48,032,772", c: "#238B45" }, { n: "48,032,773 - 60,015,813", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_2": { name: "Firm size definition by assets, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "5,782 - 12,007,788", c: "#A1D99B" }, { n: "12,007,789 - 24,009,794", c: "#74C476" }, { n: "24,009,795 - 36,011,800", c: "#41AB5D" }, { n: "36,011,801 - 48,013,807", c: "#238B45" }, { n: "48,013,808 - 60,015,813", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_MSMEs_3": { name: "Firm size definition by assets, MSMEs, SME Associations", values: [{ n: "66,566 - 12,629,864", c: "#A1D99B" }, { n: "12,629,865 - 25,193,163", c: "#74C476" }, { n: "25,193,164 - 37,756,462", c: "#41AB5D" }, { n: "37,756,463 - 50,319,761", c: "#238B45" }, { n: "50,319,762 - 62,883,060", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_0": { name: "Firm size definition by assets, SMEs, Most Widely Used", values: [{ n: "1,157 - 2,925,718", c: "#A1D99B" }, { n: "2,925,719 - 5,850,280", c: "#74C476" }, { n: "5,850,281 - 8,774,843", c: "#41AB5D" }, { n: "8,774,844 - 11,699,405", c: "#238B45" }, { n: "11,699,406 - 14,623,967", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_1": { name: "Firm size definition by assets, SMEs, Statistical Institution", values: [{ n: "20,122 - 2,807,530", c: "#A1D99B" }, { n: "2,807,531 - 5,594,939", c: "#74C476" }, { n: "5,594,940 - 8,382,348", c: "#41AB5D" }, { n: "8,382,349 - 11,169,757", c: "#238B45" }, { n: "11,169,758 - 13,957,165", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_2": { name: "Firm size definition by assets, SMEs, Ministry of Finance/Central Bank", values: [{ n: "1,157 - 2,792,358", c: "#A1D99B" }, { n: "2,792,359 - 5,583,560", c: "#74C476" }, { n: "5,583,561 - 8,374,762", c: "#41AB5D" }, { n: "8,374,763 - 11,165,964", c: "#238B45" }, { n: "11,165,965 - 13,957,165", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Assets_SMEs_3": { name: "Firm size definition by assets, SMEs, SME Associations", values: [{ n: "12,987 - 2,935,182", c: "#A1D99B" }, { n: "2,935,183 - 5,857,378", c: "#74C476" }, { n: "5,857,379 - 8,779,575", c: "#41AB5D" }, { n: "8,779,576 - 11,701,771", c: "#238B45" }, { n: "11,701,772 - 14,623,967", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_0": { name: "Firm size definition by # of employees, Micro, Most Widely Used", values: [{ n: "3 - 7", c: "#A1D99B" }, { n: "8 - 11", c: "#74C476" }, { n: "12 - 16", c: "#41AB5D" }, { n: "17 - 20", c: "#238B45" }, { n: "21 - 25", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_1": { name: "Firm size definition by # of employees, Micro, Statistical Institution", values: [{ n: "1 - 5", c: "#A1D99B" }, { n: "6 - 10", c: "#74C476" }, { n: "11 - 15", c: "#41AB5D" }, { n: "16 - 20", c: "#238B45" }, { n: "21 - 25", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_2": { name: "Firm size definition by # of employees, Micro, Ministry of Finance/Central Bank", values: [{ n: "1 - 4", c: "#A1D99B" }, { n: "5 - 8", c: "#74C476" }, { n: "9 - 12", c: "#41AB5D" }, { n: "13 - 16", c: "#238B45" }, { n: "17 - 20", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_Micro_3": { name: "Firm size definition by # of employees, Micro, SME Associations", values: [{ n: "1 - 4", c: "#A1D99B" }, { n: "5 - 8", c: "#74C476" }, { n: "9 - 12", c: "#41AB5D" }, { n: "13 - 16", c: "#238B45" }, { n: "17 - 20", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_0": { name: "Firm size definition by # of employees, MSMEs, Most Widely Used", values: [{ n: "8 - 106", c: "#A1D99B" }, { n: "106 - 204", c: "#74C476" }, { n: "205 - 303", c: "#41AB5D" }, { n: "303 - 401", c: "#238B45" }, { n: "402 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_1": { name: "Firm size definition by # of employees, MSMEs, Statistical Institution", values: [{ n: "10 - 108", c: "#A1D99B" }, { n: "108 - 206", c: "#74C476" }, { n: "206 - 304", c: "#41AB5D" }, { n: "304 - 402", c: "#238B45" }, { n: "402 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_2": { name: "Firm size definition by # of employees, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "10 - 108", c: "#A1D99B" }, { n: "108 - 206", c: "#74C476" }, { n: "206 - 304", c: "#41AB5D" }, { n: "304 - 402", c: "#238B45" }, { n: "402 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_MSMEs_3": { name: "Firm size definition by # of employees, MSMEs, SME Associations", values: [{ n: "8 - 106", c: "#A1D99B" }, { n: "106 - 204", c: "#74C476" }, { n: "205 - 303", c: "#41AB5D" }, { n: "303 - 401", c: "#238B45" }, { n: "402 - 500", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_0": { name: "Firm size definition by # of employees, SMEs, Most Widely Used", values: [{ n: "10 - 38", c: "#A1D99B" }, { n: "38 - 66", c: "#74C476" }, { n: "66 - 94", c: "#41AB5D" }, { n: "94 - 122", c: "#238B45" }, { n: "122 - 150", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_1": { name: "Firm size definition by # of employees, SMEs, Statistical Institution", values: [{ n: "5 - 29", c: "#A1D99B" }, { n: "29 - 53", c: "#74C476" }, { n: "53 - 77", c: "#41AB5D" }, { n: "77 - 101", c: "#238B45" }, { n: "101 - 125", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_2": { name: "Firm size definition by # of employees, SMEs, Ministry of Finance/Central Bank", values: [{ n: "5 - 24", c: "#A1D99B" }, { n: "24 - 43", c: "#74C476" }, { n: "43 - 62", c: "#41AB5D" }, { n: "62 - 81", c: "#238B45" }, { n: "81 - 100", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Number_SMEs_3": { name: "Firm size definition by # of employees, SMEs, SME Associations", values: [{ n: "5 - 34", c: "#A1D99B" }, { n: "34 - 63", c: "#74C476" }, { n: "63 - 92", c: "#41AB5D" }, { n: "92 - 121", c: "#238B45" }, { n: "121 - 150", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_0": { name: "Firm size definition by sales, Micro, Most Widely Used", values: [{ n: "502 - 585,360", c: "#A1D99B" }, { n: "585,361 - 1,170,218", c: "#74C476" }, { n: "1,170,219 - 1,755,076", c: "#41AB5D" }, { n: "1,755,077 - 2,339,935", c: "#238B45" }, { n: "2,339,936 - 2,924,793", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_1": { name: "Firm size definition by sales, Micro, Statistical Institution", values: [{ n: "502 - 558,688", c: "#A1D99B" }, { n: "558,689 - 1,116,874", c: "#74C476" }, { n: "1,116,875 - 1,675,060", c: "#41AB5D" }, { n: "1,675,061 - 2,233,246", c: "#238B45" }, { n: "2,233,247 - 2,791,433", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_2": { name: "Firm size definition by sales, Micro, Ministry of Finance/Central Bank", values: [{ n: "29,084 - 581,553", c: "#A1D99B" }, { n: "581,554 - 1,134,023", c: "#74C476" }, { n: "1,134,024 - 1,686,493", c: "#41AB5D" }, { n: "1,686,494 - 2,238,963", c: "#238B45" }, { n: "2,238,964 - 2,791,433", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_Micro_3": { name: "Firm size definition by sales, Micro, SME Associations", values: [{ n: "20,912 - 601,688", c: "#A1D99B" }, { n: "601,689 - 1,182,464", c: "#74C476" }, { n: "1,182,465 - 1,763,240", c: "#41AB5D" }, { n: "1,763,241 - 2,344,017", c: "#238B45" }, { n: "2,344,018 - 2,924,793", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_0": { name: "Firm size definition by sales, MSMEs, Most Widely Used", values: [{ n: "41,250 - 15,775,633", c: "#A1D99B" }, { n: "15,775,634 - 31,510,016", c: "#74C476" }, { n: "31,510,017 - 47,244,400", c: "#41AB5D" }, { n: "47,244,401 - 62,978,783", c: "#238B45" }, { n: "62,978,784 - 78,713,167", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_1": { name: "Firm size definition by sales, MSMEs, Statistical Institution", values: [{ n: "41,250 - 15,775,633", c: "#A1D99B" }, { n: "15,775,634 - 31,510,016", c: "#74C476" }, { n: "31,510,017 - 47,244,400", c: "#41AB5D" }, { n: "47,244,401 - 62,978,783", c: "#238B45" }, { n: "62,978,784 - 78,713,167", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_2": { name: "Firm size definition by sales, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "110,262 - 14,045,375", c: "#A1D99B" }, { n: "14,045,376 - 27,980,488", c: "#74C476" }, { n: "27,980,489 - 41,915,602", c: "#41AB5D" }, { n: "41,915,603 - 55,850,716", c: "#238B45" }, { n: "55,850,717 - 69,785,829", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_MSMEs_3": { name: "Firm size definition by sales, MSMEs, SME Associations", values: [{ n: "110,262 - 14,712,176", c: "#A1D99B" }, { n: "14,712,177 - 29,314,092", c: "#74C476" }, { n: "29,314,093 - 43,916,007", c: "#41AB5D" }, { n: "43,916,008 - 58,517,922", c: "#238B45" }, { n: "58,517,923 - 73,119,837", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_0": { name: "Firm size definition by sales, SMEs, Most Widely Used", values: [{ n: "10,313 - 2,933,043", c: "#A1D99B" }, { n: "2,933,044 - 5,855,774", c: "#74C476" }, { n: "5,855,775 - 8,778,505", c: "#41AB5D" }, { n: "8,778,506 - 11,701,236", c: "#238B45" }, { n: "11,701,237 - 14,623,967", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_1": { name: "Firm size definition by sales, SMEs, Statistical Institution", values: [{ n: "10,313 - 2,799,683", c: "#A1D99B" }, { n: "2,799,684 - 5,589,053", c: "#74C476" }, { n: "5,589,054 - 8,378,424", c: "#41AB5D" }, { n: "8,378,425 - 11,167,795", c: "#238B45" }, { n: "11,167,796 - 13,957,165", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_2": { name: "Firm size definition by sales, SMEs, Ministry of Finance/Central Bank", values: [{ n: "44,105 - 2,826,716", c: "#A1D99B" }, { n: "2,826,717 - 5,609,329", c: "#74C476" }, { n: "5,609,330 - 8,391,941", c: "#41AB5D" }, { n: "8,391,942 - 11,174,553", c: "#238B45" }, { n: "11,174,554 - 13,957,165", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Firm_Size_by_Sales_SMEs_3": { name: "Firm size definition by sales, SMEs, SME Associations", values: [{ n: "44,105 - 2,960,077", c: "#A1D99B" }, { n: "2,960,078 - 5,876,049", c: "#74C476" }, { n: "5,876,050 - 8,792,022", c: "#41AB5D" }, { n: "8,792,023 - 11,707,994", c: "#238B45" }, { n: "11,707,995 - 14,623,967", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_0": { name: "Enterprises (% of total), Micro, Most Widely Used", values: [{ n: "3 - 21", c: "#A1D99B" }, { n: "22 - 41", c: "#74C476" }, { n: "42 - 60", c: "#41AB5D" }, { n: "61 - 80", c: "#238B45" }, { n: "81 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_1": { name: "Enterprises (% of total), Micro, Statistical Institution", values: [{ n: "3 - 21", c: "#A1D99B" }, { n: "22 - 40", c: "#74C476" }, { n: "41 - 60", c: "#41AB5D" }, { n: "61 - 79", c: "#238B45" }, { n: "80 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_2": { name: "Enterprises (% of total), Micro, Ministry of Finance/Central Bank", values: [{ n: "27 - 40", c: "#A1D99B" }, { n: "41 - 53", c: "#74C476" }, { n: "54 - 66", c: "#41AB5D" }, { n: "67 - 79", c: "#238B45" }, { n: "80 - 93", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_Micro_3": { name: "Enterprises (% of total), Micro, SME Associations", values: [{ n: "27 - 41", c: "#A1D99B" }, { n: "42 - 56", c: "#74C476" }, { n: "57 - 70", c: "#41AB5D" }, { n: "71 - 85", c: "#238B45" }, { n: "86 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_0": { name: "Enterprises (% of total), MSMEs, Most Widely Used", values: [{ n: "75 - 79", c: "#A1D99B" }, { n: "80 - 84", c: "#74C476" }, { n: "85 - 89", c: "#41AB5D" }, { n: "90 - 94", c: "#238B45" }, { n: "95 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_1": { name: "Enterprises (% of total), MSMEs, Statistical Institution", values: [{ n: "86 - 88", c: "#A1D99B" }, { n: "89 - 91", c: "#74C476" }, { n: "92 - 94", c: "#41AB5D" }, { n: "95 - 97", c: "#238B45" }, { n: "98 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_2": { name: "Enterprises (% of total), MSMEs, Ministry of Finance/Central Bank", values: [{ n: "90 - 91", c: "#A1D99B" }, { n: "92 - 93", c: "#74C476" }, { n: "94 - 95", c: "#41AB5D" }, { n: "96 - 97", c: "#238B45" }, { n: "98 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_MSMEs_3": { name: "Enterprises (% of total), MSMEs, SME Associations", values: [{ n: "75 - 79", c: "#A1D99B" }, { n: "80 - 84", c: "#74C476" }, { n: "85 - 89", c: "#41AB5D" }, { n: "90 - 94", c: "#238B45" }, { n: "95 - 99", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_0": { name: "Enterprises (% of total), SMEs, Most Widely Used", values: [{ n: "1 - 19", c: "#A1D99B" }, { n: "20 - 38", c: "#74C476" }, { n: "39 - 57", c: "#41AB5D" }, { n: "58 - 76", c: "#238B45" }, { n: "77 - 95", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_1": { name: "Enterprises (% of total), SMEs, Statistical Institution", values: [{ n: "1 - 19", c: "#A1D99B" }, { n: "20 - 38", c: "#74C476" }, { n: "39 - 57", c: "#41AB5D" }, { n: "58 - 76", c: "#238B45" }, { n: "77 - 95", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_2": { name: "Enterprises (% of total), SMEs, Ministry of Finance/Central Bank", values: [{ n: "7 - 19", c: "#A1D99B" }, { n: "20 - 32", c: "#74C476" }, { n: "33 - 45", c: "#41AB5D" }, { n: "46 - 58", c: "#238B45" }, { n: "59 - 71", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Size_Breakdown_SMEs_3": { name: "Enterprises (% of total), SMEs, SME Associations", values: [{ n: "1 - 14", c: "#A1D99B" }, { n: "15 - 28", c: "#74C476" }, { n: "29 - 43", c: "#41AB5D" }, { n: "44 - 57", c: "#238B45" }, { n: "58 - 71", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_0": { name: "Value added, Micro, Most Widely Used", values: [{ n: "8 - 13", c: "#A1D99B" }, { n: "14 - 18", c: "#74C476" }, { n: "19 - 23", c: "#41AB5D" }, { n: "24 - 29", c: "#238B45" }, { n: "30 - 34", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_1": { name: "Value added, Micro, Statistical Institution", values: [{ n: "8 - 12", c: "#A1D99B" }, { n: "13 - 17", c: "#74C476" }, { n: "18 - 22", c: "#41AB5D" }, { n: "23 - 27", c: "#238B45" }, { n: "28 - 31", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_2": { name: "Value added, Micro, Ministry of Finance/Central Bank", values: [{ n: "8 - 14", c: "#A1D99B" }, { n: "15 - 20", c: "#74C476" }, { n: "21 - 27", c: "#41AB5D" }, { n: "28 - 33", c: "#238B45" }, { n: "34 - 39", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_Micro_3": { name: "Value added, Micro, SME Associations", values: [{ n: "12 - 16", c: "#A1D99B" }, { n: "17 - 22", c: "#74C476" }, { n: "23 - 28", c: "#41AB5D" }, { n: "29 - 34", c: "#238B45" }, { n: "35 - 39", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_0": { name: "Value added, MSMEs, Most Widely Used", values: [{ n: "8 - 21", c: "#A1D99B" }, { n: "22 - 35", c: "#74C476" }, { n: "36 - 48", c: "#41AB5D" }, { n: "49 - 62", c: "#238B45" }, { n: "63 - 76", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_1": { name: "Value added, MSMEs, Statistical Institution", values: [{ n: "20 - 30", c: "#A1D99B" }, { n: "31 - 42", c: "#74C476" }, { n: "43 - 53", c: "#41AB5D" }, { n: "54 - 64", c: "#238B45" }, { n: "65 - 75", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_2": { name: "Value added, MSMEs, Ministry of Finance/Central Bank", values: [{ n: "8 - 21", c: "#A1D99B" }, { n: "22 - 35", c: "#74C476" }, { n: "36 - 48", c: "#41AB5D" }, { n: "49 - 62", c: "#238B45" }, { n: "63 - 75", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_MSMEs_3": { name: "Value added, MSMEs, SME Associations", values: [{ n: "11 - 24", c: "#A1D99B" }, { n: "25 - 37", c: "#74C476" }, { n: "38 - 50", c: "#41AB5D" }, { n: "51 - 63", c: "#238B45" }, { n: "64 - 76", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_0": { name: "Value added, SMEs, Most Widely Used", values: [{ n: "7 - 16", c: "#A1D99B" }, { n: "17 - 26", c: "#74C476" }, { n: "27 - 37", c: "#41AB5D" }, { n: "38 - 47", c: "#238B45" }, { n: "48 - 57", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_1": { name: "Value added, SMEs, Statistical Institution", values: [{ n: "15 - 23", c: "#A1D99B" }, { n: "24 - 31", c: "#74C476" }, { n: "32 - 40", c: "#41AB5D" }, { n: "41 - 49", c: "#238B45" }, { n: "50 - 57", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_2": { name: "Value added, SMEs, Ministry of Finance/Central Bank", values: [{ n: "17 - 23", c: "#A1D99B" }, { n: "24 - 30", c: "#74C476" }, { n: "31 - 37", c: "#41AB5D" }, { n: "38 - 44", c: "#238B45" }, { n: "45 - 50", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] }, "Vallue_added_SMEs_3": { name: "Value added, SMEs, SME Associations", values: [{ n: "7 - 15", c: "#A1D99B" }, { n: "16 - 25", c: "#74C476" }, { n: "26 - 35", c: "#41AB5D" }, { n: "36 - 45", c: "#238B45" }, { n: "46 - 55", c: "#005A32" }, { n: "No Data", c: "#CCCCCC" }] } }
    }
}