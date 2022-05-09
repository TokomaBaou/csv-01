import "./styles.css";
import ExcelJS from "exceljs";
import React, { FC } from "react";

export const App: FC = () => {
  const handlerClickDownloadButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    format: "xlsx" | "csv"
  ) => {
    e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("sheet1");
    const worksheet = workbook.getWorksheet("sheet1");
    worksheet.columns = [
      { header: "ID", key: "id" },
      { header: "作成日時", key: "createAt" },
      { header: "名前", key: "name" }
    ];

    worksheet.addRows([
      {
        id: "f001",
        createAt: 1629902208,
        name: "りんご"
      },
      {
        id: "f002",
        createAt: 1629902245,
        name: "ぶどう"
      },
      {
        id: "f003",
        createAt: 1629902265,
        name: "バナナ"
      }
    ]);

    const unit8Array =
      format === "xlsx"
        ? await workbook.xlsx.writeBuffer()
        : await workbook.csv.writeBuffer();

    const blob = new Blob([unit8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sampleData." + format;
    a.click();
    a.remove();
  };

  return (
    <div className="App">
      <h1>データ出力</h1>
      <button onClick={(e) => handlerClickDownloadButton(e, "csv")}>
        CSV形式
      </button>
    </div>
  );
};
