import Head from "next/head";
import XLSX from "xlsx";
import momemt from "moment";

import { Fragment, useEffect, useState } from "react";
import HeaderComp from "../components/Header";

let parser;

if (typeof window !== "undefined") {
  parser = new (require("simple-excel-to-json").XlsParser)();
}

export default function Home() {
  const [excelData, setExcelData] = useState([]);

  const handleChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    if (typeof FileReader != "undefined") {
      // const reader = new FileReader();

      if (reader.readAsBinaryString) {
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const firstSheet = workbook.SheetNames[0];

          const excelRows = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[firstSheet]
          );

          setExcelData(excelRows);
        };
        reader.readAsBinaryString(file);
      }
    }
  };

  return (
    <Fragment>
      <HeaderComp />
      <div className="main-page mt-5">
        <div className="container">
          <h3 className="heading">Excel JSON </h3>
          <div className="excel-table">
            <form className="form-excel">
              <div className="file-upload">
                <label> Add An excel file</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </form>

            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {excelData &&
                  excelData.map((data, i) => (
                    <tr key={i}>
                      <td>{data.Name}</td>
                      <td>{data.Amount}</td>
                      <td>{momemt(data.Time).format("LLL")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
